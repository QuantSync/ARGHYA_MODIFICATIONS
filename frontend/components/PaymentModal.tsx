'use client';

import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { api } from '../lib/api';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { BulgeWidget } from './BulgeWidget';
import { PaymentSuccessAnimation } from './animations/PaymentSuccessAnimation';
import { PaymentFailureAnimation } from './animations/PaymentFailureAnimation';
import { ComingSoonCard } from './ComingSoonCard';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const { items, getSubtotal, clearCart } = useCartStore();
  const [selectedGateway, setSelectedGateway] = useState<'razorpay' | 'stripe' | 'cashfree' | 'paytm'>('razorpay');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // ComingSoonCard state — holds the gateway label+icon when user clicks an unavailable option
  const [comingSoonGateway, setComingSoonGateway] = useState<{ name: string; icon: string } | null>(null);

  const [customer, setCustomer] = useState({
    fullName: 'Your Name',
    email: 'care.arghya@gmail.com',
    phone: 'Your Number',
    address: 'Your Address',
    city: 'Kolkata',
    state: 'West Bengal',
    postalCode: '700001'
  });

  if (!isOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPaymentFailed(false);
    setPaymentSuccess(false);

    try {
      const orderPayload = {
        customer,
        shippingAddress: {
          line1: customer.address,
          city: customer.city,
          state: customer.state,
          postalCode: customer.postalCode,
          country: 'India'
        },
        items: items.map(item => ({
          product_id: item.product.id,
          variant_id: item.variant?.id,
          product_name: item.product.name,
          quantity: item.quantity,
          price: item.variant?.price_override || item.product.price
        })),
        subtotal: getSubtotal(),
        shippingFee: 0,
        taxAmount: 0
      };

      const orderRes = await api.post('/orders', orderPayload);
      const createdOrder = orderRes.data.data;

      const paymentRes = await api.post('/payments/initiate', {
        gateway: selectedGateway,
        orderId: createdOrder.id
      });

      const { paymentData } = paymentRes.data.data;

      if (selectedGateway === 'razorpay') {
        if (!paymentData || !paymentData.id) {
          setError('Invalid payment data received from the server.');
          setPaymentFailed(true);
          setLoading(false);
          return;
        }

        if (paymentData.id.includes('mock') || paymentData.id.includes('demo')) {
          setError('Backend provided a demo order ID. Please restart your backend server to apply the new live Razorpay keys.');
          setPaymentFailed(true);
          setLoading(false);
          return;
        }

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
          setError('Razorpay SDK failed to load. Are you online?');
          setLoading(false);
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_live_TgZrGbzaYRBa90',
          amount: paymentData.amount, // auto-detected amount from backend
          currency: paymentData.currency,
          name: 'ARGHYA',
          description: 'Payment for your bespoke order',
          order_id: paymentData.id,
          handler: async function (response: any) {
            try {
              const verifyRes = await api.post(`/payments/verify/razorpay`, {
                orderId: createdOrder.id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });

              if (verifyRes.data.success) {
                setPaymentSuccess(true);
                clearCart();
              } else {
                setError('Payment verification failed');
                setPaymentFailed(true);
              }
            } catch (err: any) {
              console.error(err);
              setError(err.response?.data?.error?.message || 'Transaction verification failed');
              setPaymentFailed(true);
            }
          },
          prefill: {
            name: customer.fullName,
            email: customer.email,
            contact: customer.phone
          },
          theme: {
            color: '#3D0C11'
          }
        };

        try {
          const paymentObject = new (window as any).Razorpay(options);
          paymentObject.on('payment.failed', function (response: any) {
            setError(response.error.description || 'Payment failed');
            setPaymentFailed(true);
          });
          paymentObject.open();
        } catch (rzpErr: any) {
          console.error('Razorpay initialization error:', rzpErr);
          setError('Failed to open Razorpay gateway: ' + (rzpErr.message || 'Unknown error'));
          setPaymentFailed(true);
        }
        
        setLoading(false);
      } else {
        // Fallback mock for other gateways
        const verifyRes = await api.post(`/payments/verify/${selectedGateway}`, {
          orderId: createdOrder.id,
          razorpay_order_id: paymentData.id || createdOrder.order_number,
          razorpay_payment_id: `pay_mock_${Date.now()}`,
          razorpay_signature: 'mock_signature'
        });

        if (verifyRes.data.success) {
          setPaymentSuccess(true);
          clearCart();
        } else {
          setError('Payment verification failed');
          setPaymentFailed(true);
        }
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error?.message || 'Transaction could not be completed');
      setPaymentFailed(true);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      {/* ComingSoonCard — shown over PaymentModal when user clicks Stripe/Cashfree/Paytm */}
      <ComingSoonCard
        isOpen={comingSoonGateway !== null}
        onClose={() => setComingSoonGateway(null)}
        gatewayName={comingSoonGateway?.name}
        gatewayIcon={comingSoonGateway?.icon}
      />
      {/* Glassmorphism Card */}
      <div
        className="relative max-w-xl w-full p-6 sm:p-8 rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 border border-white/10 dark:border-amber-500/20"
        style={{
          background: 'rgba(28, 25, 23, 0.65)',
          backdropFilter: 'blur(24px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
          boxShadow: '0 8px 48px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Subtle glass sheen overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)',
          }}
        />

        <div className="relative z-10 text-stone-100">
          {paymentSuccess ? (
            <PaymentSuccessAnimation onContinue={onClose} />
          ) : paymentFailed ? (
            <PaymentFailureAnimation 
              onRetry={() => {
                setPaymentFailed(false);
                setError(null);
              }} 
              error={error || undefined} 
            />
          ) : (
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold luxury-text-gradient">Checkout & Payment</h3>
                  <p className="text-[11px] text-stone-400">Select payment gateway & enter delivery details</p>
                </div>
                <button type="button" onClick={onClose} className="text-stone-400 hover:opacity-75 font-bold text-lg">✕</button>
              </div>

              {error && (
                <div className="bg-rose-950/60 border border-rose-400/30 text-rose-200 text-xs p-3 rounded-lg flex items-center gap-2 backdrop-blur-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Customer Details */}
              <div className="space-y-3 text-xs">
                <h4 className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">1. Shipping Information</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="bg-white/5 border border-white/10 px-3 py-2 rounded text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 backdrop-blur-sm transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="bg-white/5 border border-white/10 px-3 py-2 rounded text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 backdrop-blur-sm transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Your Number"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="bg-white/5 border border-white/10 px-3 py-2 rounded text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 backdrop-blur-sm transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Your Address"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="bg-white/5 border border-white/10 px-3 py-2 rounded text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 backdrop-blur-sm transition-all"
                  />
                </div>
              </div>

              {/* Gateway Selection */}
              <div className="space-y-3">
                <h4 className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">2. Select Payment Gateway</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'razorpay', label: 'Razorpay (UPI, Cards, NetBanking)', icon: '⚡', available: true },
                    { id: 'stripe',   label: 'Stripe (International Cards)',       icon: '💳', available: false },
                    { id: 'cashfree', label: 'Cashfree Payments',                  icon: '🏦', available: false },
                    { id: 'paytm',    label: 'Paytm Wallet & UPI',                 icon: '📲', available: false },
                  ].map((gw) => (
                    <button
                      key={gw.id}
                      type="button"
                      onClick={() => {
                        if (gw.available) {
                          setSelectedGateway(gw.id as any);
                        } else {
                          // Open ComingSoonCard for unavailable gateways
                          setComingSoonGateway({ name: gw.label, icon: gw.icon });
                        }
                      }}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all backdrop-blur-sm text-left ${
                        selectedGateway === gw.id && gw.available
                          ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold'
                          : 'border-white/10 bg-white/5 text-stone-300 hover:border-white/20'
                      }`}
                    >
                      <span className="text-base mr-2">{gw.icon}</span>
                      <span className="text-[11px] font-semibold">{gw.label}</span>
                      {!gw.available && (
                        <span className="ml-auto text-[9px] font-bold text-purple-400 uppercase tracking-wide shrink-0 pl-1">
                          Soon
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Summary & Pay Action */}
              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 block font-medium">Total Payable Amount</span>
                  <span className="text-xl font-bold text-amber-400">₹{getSubtotal().toLocaleString('en-IN')}</span>
                </div>
                <BulgeWidget scaleHover={1.06} liftY={-4}>
                  <button
                    type="submit"
                    disabled={loading || items.length === 0}
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShieldCheck size={18} />
                    <span>{loading ? 'Processing...' : `Pay via ${selectedGateway.toUpperCase()}`}</span>
                  </button>
                </BulgeWidget>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

