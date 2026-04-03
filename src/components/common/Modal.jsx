import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import '../../styles/modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content card animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{title}</h3>
                    <button onClick={onClose} className="modal-close-btn">
                        <X size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
