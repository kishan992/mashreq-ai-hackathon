import os
import time

class ActionExecutor:
    def __init__(self):
        # Create an 'outputs' folder in the root if it doesn't exist
        self.output_dir = "outputs_generated"
        os.makedirs(self.output_dir, exist_ok=True)

    def execute_actions(self, signal_data):
        print("\n [ZONE 3] Executing Authorized Actions...")
        
        # 1. Update Chatbot (Simulated)
        self._update_kb(signal_data)
        
        # 2. Generate PDF Report
        report_path = self._generate_pdf(signal_data)
        
        return {"status": "SUCCESS", "report": report_path}

    def _update_kb(self, data):
        print(f"   >>> Updating Chatbot Vector DB with incident: {data['signal'][:30]}...")
        time.sleep(0.5)

    def _generate_pdf(self, data):
        filename = f"{self.output_dir}/Executive_Briefing_{int(time.time())}.txt"
        with open(filename, "w") as f:
            f.write("MASHREQ BANK - SOCIAL SIGNAL BRIEFING\n")
            f.write("-------------------------------------\n")
            f.write(f"RISK LEVEL: {data['risk_level']}\n")
            f.write(f"CATEGORY:   {data['category']}\n")
            f.write(f"SIGNAL:     {data['signal']}\n")
        print(f"   >>> Generated Executive Report: {filename}")
        return filename