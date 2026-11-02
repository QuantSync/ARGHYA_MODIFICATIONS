const dotenv = require('dotenv');
dotenv.config();

/**
 * AWS Environment Configuration for Arghya Modifications
 * Validates AWS credentials and exports unified configuration for S3, SES, and CloudWatch.
 */
const awsConfig = {
  region: process.env.AWS_REGION || 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  sessionToken: process.env.AWS_SESSION_TOKEN || '',
  s3: {
    bucket: process.env.AWS_S3_BUCKET_NAME || 'arghya-modifications-assets',
    customDomain: process.env.AWS_S3_CUSTOM_DOMAIN || '',
    forcePathStyle: process.env.AWS_S3_FORCE_PATH_STYLE === 'true',
  },
  ses: {
    fromEmail: process.env.AWS_SES_FROM_EMAIL || 'care.arghya@gmail.com',
  },
  cloudwatch: {
    logGroup: process.env.AWS_CLOUDWATCH_LOG_GROUP || '/aws/arghya-modifications/backend',
  },
  get isConfigured() {
    return Boolean(this.accessKeyId && this.secretAccessKey && this.accessKeyId !== 'your-aws-access-key-id');
  }
};

module.exports = awsConfig;

