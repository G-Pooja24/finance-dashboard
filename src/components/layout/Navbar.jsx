import React from 'react';
import { Menu, Sun, Moon, Bell, Search, User, ShieldAlert } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

const Navbar = ({ toggleSidebar }) => {
    const { theme, toggleTheme, role, toggleRole } = useFinance();

    return (
        <nav className="navbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={toggleSidebar} style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <Menu size={24} />
                </button>
                <div style={{ position: 'relative', display: 'none' }} className="lg-block">
                    <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} />
                    <input
                        type="text"
                        placeholder="Search dashboard..."
                        style={{ paddingLeft: '2.5rem', width: '300px' }}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <button
                    onClick={toggleRole}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius)',
                        backgroundColor: role === 'admin' ? 'hsla(var(--primary), 0.1)' : 'hsl(var(--secondary))',
                        color: role === 'admin' ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                    }}
                >
                    {role === 'admin' ? <ShieldAlert size={16} /> : <User size={16} />}
                    Switch to {role === 'admin' ? 'Viewer' : 'Admin'}
                </button>

                <button
                    onClick={toggleTheme}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'hsl(var(--secondary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'hsl(var(--foreground))'
                    }}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1.25rem', borderLeft: '1px solid hsl(var(--border))' }}>
                    <div style={{ textAlign: 'right', display: 'none' }} className="sm-block">
                        <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>John Doe</p>
                        <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>{role === 'admin' ? 'Administrator' : 'Viewer'}</p>
                    </div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'hsl(var(--secondary))', overflow: 'hidden' }}>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
