import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HardHat,
  ShieldAlert,
  Activity,
  Building,
  ClipboardList,
  BookOpen,
  MessageSquare,
  CalendarCheck,
  CloudSun
} from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { to: '/', label: 'Safety Monitor', icon: ShieldAlert },
    { to: '/crack-detection', label: 'Crack Detection', icon: Activity },
    { to: '/valuation', label: 'Real Estate Valuation', icon: Building },
    { to: '/planner', label: 'Project Planner', icon: ClipboardList },
    { to: '/knowledge', label: 'Knowledge Base', icon: BookOpen },
    { to: '/chatbot', label: 'Chatbot', icon: MessageSquare },
    { to: '/site-assistant', label: 'Daily Site Assistant', icon: CalendarCheck },
    { to: '/weather', label: 'Weather Advisor', icon: CloudSun },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <HardHat size={30} color="#f97316" strokeWidth={2.2} />
        <span className="brand-title">
          CONSTRUCT<span className="brand-highlight">AI</span>
        </span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <IconComponent size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="system-version">v1.0.0 ConstructionGPT</div>
        <div className="system-status">
          <span className="status-indicator"></span>
          <span>System Online</span>
        </div>
      </div>
    </aside>
  );
};
