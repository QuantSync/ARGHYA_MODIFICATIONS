const jwt = require('jsonwebtoken');
const supabase = require('../config/database');
const userRepository = require('../repository/userRepository');
const env = require('../config/env');
const { BadRequestError, UnauthorizedError } = require('../utils/errors');

class AuthController {
  async register(req, res) {
    const { email, password, fullName, phone } = req.body;

    if (!email || !password || !fullName) {
      throw new BadRequestError('Email, password, and fullName are required');
    }

    // 1. Register with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone }
      }
    });

    if (authError) {
      throw new BadRequestError(authError.message);
    }

    // 2. Save user in app users table
    let dbUser = await userRepository.findByEmail(email);
    if (!dbUser) {
      dbUser = await userRepository.create({
        supabase_uid: authData.user?.id,
        email,
        full_name: fullName,
        phone,
        auth_provider: 'email'
      });
    }

    const token = jwt.sign(
      { id: dbUser.id, email: dbUser.email, role: dbUser.role },
      env.jwtSecret,
      { expiresIn: env.jwtExpiry }
    );

    await userRepository.logActivity(dbUser.id, 'register', req);

    res.status(201).json({
      success: true,
      data: {
        user: dbUser,
        token
      },
      message: 'Registration successful'
    });
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('Email and password are required');
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      throw new UnauthorizedError('Invalid credentials');
    }

    let dbUser = await userRepository.findByEmail(email);
    if (!dbUser) {
      dbUser = await userRepository.create({
        supabase_uid: authData.user.id,
        email,
        full_name: authData.user.user_metadata?.full_name || 'Customer',
        phone: authData.user.user_metadata?.phone || '',
        auth_provider: 'email'
      });
    }

    const token = jwt.sign(
      { id: dbUser.id, email: dbUser.email, role: dbUser.role },
      env.jwtSecret,
      { expiresIn: env.jwtExpiry }
    );

    await userRepository.update(dbUser.id, { last_sign_in_at: new Date().toISOString() });
    await userRepository.logActivity(dbUser.id, 'login', req);

    res.json({
      success: true,
      data: {
        user: dbUser,
        token
      },
      message: 'Login successful'
    });
  }

  async oauthSync(req, res) {
    const { email, fullName, provider, supabaseUid, avatarUrl } = req.body;

    if (!email) {
      throw new BadRequestError('Email is required for OAuth synchronization');
    }

    let dbUser = await userRepository.findByEmail(email);
    if (!dbUser) {
      dbUser = await userRepository.create({
        supabase_uid: supabaseUid,
        email,
        full_name: fullName || 'ARGHYA Customer',
        auth_provider: provider || 'oauth',
        avatar_url: avatarUrl || ''
      });
    }

    const token = jwt.sign(
      { id: dbUser.id, email: dbUser.email, role: dbUser.role },
      env.jwtSecret,
      { expiresIn: env.jwtExpiry }
    );

    await userRepository.update(dbUser.id, { last_sign_in_at: new Date().toISOString() });
    await userRepository.logActivity(dbUser.id, 'oauth_login', req);

    res.json({
      success: true,
      data: {
        user: dbUser,
        token
      },
      message: `OAuth login successful via ${provider}`
    });
  }

  async getProfile(req, res) {
    const user = await userRepository.findById(req.user.id);
    res.json({
      success: true,
      data: user
    });
  }

  async updateProfile(req, res) {
    const { username, full_name, phone, email, address } = req.body;
    
    const updates = {};
    if (username !== undefined) updates.username = username;
    if (full_name !== undefined) updates.full_name = full_name;
    if (phone !== undefined) updates.phone = phone;
    if (email !== undefined) updates.email = email;
    if (address !== undefined) updates.address = address;

    const updatedUser = await userRepository.update(req.user.id, updates);
    await userRepository.logActivity(req.user.id, 'profile_update', req);

    res.json({
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully'
    });
  }
}

module.exports = new AuthController();
