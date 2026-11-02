const supabase = require('../config/database');

class ProductRepository {
  async getAll({ category, search, minPrice, maxPrice, limit = 20, offset = 0 }) {
    let query = supabase
      .from('products')
      .select('*, variants(*)')
      .eq('is_active', true);

    if (category) {
      query = query.ilike('category', `%${category}%`);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,fabric.ilike.%${search}%`);
    }

    if (minPrice) {
      query = query.gte('price', minPrice);
    }

    if (maxPrice) {
      query = query.lte('price', maxPrice);
    }

    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) throw error;
    return { products: data || [], count };
  }

  async getById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*, variants(*)')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('products')
      .select('*, variants(*)')
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async create(productData) {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id, productData) {
    const { data, error } = await supabase
      .from('products')
      .update({ ...productData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
    return true;
  }
}

module.exports = new ProductRepository();
