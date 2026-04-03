import React, { useState, useEffect } from 'react';
import { categories } from '../../utils/mockData';

const TransactionForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: categories[0],
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        ...initialData
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
            newErrors.amount = 'Valid positive amount is required';
        }
        if (!formData.date) newErrors.date = 'Date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({
                ...formData,
                amount: Number(formData.amount)
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="e.g., Grocery Shopping"
                    className={errors.description ? 'input-error' : ''}
                />
                {errors.description && <p style={{ fontSize: '0.75rem', color: 'hsl(var(--destructive))', marginTop: '0.25rem' }}>{errors.description}</p>}
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Amount ($)</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        step="0.01"
                        className={errors.amount ? 'input-error' : ''}
                    />
                    {errors.amount && <p style={{ fontSize: '0.75rem', color: 'hsl(var(--destructive))', marginTop: '0.25rem' }}>{errors.amount}</p>}
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={errors.date ? 'input-error' : ''}
                    />
                    {errors.date && <p style={{ fontSize: '0.75rem', color: 'hsl(var(--destructive))', marginTop: '0.25rem' }}>{errors.date}</p>}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
            </div>

            <div className="modal-footer" style={{ margin: '1.5rem -1.5rem -1.5rem', borderRadius: '0 0 var(--radius) var(--radius)' }}>
                <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
                <button type="submit" className="btn-primary">
                    {initialData ? 'Update Transaction' : 'Add Transaction'}
                </button>
            </div>
        </form>
    );
};

export default TransactionForm;
