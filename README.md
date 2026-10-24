# ConstructAI - Multimodal Construction Intelligence Platform

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110%2B-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)

An enterprise-grade, multimodal decision-support platform designed for civil engineers, site managers, safety officers, and real estate developers. **ConstructAI** unifies computer vision, natural language processing, deterministic engineering calculation engines, and regulatory compliance rules to streamline on-site operations and project planning.

---

## 🏗️ Core Modules & Capabilities

### 1. Site Safety Monitoring (`/api/safety-monitor`)
- **Multimodal Inputs:** Accepts observation descriptions, high-resolution site photographs, and PDF/text safety logs or permits.
- **Hazard Identification:** Pinpoints elevated fall risks, unguarded scaffolds, electrical hazards, and excavation cave-in vulnerabilities.
- **PPE Compliance Matrix:** Evaluates observed personal protective equipment against OSHA 1926 standards and flags missing equipment.
- **Regulatory Action Plan:** Outlines immediate corrective interventions and cites relevant OSHA and Indian Standards (IS).

### 2. Structural Crack Diagnosis (`/api/crack-detection`)
- **Fracture Classification:** Identifies structural shear cracks, differential settlement fractures, horizontal bed-joint cracks, and plastic shrinkage hairlines.
- **Forensic Causality Analysis:** Pinpoints probable root causes including thermal movement, rebar deficiency, sub-grade shifting, and over-loading.
- **Remediation Protocols:** Details specialized structural repairs (e.g., epoxy injection ASTM C881, carbon-fiber CFRP wrapping, helical micropiles).

### 3. Construction Project Planner (`/api/project-planner`)
- **Natural Language Brief Parsing:** Parses plot sizes and dimensions (e.g., "20x30 slab construction").
- **Material Estimator:** Dynamic calculation of Cement (bags), Sand (tons), Coarse Aggregate (tons), Fe500D TMT Steel (kg), and wet Concrete Volume ($m^3$).
- **Cost Estimator:** Real-time cost modeling in Indian Rupees (₹) across Materials, Labour, and Finishing with itemized totals.
- **Time Schedule:** Phase-wise milestone timeline (Centering, Rebar Binding, Pouring, 14–21 day pond curing).
- **Component Error Boundary:** Protected by React `<ErrorBoundary>` to ensure graceful fallback rendering.

### 4. Real Estate Valuation Engine (`/api/real-estate-valuation`)
- **Location-Calibrated Pricing:** Benchmarked against prime metropolitan corridors (Mumbai, Delhi-NCR, Bangalore, Pune, etc.).
- **Multi-Factor Adjustments:** Evaluates age depreciation, property classification (Residential, Commercial, Industrial), and luxury amenity packages.
- **Financial Projections:** Outputs estimated market value ranges (₹), price per square foot, monthly rental potential, and annual capital appreciation yields.

### 5. Daily Site Assistant (`/api/site-assistant`)
- **Operational Workflow:** Automatically breaks down planned daily activities (Concreting, Excavation, Masonry) into sequential task steps.
- **Safety Checks:** Highlights imperative daily PPE and equipment verification badges.
- **Risk Mitigation:** Issues proactive hazard alerts to prevent segregation, cold joints, and worker fatigue.

### 6. Weather-Aware Advisory (`/api/weather-advisor`)
- **Meteorological Impact Evaluation:** Models adverse weather scenarios (monsoonal downpours, wind gusts, extreme heat >40°C) on active construction.
- **Decision Status:** Generates high-visibility `PROCEED WITH CAUTION`, `GO / SAFE`, or `NO-GO / HIGH RISK` banners with specific mitigation steps.

### 7. Construction Domain Chatbot (`/api/chatbot`)
- **Conversational Civil Assistant:** Answers technical questions on mix designs (M20/M25), curing durations, and formwork stripping intervals (IS 456).
- **Interactive Suggestion Chips:** Dynamically suggests follow-up queries for rapid exploration.

### 8. Knowledge Base Assistant (`/api/knowledge-base`)
- **Categorized Reference:** Searchable guidelines across `SAFETY`, `TECHNIQUE`, and `DOC GEN` (Daily Progress Report templates).
- **Standards Integration:** Cites relevant IS codes, OSHA regulations, and ACI recommendations.

---

## 🖥️ System Architecture

```
perojact/
├── backend/
│   ├── main.py              # FastAPI application & multimodal endpoints
│   ├── test_api.py          # Automated endpoint & schema test suite
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment template
│   └── venv/                # Python virtual environment
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Feature modules & UI components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SafetyMonitor.jsx
│   │   │   ├── CrackDetection.jsx
│   │   │   ├── ProjectPlanner.jsx
│   │   │   ├── Valuation.jsx
│   │   │   ├── DailySiteAssistant.jsx
│   │   │   ├── WeatherAdvisor.jsx
│   │   │   ├── ConstructionChatbot.jsx
│   │   │   ├── KnowledgeBase.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── App.jsx          # Route configuration
│   │   ├── index.css        # Industrial design system
│   │   └── main.jsx         # Application entry point
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Python**: 3.9 or higher
- **Node.js**: v18 or higher (tested on Node v20)
- **npm**: v9 or higher

---

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate    # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **(Optional) Configure environment variables:**
   ```bash
   cp .env.example .env
   # Add your GROQ_API_KEY if desired; the built-in engineering engine works out-of-the-box without keys!
   ```

5. **Start the FastAPI backend server:**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
   *The backend will be live at `http://localhost:8000` with interactive Swagger docs at `http://localhost:8000/docs`.*

6. **Run the automated backend test suite:**
   ```bash
   python3 test_api.py
   ```

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The application will be accessible at `http://localhost:5173`.*

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🧪 Quality Assurance & Resilience

- **Defensive Rendering:** All components include null-safe property access and fallback values to prevent crashes on partial or unconventional AI outputs.
- **Component Safeguards:** React Error Boundaries intercept rendering exceptions without unmounting the rest of the application.
- **Dual Inference Engine:** Combines LLM reasoning (Groq LLaMA-3.3 70B) with high-fidelity deterministic fallback heuristics calibrated to civil engineering codes.
