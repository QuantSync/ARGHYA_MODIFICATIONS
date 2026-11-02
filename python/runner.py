"""
Arghya Modifications - Analytics & Inventory Optimization Engine Service
Runs full analytics & inventory optimization pipeline on startup and periodically monitors metrics.
"""
import time
import os
import sys

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from reports import export_executive_summary

INTERVAL_SECONDS = int(os.environ.get("ANALYTICS_INTERVAL_SECONDS", 120))
RUN_ONCE = os.environ.get("RUN_ONCE", "false").lower() in ("true", "1", "yes")

def main():
    print("=" * 60)
    print("[SERVICE] Arghya Modifications - Python Analytics & Inventory Engine")
    print(f"[CONFIG] Interval: {INTERVAL_SECONDS}s | Press Ctrl+C to stop")
    print("=" * 60)
    
    while True:
        try:
            export_executive_summary()
        except Exception as e:
            print(f"[Engine Error] {e}")
        
        if RUN_ONCE:
            break
            
        print(f"\n[SLEEP] Waiting {INTERVAL_SECONDS}s until next inventory check...")
        try:
            time.sleep(INTERVAL_SECONDS)
        except KeyboardInterrupt:
            print("\n[STOP] Python Analytics Engine stopped.")
            break

if __name__ == "__main__":
    main()
