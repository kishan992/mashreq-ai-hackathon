import json
from pathlib import Path

DATA_FILE = Path(__file__).parent.parent / "data" / "fraud_signals_demo.json"

with open(DATA_FILE, "r", encoding="utf-8") as f:
    demo_data = json.load(f)

for post in demo_data:
    print(post["id"], post["platform"], post["sentiment"], post["risk_level"])
