const crypto = require('crypto');
const https = require('https');
const http = require('http');
const awsConfig = require('../../config/aws');
const logger = require('../../utils/logger');

class S3Service {
  constructor() {
    this.region = awsConfig.region;
    this.bucket = awsConfig.s3.bucket;
    this.accessKeyId = awsConfig.accessKeyId;
    this.secretAccessKey = awsConfig.secretAccessKey;
    this.sessionToken = awsConfig.sessionToken;
    this.customDomain = awsConfig.s3.customDomain;
  }

  get isEnabled() {
    return awsConfig.isConfigured;
  }

  get endpointHost() {
    if (this.customDomain) return this.customDomain;
    return `${this.bucket}.s3.${this.region}.amazonaws.com`;
  }

  getPublicUrl(key) {
    const cleanKey = key.startsWith('/') ? key.slice(1) : key;
    if (this.customDomain) {
      return `https://${this.customDomain}/${cleanKey}`;
    }
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${cleanKey}`;
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
   * Generates a pre-signed PUT URL using AWS Signature Version 4
   */
  async getPresignedPutUrl({ key, contentType = 'application/octet-stream', expiresIn = 900 }) {
    const cleanKey = key.startsWith('/') ? key.slice(1) : key;
    const finalUrl = this.getPublicUrl(cleanKey);

    if (!this.isEnabled) {
      logger.info(`[AWS S3 Mock] Presigned URL requested for: ${cleanKey}`);
      return {
        uploadUrl: `http://localhost:3000/api/aws/s3/mock-upload?key=${encodeURIComponent(cleanKey)}`,
        fileUrl: finalUrl,
        key: cleanKey,
        isMock: true,
        expiresIn
      };
    }

    try {
      const now = new Date();
      const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
      const dateStamp = amzDate.slice(0, 8);
      const host = this.endpointHost;
      const canonicalUri = `/${cleanKey}`;

      const credentialScope = `${dateStamp}/${this.region}/s3/aws4_request`;

      const queryParams = [
        ['X-Amz-Algorithm', 'AWS4-HMAC-SHA256'],
        ['X-Amz-Credential', `${this.accessKeyId}/${credentialScope}`],
        ['X-Amz-Date', amzDate],
        ['X-Amz-Expires', expiresIn.toString()],
        ['X-Amz-SignedHeaders', 'host']
      ];

      if (this.sessionToken) {
        queryParams.push(['X-Amz-Security-Token', this.sessionToken]);
      }

      queryParams.sort((a, b) => a[0].localeCompare(b[0]));
      const canonicalQuerystring = queryParams
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');

      const canonicalHeaders = `host:${host}\n`;
      const signedHeaders = 'host';
      const payloadHash = 'UNSIGNED-PAYLOAD';

      const canonicalRequest = [
        'PUT',
        canonicalUri,
        canonicalQuerystring,
        canonicalHeaders,
        signedHeaders,
        payloadHash
      ].join('\n');

      const stringToSign = [
        'AWS4-HMAC-SHA256',
        amzDate,
        credentialScope,
        this._hash(canonicalRequest)
      ].join('\n');

      const signingKey = this._getSignatureKey(this.secretAccessKey, dateStamp, this.region, 's3');
      const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

      const uploadUrl = `https://${host}${canonicalUri}?${canonicalQuerystring}&X-Amz-Signature=${signature}`;

      return {
        uploadUrl,
        fileUrl: finalUrl,
        key: cleanKey,
        isMock: false,
        expiresIn
      };
    } catch (err) {
      logger.error('[AWS S3 Error] Failed to generate presigned URL', err);
      throw err;
    }
  }

  /**
   * Upload object directly to S3 bucket
   */
  async uploadObject({ key, body, contentType = 'application/octet-stream', isPublic = true }) {
    const cleanKey = key.startsWith('/') ? key.slice(1) : key;
    const finalUrl = this.getPublicUrl(cleanKey);

    if (!this.isEnabled) {
      logger.info(`[AWS S3 Mock] Uploaded object stored in memory/mock: ${cleanKey}`);
      return {
        success: true,
        key: cleanKey,
        url: finalUrl,
        isMock: true
      };
    }

    return new Promise((resolve, reject) => {
      const now = new Date();
      const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
      const dateStamp = amzDate.slice(0, 8);
      const host = this.endpointHost;
      const canonicalUri = `/${cleanKey}`;
      const payloadHash = this._hash(body);
      const credentialScope = `${dateStamp}/${this.region}/s3/aws4_request`;

      const headers = {
        'Host': host,
        'Content-Type': contentType,
        'Content-Length': Buffer.byteLength(body),
        'x-amz-date': amzDate,
        'x-amz-content-sha256': payloadHash
      };

      if (isPublic) {
        headers['x-amz-acl'] = 'public-read';
      }

      if (this.sessionToken) {
        headers['x-amz-security-token'] = this.sessionToken;
      }

      const sortedHeaderKeys = Object.keys(headers).map(k => k.toLowerCase()).sort();
      const canonicalHeaders = sortedHeaderKeys.map(k => `${k}:${headers[k] || headers[Object.keys(headers).find(orig => orig.toLowerCase() === k)]}\n`).join('');
      const signedHeaders = sortedHeaderKeys.join(';');

      const canonicalRequest = [
        'PUT',
        canonicalUri,
        '',
        canonicalHeaders,
        signedHeaders,
        payloadHash
      ].join('\n');

      const stringToSign = [
        'AWS4-HMAC-SHA256',
        amzDate,
        credentialScope,
        this._hash(canonicalRequest)
      ].join('\n');

      const signingKey = this._getSignatureKey(this.secretAccessKey, dateStamp, this.region, 's3');
      const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

      headers['Authorization'] = `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

      const req = https.request({
        host,
        path: canonicalUri,
        method: 'PUT',
        headers
      }, (res) => {
        let respData = '';
        res.on('data', chunk => respData += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({
              success: true,
              key: cleanKey,
              url: finalUrl,
              etag: res.headers['etag'],
              isMock: false
            });
          } else {
            logger.error(`[AWS S3] Upload failed with status ${res.statusCode}: ${respData}`);
            reject(new Error(`S3 upload error: HTTP ${res.statusCode} - ${respData}`));
          }
        });
      });

      req.on('error', (err) => {
        logger.error('[AWS S3 Error] Request error', err);
        reject(err);
      });

      req.write(body);
      req.end();
    });
  }

  /**
   * Delete an object from S3
   */
  async deleteObject({ key }) {
    const cleanKey = key.startsWith('/') ? key.slice(1) : key;

    if (!this.isEnabled) {
      logger.info(`[AWS S3 Mock] Object deleted: ${cleanKey}`);
      return { success: true, key: cleanKey, isMock: true };
    }

    return new Promise((resolve, reject) => {
      const now = new Date();
      const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
      const dateStamp = amzDate.slice(0, 8);
      const host = this.endpointHost;
      const canonicalUri = `/${cleanKey}`;
      const payloadHash = this._hash('');
      const credentialScope = `${dateStamp}/${this.region}/s3/aws4_request`;

      const headers = {
        'Host': host,
        'x-amz-date': amzDate,
        'x-amz-content-sha256': payloadHash
      };

      if (this.sessionToken) {
        headers['x-amz-security-token'] = this.sessionToken;
      }

      const sortedHeaderKeys = Object.keys(headers).map(k => k.toLowerCase()).sort();
      const canonicalHeaders = sortedHeaderKeys.map(k => `${k}:${headers[k] || headers[Object.keys(headers).find(orig => orig.toLowerCase() === k)]}\n`).join('');
      const signedHeaders = sortedHeaderKeys.join(';');

      const canonicalRequest = ['DELETE', canonicalUri, '', canonicalHeaders, signedHeaders, payloadHash].join('\n');
      const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, this._hash(canonicalRequest)].join('\n');
      const signingKey = this._getSignatureKey(this.secretAccessKey, dateStamp, this.region, 's3');
      const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

      headers['Authorization'] = `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

      const req = https.request({
        host,
        path: canonicalUri,
        method: 'DELETE',
        headers
      }, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, key: cleanKey, isMock: false });
        } else {
          reject(new Error(`S3 delete error: HTTP ${res.statusCode}`));
        }
      });

      req.on('error', reject);
      req.end();
    });
  }

  /**
   * Health status check
   */
  getStatus() {
    return {
      service: 'Amazon Simple Storage Service (S3)',
      configured: this.isEnabled,
      region: this.region,
      bucket: this.bucket,
      customDomain: this.customDomain || null,
      mode: this.isEnabled ? 'LIVE_AWS_PRODUCTION' : 'LOCAL_DEVELOPMENT_MOCK'
    };
  }
}

module.exports = new S3Service();

