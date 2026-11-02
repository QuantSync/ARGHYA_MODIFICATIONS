"""
Arghya Modifications - Sales & Revenue Analytics Pipeline
"""
try:
    import pandas as pd
    HAS_PANDAS = True
except ImportError:
    HAS_PANDAS = False

def generate_analytics():
    print("=" * 60)
    print("Arghya Modifications - Sales & Category Analytics")
    print("=" * 60)

    # Mock order transaction log
    transactions = [
        {"order_id": "ARG-001", "category": "Saree", "amount": 24999.00, "gateway": "razorpay", "status": "PAID"},
        {"order_id": "ARG-002", "category": "Lehenga", "amount": 48500.00, "gateway": "stripe", "status": "PAID"},
        {"order_id": "ARG-003", "category": "Anarkali", "amount": 14500.00, "gateway": "cashfree", "status": "PAID"},
        {"order_id": "ARG-004", "category": "Saree", "amount": 24999.00, "gateway": "paytm", "status": "PAID"},
        {"order_id": "ARG-005", "category": "Kurti", "amount": 8999.00, "gateway": "razorpay", "status": "PAID"}
    ]

    total_revenue = sum(t["amount"] for t in transactions)

    if HAS_PANDAS:
        df = pd.DataFrame(transactions)
        category_summary = df.groupby("category")["amount"].agg(["sum", "count"]).reset_index()
        category_summary.columns = ["Category", "Total Revenue (INR)", "Orders Count"]
        gateway_summary = df.groupby("gateway")["amount"].sum().reset_index()
        gateway_summary.columns = ["Payment Gateway", "Processed Volume (INR)"]
        print(f"\nTotal Platform Gross Revenue: INR {total_revenue:,.2f}")
        print("\nRevenue Breakdown by Category:")
        print(category_summary.to_string(index=False))
        print("\nPayment Gateway Volume Distribution:")
        print(gateway_summary.to_string(index=False))
    else:
        print(f"\nTotal Platform Gross Revenue: INR {total_revenue:,.2f}")
        print("\nProcessed Transactions:")
        for t in transactions:
            print(f"  * {t['order_id']} | Category: {t['category']} | Gateway: {t['gateway']} | Amount: INR {t['amount']:,.2f}")

    return {"total_revenue": total_revenue, "transactions_count": len(transactions)}

if __name__ == "__main__":
    generate_analytics()
