const supabase = require('../config/database');

class UserRepository {
  async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*, addresses(*)')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async create(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id, updates) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async logActivity(userId, activityType, req) {
    const ipAddress = req?.ip || req?.socket?.remoteAddress || '';
    const userAgent = req?.headers?.['user-agent'] || '';
    
    const { error } = await supabase
      .from('user_activity')
      .insert([{
        user_id: userId,
        activity_type: activityType,
        ip_address: ipAddress,
        user_agent: userAgent
      }]);
      
    if (error) console.error('Failed to log activity:', error);
  }
}

module.exports = new UserRepository();
