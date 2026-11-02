const crypto = require('crypto');
const https = require('https');
const awsConfig = require('../../config/aws');
const logger = require('../../utils/logger');

class SESService {
  constructor() {
    this.region = awsConfig.region;
    this.fromEmail = awsConfig.ses.fromEmail;
    this.accessKeyId = awsConfig.accessKeyId;
    this.secretAccessKey = awsConfig.secretAccessKey;
  }

  get isEnabled() {
    return awsConfig.isConfigured;
  }

  _hmac(key, string) {
    return crypto.createHmac('sha256', key).update(string).digest();
  }

  _hash(string) {
    return crypto.createHash('sha256').update(string).digest('hex');
  }

  _getSignatureKey(key, dateStamp, regionName, serviceName) {
    const kDate = this._hmac('AWS4' + key, dateStamp);
    const kRegion = this._hmac(kDate, regionName);
    const kService = this._hmac(kRegion, serviceName);
    return this._hmac(kService, 'aws4_request');
  }

  /**
   * Send transactional email using AWS SES v2 or fallback
   */
  async sendEmail({ to, subject, html, text }) {
    if (!this.isEnabled) {
      logger.info(`[AWS SES Mock] Email dispatched to ${to} | Subject: "${subject}"`);
      return {
        success: true,
        messageId: `mock-ses-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        isMock: true
      };
    }

    try {
      const now = new Date();
      const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
      const dateStamp = amzDate.slice(0, 8);
      const host = `email.${this.region}.amazonaws.com`;
      const canonicalUri = '/v2/email/outbound-emails';

      const payload = JSON.stringify({
        FromEmailAddress: this.fromEmail,
        Destination: {
          ToAddresses: Array.isArray(to) ? to : [to]
        },
        Content: {
          Simple: {
            Subject: { Data: subject, Charset: 'UTF-8' },
            Body: {
              Html: html ? { Data: html, Charset: 'UTF-8' } : undefined,
              Text: text ? { Data: text, Charset: 'UTF-8' } : { Data: subject, Charset: 'UTF-8' }
            }
          }
        }
      });

      const payloadHash = this._hash(payload);
      const credentialScope = `${dateStamp}/${this.region}/ses/aws4_request`;

      const headers = {
        'Host': host,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'x-amz-date': amzDate,
        'x-amz-content-sha256': payloadHash
      };

      const sortedHeaderKeys = Object.keys(headers).map(k => k.toLowerCase()).sort();
      const canonicalHeaders = sortedHeaderKeys.map(k => `${k}:${headers[k] || headers[Object.keys(headers).find(orig => orig.toLowerCase() === k)]}\n`).join('');
      const signedHeaders = sortedHeaderKeys.join(';');

      const canonicalRequest = ['POST', canonicalUri, '', canonicalHeaders, signedHeaders, payloadHash].join('\n');
      const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, this._hash(canonicalRequest)].join('\n');
      const signingKey = this._getSignatureKey(this.secretAccessKey, dateStamp, this.region, 'ses');
      const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

      headers['Authorization'] = `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

      return new Promise((resolve, reject) => {
        const req = https.request({
          host,
          path: canonicalUri,
          method: 'POST',
          headers
        }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              const parsed = JSON.parse(data || '{}');
              logger.info(`[AWS SES] Email successfully sent to ${to}. MessageId: ${parsed.MessageId}`);
              resolve({
                success: true,
                messageId: parsed.MessageId,
                isMock: false
              });
            } else {
              logger.error(`[AWS SES Error] Failed with status ${res.statusCode}: ${data}`);
              resolve({
                success: false,
                error: data,
                isMock: false
              });
            }
          });
        });

        req.on('error', (err) => {
          logger.error('[AWS SES Request Error]', err);
          resolve({ success: false, error: err.message, isMock: false });
        });

        req.write(payload);
        req.end();
      });
    } catch (err) {
      logger.error('[AWS SES Service Exception]', err);
      return { success: false, error: err.message, isMock: false };
    }
  }

  /**
   * High-level helper: Send luxury order confirmation receipt
   */
  async sendOrderConfirmation(order, customerEmail) {
    const subject = `Order Confirmation #${order.id?.slice(0, 8).toUpperCase() || 'ARGHYA'} | Arghya Modifications`;
    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
        <h1 style="text-align: center; font-size: 28px; letter-spacing: 4px; margin-bottom: 4px;">ARGHYA</h1>
        <p style="text-align: center; text-transform: uppercase; font-size: 11px; letter-spacing: 3px; color: #7f1d1d;">Slay Everyday</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
        <h2 style="font-size: 20px;">Thank you for your order!</h2>
        <p>Your order has been confirmed and is being hand-prepared by our atelier.</p>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Total Amount:</strong> INR ${Number(order.total_amount || 0).toLocaleString('en-IN')}</p>
        <p><strong>Payment Status:</strong> ${order.status || 'PAID'}</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
        <p style="font-size: 12px; color: #666; text-align: center;">Questions? Contact care.arghya@gmail.com</p>
      </div>
    `;
    return this.sendEmail({ to: customerEmail, subject, html });
  }

  getStatus() {
    return {
      service: 'Amazon Simple Email Service (SES)',
      configured: this.isEnabled,
      region: this.region,
      fromEmail: this.fromEmail,
      mode: this.isEnabled ? 'LIVE_AWS_PRODUCTION' : 'LOCAL_DEVELOPMENT_MOCK'
    };
  }
}

module.exports = new SESService();

