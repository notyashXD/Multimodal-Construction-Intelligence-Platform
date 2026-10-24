"""
ConstructAI Backend Test Suite
Validates schema compliance, responses, and edge-cases across all 8 endpoints.
"""

import sys
import unittest
from fastapi.testclient import TestClient
from main import app

class TestConstructAIEndpoints(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_01_health_check(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "online")
        self.assertIn("v1.0.0 ConstructionGPT", data.get("system"))

    def test_02_safety_monitor(self):
        payload = {"description": "Workers observed on scaffold without safety harness"}
        response = self.client.post("/api/safety-monitor", data=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn(data.get("risk_level"), ["High", "Critical", "Moderate", "Low"])
        self.assertIsInstance(data.get("hazards"), list)
        self.assertTrue(len(data.get("hazards")) > 0)
        self.assertIsInstance(data.get("osha_standards"), list)
        self.assertIsInstance(data.get("corrective_actions"), list)

    def test_03_crack_detection(self):
        payload = {"description": "Diagonal shear crack on concrete beam support"}
        response = self.client.post("/api/crack-detection", data=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("crack_type", data)
        self.assertIn(data.get("severity_level"), ["Severe", "Moderate", "Minor"])
        self.assertIsInstance(data.get("probable_causes"), list)
        self.assertIsInstance(data.get("recommended_repairs"), list)

    def test_04_project_planner(self):
        payload = {"prompt": "Create full plan for 20x30 slab construction"}
        response = self.client.post("/api/project-planner", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("materials_table", data)
        self.assertIn("cost_table", data)
        self.assertIn("schedule", data)
        # Check that total cost is in Indian Rupees
        total_rows = [r for r in data["cost_table"] if r.get("category") == "TOTAL"]
        self.assertTrue(len(total_rows) > 0)
        self.assertTrue(total_rows[0]["cost"].startswith("₹"))

    def test_05_real_estate_valuation(self):
        payload = {
            "location": "Bandra West, Mumbai",
            "area": 1200,
            "age": 5,
            "property_type": "Residential",
            "amenities": "Pool, Gym, Parking"
        }
        response = self.client.post("/api/real-estate-valuation", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("market_value_range", data)
        self.assertIn("price_per_sqft", data)
        self.assertIn("rental_potential", data)
        self.assertIn("₹", data["market_value_range"])

    def test_06_site_assistant(self):
        payload = {
            "planned_activity": "Concreting",
            "labour_count": 12,
            "site_condition": "Normal"
        }
        response = self.client.post("/api/site-assistant", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data.get("tasks"), list)
        self.assertIsInstance(data.get("safety_checks"), list)
        self.assertIsInstance(data.get("risk_alerts"), list)

    def test_07_weather_advisor(self):
        payload = {
            "planned_activity": "Slab Conversion",
            "weather": "Cloudy"
        }
        response = self.client.post("/api/weather-advisor", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("status_type", data)
        self.assertIn("banner_title", data)
        self.assertIsInstance(data.get("hazards"), list)
        self.assertIsInstance(data.get("required_precautions"), list)

    def test_08_chatbot(self):
        payload = {
            "message": "What is the minimum curing period for OPC concrete slab?",
            "history": []
        }
        response = self.client.post("/api/chatbot", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("reply", data)
        self.assertIsInstance(data.get("action_suggestions"), list)

    def test_09_knowledge_base(self):
        payload = {
            "category": "SAFETY",
            "query": "Steps for scaffolding"
        }
        response = self.client.post("/api/knowledge-base", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("title", data)
        self.assertIn("content", data)
        self.assertIsInstance(data.get("standards_referenced"), list)
        self.assertIsInstance(data.get("key_checkpoints"), list)


if __name__ == "__main__":
    unittest.main()
