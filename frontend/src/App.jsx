import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Importing Screens (to be created)
import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import DashboardScreen from './screens/DashboardScreen';
import TriggerAlertScreen from './screens/TriggerAlertScreen';
import PolicyDetailsScreen from './screens/PolicyDetailsScreen';
import ClaimsHistoryScreen from './screens/ClaimsHistoryScreen';
import MyCoverageScreen from './screens/MyCoverageScreen';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/trigger" element={<TriggerAlertScreen />} />
          <Route path="/policy" element={<PolicyDetailsScreen />} />
          <Route path="/claims" element={<ClaimsHistoryScreen />} />
          <Route path="/mycoverage" element={<MyCoverageScreen />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
