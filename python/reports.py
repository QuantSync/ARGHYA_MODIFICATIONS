"""
Arghya Modifications - Automated Executive Report Generator
"""
import json
import sys
import os

# Ensure the python/ directory is in path regardless of where script is run from
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from analytics import generate_analytics
from inventory_optimizer import run_inventory_optimization

def export_executive_summary():
    print("Generating Executive Summary Report for Arghya Modifications...")
    analytics_data = generate_analytics()
    inventory_data = run_inventory_optimization()

    report = {
        "brand": "Arghya Modifications",
        "generated_at": "2026-09-20",
        "analytics": analytics_data,
        "inventory": inventory_data
    }

    with open("executive_report.json", "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    print("\n[SUCCESS] Report exported successfully to executive_report.json")

if __name__ == "__main__":
    export_executive_summary()
