-- Arghya Modifications Database Schema & Seed Script (PostgreSQL / Supabase)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Stores user profiles linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supabase_uid VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    auth_provider VARCHAR(50) DEFAULT 'email', -- email, google, github, facebook
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'customer', -- customer, admin
    last_sign_in_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 1.5 User Activity Table (Tracks login events and profile updates)
CREATE TABLE IF NOT EXISTS user_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- login, register, oauth_login, profile_update
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Addresses Table
CREATE TABLE IF NOT EXISTS addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    compare_at_price DECIMAL(10, 2),
    category VARCHAR(100) NOT NULL, -- Saree, Lehenga, Kurti, Anarkali, Fusion Wear
    fabric VARCHAR(100),
    craft_type VARCHAR(100), -- Banarasi, Kanjeevaram, Chanderi, Zardozi, Chikankari
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Variants Table (Size & Color combinations with inventory tracking)
CREATE TABLE IF NOT EXISTS variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size VARCHAR(20) NOT NULL, -- Free Size, XS, S, M, L, XL, XXL
    color VARCHAR(50) NOT NULL,
    color_code VARCHAR(10),
    sku VARCHAR(100) UNIQUE NOT NULL,
    quantity_avail INT NOT NULL DEFAULT 0,
    price_override DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    shipping_address JSONB NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_fee DECIMAL(10, 2) DEFAULT 0.00,
    tax_amount DECIMAL(10, 2) DEFAULT 0.00,
    order_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
    payment_status VARCHAR(50) DEFAULT 'UNPAID', -- UNPAID, PAID, FAILED, REFUNDED
    selected_gateway VARCHAR(50), -- razorpay, stripe, cashfree, paytm
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES variants(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    variant_details VARCHAR(255),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    gateway VARCHAR(50) NOT NULL, -- razorpay, stripe, cashfree, paytm
    gateway_order_id VARCHAR(255),
    gateway_payment_id VARCHAR(255),
    gateway_signature VARCHAR(512),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) NOT NULL, -- CREATED, SUCCESS, FAILED, REFUNDED
    raw_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Inventory Logs Table
CREATE TABLE IF NOT EXISTS inventory_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    variant_id UUID NOT NULL REFERENCES variants(id) ON DELETE CASCADE,
    quantity_change INT NOT NULL,
    previous_quantity INT NOT NULL,
    new_quantity INT NOT NULL,
    reason VARCHAR(100) NOT NULL, -- ORDER_DEDUCTION, MANUAL_RESTOCK, RETURN, CANCEL_RESTOCK
    reference_id VARCHAR(255), -- order_id or admin action ref
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sample Seed Data for Arghya Modifications
INSERT INTO products (id, name, slug, description, price, compare_at_price, category, fabric, craft_type, images, is_featured)
VALUES 
(
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Royal Crimson Banarasi Silk Saree',
    'royal-crimson-banarasi-silk-saree',
    'Exquisite pure Katan silk Banarasi saree adorned with intricate gold zari brocade motif work across the pallu and body.',
    24999.00, 29999.00, 'Saree', 'Pure Silk', 'Banarasi Zari',
    '["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"]',
    TRUE
),
(
    'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    'Emerald Green Zardozi Velvet Lehenga',
    'emerald-green-zardozi-velvet-lehenga',
    'Hand-embroidered luxury bridal velvet lehenga with handcrafted Dabka and Zardozi floral artwork, paired with an embellished dupatta.',
    48500.00, 55000.00, 'Lehenga', 'Micro Velvet', 'Zardozi Handwork',
    '["https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80"]',
    TRUE
),
(
    'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
    'Blush Pink Chanderi Anarkali Suit',
    'blush-pink-chanderi-anarkali-suit',
    'Graceful floor-length Chanderi silk Anarkali detailed with delicate Chikankari embroidery and Gota Patti border.',
    14500.00, 18000.00, 'Anarkali', 'Chanderi Silk', 'Chikankari & Gota',
    '["https://images.unsplash.com/photo-1596783074918-c84cb06a917b?auto=format&fit=crop&w=800&q=80"]',
    TRUE
),
(
    'd4e5f6a7-b89c-0d1e-2f3a-4b5c6d7e8f9a',
    'Ivory Pearl Embroidered Silk Kurti Set',
    'ivory-pearl-embroidered-silk-kurti-set',
    'Sophisticated straight silk kurti with hand-stitched pearl embellishments on neck paired with flared palazzo pants.',
    8999.00, 11500.00, 'Kurti', 'Raw Silk', 'Pearl Work',
    '["https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80"]',
    FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Variants
INSERT INTO variants (product_id, size, color, color_code, sku, quantity_avail)
VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Free Size', 'Royal Crimson', '#990000', 'ARG-SAR-CRIM-FS', 15),
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'M', 'Emerald Green', '#046307', 'ARG-LEH-EMR-M', 5),
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'L', 'Emerald Green', '#046307', 'ARG-LEH-EMR-L', 8),
('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'S', 'Blush Pink', '#FFC0CB', 'ARG-ANK-PNK-S', 12),
('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'M', 'Blush Pink', '#FFC0CB', 'ARG-ANK-PNK-M', 20),
('d4e5f6a7-b89c-0d1e-2f3a-4b5c6d7e8f9a', 'M', 'Ivory White', '#FFFFF0', 'ARG-KUR-IVR-M', 18)
ON CONFLICT (sku) DO NOTHING;
