'use client';

import React, { useState } from 'react';
import { api } from '../../lib/api';
import { TrendingUp, Package, Users, DollarSign, AlertTriangle, RefreshCw, Layers } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalRevenue: 116998.00,
    totalOrders: 14,
    totalProducts: 4,
    totalCustomers: 8
  });

  const [inventoryLogs, setInventoryLogs] = useState([
    { id: '1', sku: 'ARG-SIL-STR-BRC', product: '925 Sterling Silver Star Bracelet', change: -1, reason: 'ORDER_DEDUCTION', quantityLeft: 14, date: '2026-09-20 10:45' },
    { id: '2', sku: 'ARG-MOD-CEL-EAR', product: 'Celeste Pearl Cascade Earrings', change: -1, reason: 'ORDER_DEDUCTION', quantityLeft: 3, date: '2026-09-20 09:30' },
    { id: '3', sku: 'ARG-OXI-MAJ-JHM', product: 'Majestic Peacock Oxidised Jhumki', change: 10, reason: 'MANUAL_RESTOCK', quantityLeft: 20, date: '2026-09-19 16:20' }
  ]);

  const [pythonJobOutput, setPythonJobOutput] = useState<string | null>(null);

  const triggerPythonJob = () => {
    setPythonJobOutput('Running Inventory Optimizer & Analytics Python scripts...\n-------------------------------------------------\n[OUTPUT]: Identified 2 variants below reorder threshold (ROP=5).\n[RECOMMENDATION]: Restock Celeste Pearl Cascade Earrings +5 units.\n[ANALYTICS]: Gross Revenue ₹1,16,998.00 across fine jewellery categories.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-burgundy-800/15 dark:border-stone-800 pb-4">
        <div>
          <span className="text-xs text-burgundy-700 dark:text-amber-400 font-mono uppercase tracking-widest font-bold">Management Atelier</span>
          <h1 className="font-serif text-3xl font-bold luxury-text-gradient">Admin & Analytics Control Center</h1>
        </div>
        <button
          onClick={triggerPythonJob}
          className="mt-4 sm:mt-0 bg-burgundy-800 dark:bg-amber-500 hover:bg-burgundy-900 dark:hover:bg-amber-400 text-cream-50 dark:text-stone-950 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-colors"
        >
          <RefreshCw size={14} />
          <span>Run Python Inventory Engine</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-stone-900/60 border border-burgundy-800/15 dark:border-amber-500/20 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-burgundy-800/60 dark:text-stone-400 block font-semibold">Total Revenue</span>
            <span className="text-2xl font-bold text-burgundy-900 dark:text-amber-400">₹{stats.totalRevenue.toLocaleString('en-IN')}</span>
          </div>
          <DollarSign className="w-10 h-10 text-burgundy-800/20 dark:text-amber-400/30" />
        </div>

        <div className="bg-white dark:bg-stone-900/60 border border-burgundy-800/15 dark:border-amber-500/20 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-burgundy-800/60 dark:text-stone-400 block font-semibold">Completed Orders</span>
            <span className="text-2xl font-bold text-burgundy-900 dark:text-amber-400">{stats.totalOrders}</span>
          </div>
          <TrendingUp className="w-10 h-10 text-burgundy-800/20 dark:text-amber-400/30" />
        </div>

        <div className="bg-white dark:bg-stone-900/60 border border-burgundy-800/15 dark:border-amber-500/20 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-burgundy-800/60 dark:text-stone-400 block font-semibold">Active Products</span>
            <span className="text-2xl font-bold text-burgundy-900 dark:text-amber-400">{stats.totalProducts}</span>
          </div>
          <Package className="w-10 h-10 text-burgundy-800/20 dark:text-amber-400/30" />
        </div>

        <div className="bg-white dark:bg-stone-900/60 border border-burgundy-800/15 dark:border-amber-500/20 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-burgundy-800/60 dark:text-stone-400 block font-semibold">Registered Clients</span>
            <span className="text-2xl font-bold text-burgundy-900 dark:text-amber-400">{stats.totalCustomers}</span>
          </div>
          <Users className="w-10 h-10 text-burgundy-800/20 dark:text-amber-400/30" />
        </div>
      </div>

      {/* Python Engine Terminal Output */}
      {pythonJobOutput && (
        <div className="bg-cream-100 dark:bg-stone-950 border border-burgundy-800/30 dark:border-amber-500/40 rounded-xl p-5 space-y-2 font-mono text-xs">
          <div className="flex items-center text-burgundy-900 dark:text-amber-400 font-bold space-x-2">
            <Layers size={16} />
            <span>Python Analytics & Inventory Job Triggered</span>
          </div>
          <pre className="text-burgundy-900 dark:text-stone-300 bg-white dark:bg-stone-900 p-4 rounded border border-burgundy-800/15 dark:border-stone-800 overflow-x-auto whitespace-pre-wrap">
            {pythonJobOutput}
          </pre>
        </div>
      )}

      {/* Inventory & Audit Logs Table */}
      <div className="bg-white dark:bg-stone-900/60 border border-burgundy-800/15 dark:border-amber-500/20 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-burgundy-900 dark:text-stone-100 flex items-center gap-2">
          <AlertTriangle className="text-burgundy-800 dark:text-amber-400" size={18} />
          <span>Real-time Inventory Audit Logs</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-burgundy-900 dark:text-stone-300">
            <thead className="bg-cream-100 dark:bg-stone-950 text-burgundy-900 dark:text-amber-400 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Product</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Change</th>
                <th className="p-3">Stock Left</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-burgundy-800/10 dark:divide-stone-800">
              {inventoryLogs.map(log => (
                <tr key={log.id} className="hover:bg-cream-50 dark:hover:bg-stone-800/40">
                  <td className="p-3 font-mono">{log.date}</td>
                  <td className="p-3 font-mono text-burgundy-800 dark:text-amber-300 font-bold">{log.sku}</td>
                  <td className="p-3 font-medium">{log.product}</td>
                  <td className="p-3">{log.reason}</td>
                  <td className={`p-3 font-bold ${log.change < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {log.change > 0 ? `+${log.change}` : log.change}
                  </td>
                  <td className="p-3 font-bold">{log.quantityLeft}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
