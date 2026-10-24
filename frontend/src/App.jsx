import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { SafetyMonitor } from './components/SafetyMonitor';
import { CrackDetection } from './components/CrackDetection';
import { ProjectPlanner } from './components/ProjectPlanner';
import { Valuation } from './components/Valuation';
import { KnowledgeBase } from './components/KnowledgeBase';
import { ConstructionChatbot } from './components/ConstructionChatbot';
import { DailySiteAssistant } from './components/DailySiteAssistant';
import { WeatherAdvisor } from './components/WeatherAdvisor';

export const App = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<SafetyMonitor />} />
          <Route path="/safety" element={<SafetyMonitor />} />
          <Route path="/crack-detection" element={<CrackDetection />} />
          <Route path="/valuation" element={<Valuation />} />
          <Route path="/planner" element={<ProjectPlanner />} />
          <Route path="/knowledge" element={<KnowledgeBase />} />
          <Route path="/chatbot" element={<ConstructionChatbot />} />
          <Route path="/site-assistant" element={<DailySiteAssistant />} />
          <Route path="/weather" element={<WeatherAdvisor />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
