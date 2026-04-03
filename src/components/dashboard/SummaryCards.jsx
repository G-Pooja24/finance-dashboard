import React from 'react';
import { TrendingUp, TrendingDown, Wallet, CreditCard } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { motion } from 'framer-motion';

const SummaryCards = () => {
    const { summary } = useFinance();

    const cards = [
        {
            title: 'Total Balance',
            amount: summary.balance,
            icon: Wallet,
            color: 'hsl(var(--primary))',
            bg: 'hsla(var(--primary), 0.1)',
            trend: '+2.5%'
        },
        {
            title: 'Total Income',
            amount: summary.income,
            icon: TrendingUp,
            color: '#22c55e',
            bg: 'rgba(34, 197, 94, 0.1)',
            trend: '+12%'
        },
        {
            title: 'Total Expenses',
            amount: summary.expenses,
            icon: TrendingDown,
            color: '#ef4444',
            bg: 'rgba(239, 68, 68, 0.1)',
            trend: '-5%'
        },
        {
            title: 'Savings Rate',
            amount: (summary.income > 0 ? ((summary.income - summary.expenses) / summary.income * 100).toFixed(1) : 0) + '%',
            icon: CreditCard,
            color: '#a855f7',
            bg: 'rgba(168, 85, 247, 0.1)',
            trend: '+1.2%'
        },
    ];

    const formatCurrency = (val) => {
        if (typeof val === 'string') return val;
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {cards.map((card, index) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            backgroundColor: card.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: card.color,
                            boxShadow: `0 4px 12px ${card.color}20`
                        }}>
                            <card.icon size={24} />
                        </div>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            color: card.trend.startsWith('+') ? '#22c55e' : '#ef4444',
                            backgroundColor: card.trend.startsWith('+') ? '#22c55e15' : '#ef444415',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '8px'
                        }}>
                            {card.trend}
                        </span>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', fontWeight: '600', letterSpacing: '0.01em', marginBottom: '0.35rem' }}>{card.title}</p>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.03em' }}>{formatCurrency(card.amount)}</h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default SummaryCards;
