import React from 'react';
import SummaryCards from './SummaryCards';
import Charts from './Charts';
import TransactionList from '../transactions/TransactionList';
import Insights from '../insights/Insights';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
                <p style={{ color: 'hsl(var(--muted-foreground))' }}>Welcome back, here's what's happening with your money today.</p>
            </div>

            <SummaryCards />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                <Charts />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                    <TransactionList />
                </div>
                <div>
                    <Insights />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
