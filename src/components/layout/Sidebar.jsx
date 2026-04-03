import React from 'react';
import { LayoutDashboard, Receipt, TrendingUp, Settings, ShieldCheck, User, Moon, Sun, Menu, X } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { role, theme, toggleTheme } = useFinance();

    const navItems = [
        { name: 'Overview', icon: LayoutDashboard, active: true },
        { name: 'Transactions', icon: Receipt },
        { name: 'Analytics', icon: TrendingUp },
        { name: 'Settings', icon: Settings },
    ];

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'hsl(var(--primary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <TrendingUp size={20} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>FinVista</h2>
                </div>
                <button onClick={() => setIsOpen(false)} style={{ marginLeft: 'auto', display: isOpen ? 'block' : 'none' }} className="md-hidden">
                    <X size={20} />
                </button>
            </div>

            <div className="sidebar-content">
                <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'hsl(var(--muted-foreground))', textTransform: 'uppercase', marginBottom: '0.75rem', paddingLeft: '1rem' }}>Menu</p>
                    {navItems.map((item) => (
                        <a key={item.name} href="#" className={`nav-item ${item.active ? 'active' : ''}`}>
                            <item.icon className="nav-icon" />
                            <span>{item.name}</span>
                        </a>
                    ))}
                </div>

                <div style={{ marginTop: 'auto', borderTop: '1px solid hsl(var(--border))', paddingTop: '1.5rem' }}>
                    <div className="nav-item">
                        <ShieldCheck className="nav-icon" />
                        <span>Role</span>
                        <span className={`role-badge ${role === 'admin' ? '' : 'viewer-badge'}`} style={{ backgroundColor: role === 'admin' ? 'hsl(var(--primary))' : 'hsl(var(--muted))', color: role === 'admin' ? 'white' : 'hsl(var(--muted-foreground))' }}>
                            {role.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
