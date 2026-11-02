const express = require('express');
const router = express.Router();
const awsController = require('../controllers/awsController');
const asyncHandler = require('../middlewares/asyncHandler');
const { authenticateToken } = require('../middlewares/auth');

// Status & diagnostics (public)
router.get('/status', asyncHandler(awsController.getStatus.bind(awsController)));

// S3 Presigned URL generation for client uploads (protected)
router.post('/s3/presign', asyncHandler(awsController.getPresignedUrl.bind(awsController)));

// S3 Delete object (protected)
router.delete('/s3/file', asyncHandler(awsController.deleteFile.bind(awsController)));

// AWS SES test email (protected)
router.post('/ses/test', asyncHandler(awsController.sendTestEmail.bind(awsController)));

// Local dev mock upload target for PUT requests
router.put('/s3/mock-upload', asyncHandler(awsController.mockUpload.bind(awsController)));
router.post('/s3/mock-upload', asyncHandler(awsController.mockUpload.bind(awsController)));

module.exports = router;

