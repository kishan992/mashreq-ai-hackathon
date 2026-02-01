from backend.config.settings import AI_CONFIG

class RiskManager:
    def __init__(self):
        self.thresholds = AI_CONFIG["RISK_THRESHOLDS"]

    def assess_risk(self, ai_result):
        score = ai_result['confidence']
        category = ai_result['category']
        
        # Default State
        risk_level = "LOW"
        requires_human = False
        
        # Governance Rules
        if score >= self.thresholds["HIGH"] or category in ["Fraud & Scam", "Misinformation"]:
            risk_level = "HIGH"
            requires_human = True
        elif score >= self.thresholds["MEDIUM"]:
            risk_level = "MEDIUM"
        
        return {
            "risk_level": risk_level,
            "requires_human_approval": requires_human,
            "governance_note": f"Score {score} triggered {risk_level} Protocol."
        }