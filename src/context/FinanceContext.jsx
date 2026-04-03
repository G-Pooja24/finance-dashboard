import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTransactions } from '../utils/mockData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : initialTransactions;
    });

    const [role, setRole] = useState('admin'); // 'admin' or 'viewer'
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    const [filters, setFilters] = useState({
        search: '',
        category: 'All',
        type: 'All',
        sortBy: 'date',
        sortOrder: 'desc',
    });

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const addTransaction = (transaction) => {
        if (role !== 'admin') return;
        setTransactions(prev => [{ ...transaction, id: Date.now().toString() }, ...prev]);
    };

    const deleteTransaction = (id) => {
        if (role !== 'admin') return;
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const updateTransaction = (id, updatedData) => {
        if (role !== 'admin') return;
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
    };

    const toggleRole = () => {
        setRole(prev => prev === 'admin' ? 'viewer' : 'admin');
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const filteredTransactions = transactions
        .filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(filters.search.toLowerCase());
            const matchesCategory = filters.category === 'All' || t.category === filters.category;
            const matchesType = filters.type === 'All' || t.type === filters.type;
            return matchesSearch && matchesCategory && matchesType;
        })
        .sort((a, b) => {
            let comparison = 0;
            if (filters.sortBy === 'date') {
                comparison = new Date(a.date) - new Date(b.date);
            } else if (filters.sortBy === 'amount') {
                comparison = a.amount - b.amount;
            }
            return filters.sortOrder === 'desc' ? -comparison : comparison;
        });

    const summary = transactions.reduce((acc, curr) => {
        if (curr.type === 'income') {
            acc.income += curr.amount;
            acc.balance += curr.amount;
        } else {
            acc.expenses += curr.amount;
            acc.balance -= curr.amount;
        }
        return acc;
    }, { balance: 0, income: 0, expenses: 0 });

    return (
        <FinanceContext.Provider value={{
            transactions,
            filteredTransactions,
            addTransaction,
            deleteTransaction,
            updateTransaction,
            summary,
            role,
            toggleRole,
            theme,
            toggleTheme,
            filters,
            setFilters,
        }}>
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
};
