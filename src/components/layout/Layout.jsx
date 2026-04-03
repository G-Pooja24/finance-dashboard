import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../../styles/layout.css';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className={`layout-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="main-wrapper">
                <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
