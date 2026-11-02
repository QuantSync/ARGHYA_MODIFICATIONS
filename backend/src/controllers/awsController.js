const s3Service = require('../services/aws/s3Service');
const sesService = require('../services/aws/sesService');
const awsConfig = require('../config/aws');
const { BadRequestError } = require('../utils/errors');
const logger = require('../utils/logger');

class AwsController {
  /**
   * Health and status of AWS environment
   */
  async getStatus(req, res) {
    res.json({
      success: true,
      data: {
        awsConfigured: awsConfig.isConfigured,
        region: awsConfig.region,
        s3: s3Service.getStatus(),
        ses: sesService.getStatus(),
        cloudwatch: {
          service: 'Amazon CloudWatch',
          logGroup: awsConfig.cloudwatch.logGroup,
          configured: awsConfig.isConfigured
        }
      },
      message: awsConfig.isConfigured 
        ? 'AWS Environment is live and authenticated'
        : 'AWS Environment is running in local simulation/development mode'
    });
  }

  /**
   * Get presigned URL for direct client-to-S3 upload
   */
  async getPresignedUrl(req, res) {
    const { filename, contentType = 'image/jpeg', folder = 'products' } = req.body;

    if (!filename) {
      throw new BadRequestError('Filename is required');
    }

    // Sanitize filename and create unique S3 key
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const timestamp = Date.now();
    const key = `${folder}/${timestamp}-${sanitizedFilename}`;

    const presignedData = await s3Service.getPresignedPutUrl({
      key,
      contentType,
      expiresIn: 900 // 15 minutes
    });

    res.json({
      success: true,
      data: presignedData,
      message: 'Presigned upload URL generated successfully'
    });
  }

  /**
   * Delete object from S3
   */
  async deleteFile(req, res) {
    const { key } = req.body;

    if (!key) {
      throw new BadRequestError('S3 object key is required');
    }

    const result = await s3Service.deleteObject({ key });

    res.json({
      success: true,
      data: result,
      message: 'S3 object deleted successfully'
    });
  }

  /**
   * Send test email via AWS SES
   */
  async sendTestEmail(req, res) {
    const { to } = req.body;

    if (!to) {
      throw new BadRequestError('Recipient email (to) is required');
    }

    const result = await sesService.sendEmail({
      to,
      subject: 'ARGHYA - AWS SES Test Notification',
      html: '<h1>AWS SES is working!</h1><p>Your AWS environment for Arghya Modifications is successfully operational.</p>'
    });

    res.json({
      success: result.success,
      data: result,
      message: result.success ? 'Email sent successfully via AWS SES' : 'Failed to send email'
    });
  }

  /**
   * Local mock upload handler for dev when AWS credentials are not configured
   */
  async mockUpload(req, res) {
    const key = req.query.key || 'uploaded-asset.jpg';
    logger.info(`[Mock S3 Handler] Received upload simulation for key: ${key}`);
    res.status(200).json({
      success: true,
      key,
      url: s3Service.getPublicUrl(key),
      message: 'Mock S3 upload simulated successfully'
    });
  }
}

module.exports = new AwsController();

