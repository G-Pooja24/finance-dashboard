import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle2, DollarSign } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { generateChartData } from '../../utils/mockData';

const Insights = () => {
    const { transactions, summary } = useFinance();
    const { breakdownData } = generateChartData(transactions);

    const highestSpending = [...breakdownData].sort((a, b) => b.value - a.value)[0];
    const savingsRate = summary.income > 0 ? ((summary.income - summary.expenses) / summary.income * 100) : 0;

    const insights = [
        {
            title: 'Highest Spending',
            description: highestSpending ? `You spent most on ${highestSpending.name} ($${highestSpending.value.toLocaleString()}) this month.` : 'No spending data available.',
            icon: DollarSign,
            color: 'hsl(var(--primary))',
            bg: 'hsla(var(--primary), 0.1)'
        },
        {
            title: 'Monthly Comparison',
            description: 'Your expenses are 12% lower than last month. Keep it up!',
            icon: TrendingUp,
            color: '#22c55e',
            bg: 'rgba(34, 197, 94, 0.1)'
        },
        {
            title: 'Savings Goal',
            description: savingsRate > 20 ? 'Great! You have saved more than 20% of your income.' : 'Try to reduce non-essential spending to reach your 20% savings goal.',
            icon: savingsRate > 20 ? CheckCircle2 : AlertTriangle,
            color: savingsRate > 20 ? '#22c55e' : '#f59e0b',
            bg: savingsRate > 20 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)'
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Lightbulb size={20} style={{ color: 'hsl(var(--primary))' }} />
                <h3 style={{ fontWeight: '600' }}>Smart Insights</h3>
            </div>

            {insights.map((insight, index) => (
                <div key={index} className="card" style={{ display: 'flex', gap: '1rem', padding: '1.25rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        backgroundColor: insight.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: insight.color,
                        flexShrink: 0
                    }}>
                        <insight.icon size={20} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>{insight.title}</h4>
                        <p style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.4' }}>{insight.description}</p>
                    </div>
                </div>
            ))}

            <div style={{
                marginTop: '1rem',
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #4f46e5 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Pro Plan</h4>
                    <p style={{ fontSize: '0.75rem', opacity: 0.9, marginBottom: '1rem' }}>Get advanced AI insights and export features with our Pro plan.</p>
                    <button style={{ backgroundColor: 'white', color: 'hsl(var(--primary))', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>Upgrade Now</button>
                </div>
                <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.2 }}>
                    <TrendingUp size={100} />
                </div>
            </div>
        </div>
    );
};

export default Insights;
