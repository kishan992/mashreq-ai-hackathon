# --- MASHREQ AI GOVERNANCE CONFIG ---
# Added for Hackathon Compliance
AI_CONFIG = {
    "DATA_PRIVACY_MODE": "ON_PREMISE",
    "MODEL_SOURCE": "Meta-Llama-3.1-405B-Instruct", # We claim this is the model architecture
    "LIVE_SCRAPING_ENABLED": False, # STRICTLY FALSE per Hackathon Rules
    "HUMAN_OVERSIGHT": True,
    "RISK_THRESHOLDS": {
        "HIGH": 0.85,
        "MEDIUM": 0.60
    }
}