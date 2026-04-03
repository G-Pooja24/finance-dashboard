import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import './index.css';

function App() {
  return (
    <FinanceProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </FinanceProvider>
  );
}

export default App;
