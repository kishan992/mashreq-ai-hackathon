# 🛡️ Mashreq Social Signal Intelligence Engine
### *Responsible AI for Brand Resilience & Risk Governance*

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Llama 3.1](https://img.shields.io/badge/Model-Llama_3.1_405B-purple?style=for-the-badge)](https://ai.meta.com/llama/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Hackathon_Submission-orange?style=for-the-badge)]()

---

## 📖 Executive Summary
In the modern banking sector, misinformation travels faster than transactions. A single viral rumor or phishing campaign can destabilize brand trust in minutes.

The **Social Signal Intelligence Engine** is an enterprise-grade, privacy-first system designed to **detect, govern, and respond** to social risks without compromising data security. Unlike standard sentiment tools, our architecture enforces a **Human-in-the-Loop Decision Gate**, ensuring that AI suggests actions but never executes sensitive protocols without analyst approval.

---

## 🏗️ System Architecture

Our solution is divided into three strictly isolated security zones to ensure compliance with Mashreq's data sovereignty policies.

### 🔹 Zone 1: Secure Data Ingestion (The Brain)
* **Input:** Synthetic Social Data Stream (No Live Scraping).
* **Processing:** Local Inference Node (Simulating Llama 3.1 405B).
* **Output:** Classifies signals into *Fraud*, *Service Incident*, *Brand Sentiment*, or *Misinformation*.

<img src="AI%20Flowchart/zone1-pipeline.png" width="600" alt="Zone 1 Architecture">

### 🔸 Zone 2: Governance & Compliance (The Guardrails)
* **Logic:** The "Risk Scoring Engine" evaluates confidence levels.
* **The Checkpoint:** High-risk alerts (>85% Confidence) trigger a **Decision Gate**.
* **Dashboard:** Analysts review AI reasoning before approving execution.

<img src="AI%20Flowchart/zone2-pipeline.png" width="600" alt="Zone 2 Architecture">

### 🟢 Zone 3: Authorized Execution (The Action)
* **Approved:** Once a human clicks "Approve," the system executes parallel responses.
* **Actions:** Updates Chatbot Knowledge Base, Pushes App Notifications, and Generates Executive Briefings.

<img src="AI%20Flowchart/zone3-pipeline.png" width="600" alt="Zone 3 Architecture">

---

## ⚡ Key Features

| Feature | Description | Tech Stack |
| :--- | :--- | :--- |
| **Privacy-First AI** | All inference runs on-premise. No customer data is sent to external cloud APIs. | `Llama 3.1` (Simulated), `PyTorch` |
| **Decision Gate** | Hard-coded governance layer preventing "AI Hallucination" risks. | `Python`, `Flask` |
| **Dual-Mode Inference** | Uses keyword heuristics + LLM logic to guarantee accuracy during demos. | `Transformers`, `Pandas` |
| **Automated Response** | Instantly generates PDFs and updates vector DBs upon approval. | `ReportLab`, `JSON` |

---

## 🚀 Installation & Usage

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/mashreq-ai-hackathon.git](https://github.com/YOUR_USERNAME/mashreq-ai-hackathon.git)
cd mashreq-ai-hackathon