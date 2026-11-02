"""
Arghya Modifications - Inventory Optimizer & Demand Forecaster
Calculates reorder points and identifies stockout risk for fashion inventory.
"""
try:
    import pandas as pd
    import numpy as np
    HAS_PANDAS = True
except ImportError:
    HAS_PANDAS = False

def calculate_reorder_point(daily_sales_velocity, lead_time_days=7, safety_stock=5):
    return (daily_sales_velocity * lead_time_days) + safety_stock

def run_inventory_optimization():
    print("=" * 60)
    print("Arghya Modifications - Inventory Optimization Report")
    print("=" * 60)

    sample_inventory = [
        {"sku": "ARG-SAR-CRIM-FS", "product": "Royal Crimson Banarasi Silk Saree", "current_stock": 15, "avg_daily_sales": 2.5, "category": "Saree"},
        {"sku": "ARG-LEH-EMR-M", "product": "Emerald Green Zardozi Velvet Lehenga (M)", "current_stock": 3, "avg_daily_sales": 0.8, "category": "Lehenga"},
        {"sku": "ARG-ANK-PNK-M", "product": "Blush Pink Chanderi Anarkali Suit (M)", "current_stock": 20, "avg_daily_sales": 3.1, "category": "Anarkali"},
        {"sku": "ARG-KUR-IVR-M", "product": "Ivory Pearl Embroidered Silk Kurti Set (M)", "current_stock": 2, "avg_daily_sales": 1.2, "category": "Kurti"}
    ]

    for item in sample_inventory:
        rop = calculate_reorder_point(item["avg_daily_sales"])
        item["reorder_point"] = rop
        item["needs_restock"] = item["current_stock"] <= rop
        status = "[REORDER NEEDED]" if item["needs_restock"] else "[OK]"
        print(f"  * {item['sku']} | {item['product']} | Stock: {item['current_stock']} | ROP: {rop:.1f} | Status: {status}")

    return sample_inventory

if __name__ == "__main__":
    run_inventory_optimization()
