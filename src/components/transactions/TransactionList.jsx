import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, MoreVertical, Plus, Trash2, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { categories } from '../../utils/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../common/Modal';
import TransactionForm from './TransactionForm';

const TransactionList = () => {
    console.log('TransactionList rendering...');
    const { filteredTransactions, role, filters, setFilters, deleteTransaction, addTransaction, updateTransaction } = useFinance();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    };

    const handleCategoryChange = (e) => {
        setFilters(prev => ({ ...prev, category: e.target.value }));
    };

    const handleSort = (field) => {
        setFilters(prev => ({
            ...prev,
            sortBy: field,
            sortOrder: prev.sortBy === field && prev.sortOrder === 'desc' ? 'asc' : 'desc'
        }));
    };

    const handleOpenAddModal = () => {
        setEditingTransaction(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleSubmit = (data) => {
        if (editingTransaction) {
            updateTransaction(editingTransaction.id, data);
        } else {
            addTransaction(data);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="card" style={{ padding: '0' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid hsl(var(--border))', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h3 style={{ fontWeight: '600' }}>Recent Transactions</h3>
                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Manage and track your latest activities.</p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={filters.search}
                            onChange={handleSearchChange}
                            style={{ paddingLeft: '2.25rem', width: '200px', fontSize: '0.875rem' }}
                        />
                    </div>

                    <div className="md-hidden" style={{ display: 'flex', gap: '0.5rem' }}>
                        <select
                            value={filters.category}
                            onChange={handleCategoryChange}
                            style={{ fontSize: '0.875rem' }}
                        >
                            <option value="All">All Categories</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>

                        {role === 'admin' && (
                            <button
                                onClick={handleOpenAddModal}
                                className="btn-primary"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <Plus size={18} />
                                Add
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
            >
                <TransactionForm
                    initialData={editingTransaction}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                            <th onClick={() => handleSort('date')} style={{ padding: '1rem 1.5rem', cursor: 'pointer' }}>
                                Date <ArrowUpDown size={12} style={{ marginLeft: '4px' }} />
                            </th>
                            <th style={{ padding: '1rem 1.5rem' }}>Description</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Category</th>
                            <th onClick={() => handleSort('amount')} style={{ padding: '1rem 1.5rem', cursor: 'pointer' }}>
                                Amount <ArrowUpDown size={12} style={{ marginLeft: '4px' }} />
                            </th>
                            <th style={{ padding: '1rem 1.5rem' }}>Type</th>
                            {role === 'admin' && <th style={{ padding: '1rem 1.5rem' }}>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {filteredTransactions.map((t) => (
                                <motion.tr
                                    key={t.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ borderBottom: '1px solid hsl(var(--border))', fontSize: '0.875rem' }}
                                >
                                    <td style={{ padding: '1rem 1.5rem' }}>{new Date(t.date).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{t.description}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            backgroundColor: 'hsl(var(--secondary))',
                                            fontSize: '0.75rem'
                                        }}>{t.category}</span>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>
                                        ${t.amount.toLocaleString()}
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span className={`badge badge-${t.type}`}>{t.type.toUpperCase()}</span>
                                    </td>
                                    {role === 'admin' && (
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button onClick={() => handleOpenEditModal(t)} style={{ color: 'hsl(var(--primary))' }}>
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => deleteTransaction(t.id)} style={{ color: 'hsl(var(--destructive))' }}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
                {filteredTransactions.length === 0 && (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>
                        No transactions found.
                    </div>
                )}
            </div>

            <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid hsl(var(--border))' }}>
                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Showing {filteredTransactions.length} results</p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-secondary" style={{ padding: '0.25rem 0.5rem' }} disabled><ChevronLeft size={16} /></button>
                    <button className="btn-secondary" style={{ padding: '0.25rem 0.5rem' }} disabled><ChevronRight size={16} /></button>
                </div>
            </div>
        </div>
    );
};

export default TransactionList;
