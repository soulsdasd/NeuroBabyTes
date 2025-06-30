import React, { useEffect } from 'react';
import styled from 'styled-components';

const Notification = ({ notification, onClose }) => {
    useEffect(() => {
        if (notification) {
        const timeout = setTimeout(() => {
            onClose();
        }, 4000); // Oculta la notificación después de 4 segundos

        return () => clearTimeout(timeout);
        }
    }, [notification, onClose]);

    if (!notification) return null;

    const { type, message } = notification;

    return (
        <StyledWrapper>
        <ul className="notification-container">
            <li className={`notification-item ${type}`}>
            <div className="notification-content">
                <div className="notification-icon">{getIcon(type)}</div>
                <div className="notification-text">{message}</div>
            </div>
            <div className="notification-icon notification-close" onClick={onClose}>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>
            </div>
            <div className="notification-progress-bar" />
            </li>
        </ul>
        </StyledWrapper>
    );
};

const getIcon = (type) => {
    const icons = {
        success: (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        ),
        info: (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        ),
        warning: (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        ),
        error: (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        )
    };
    return icons[type] || null;
};

const StyledWrapper = styled.div`
    .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .notification-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        border-radius: 8px;
        color: white;
        margin-bottom: 10px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        position: relative;
    }

    .notification-item.success { background: #38a169; }
    .notification-item.info { background: #3182ce; }
    .notification-item.warning { background: #d69e2e; }
    .notification-item.error { background: #e53e3e; }

    .notification-icon svg {
        width: 20px;
        height: 20px;
    }

    .notification-close {
        cursor: pointer;
        margin-left: auto;
    }

    .notification-text {
        flex: 1;
    }

    .notification-progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background: rgba(255, 255, 255, 0.6);
        animation: progress 4s linear forwards;
    }

    @keyframes progress {
        from { width: 100%; }
        to { width: 0%; }
    }
`;

export default Notification;
