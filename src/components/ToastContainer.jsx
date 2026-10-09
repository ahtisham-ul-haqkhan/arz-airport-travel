'use client';

import React from 'react';

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div id="toastContainer" className="toast-container-custom">
      {toasts.map((toast) => {
        const icon = toast.type === 'error' ? '⚠️' : toast.type === 'success' ? '✅' : 'ℹ️';
        return (
          <div
            key={toast.id}
            className="toast-custom"
            onClick={() => onDismiss(toast.id)}
            role="status"
          >
            <span style={{ fontSize: '1.2rem' }}>{icon}</span>
            <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</div>
          </div>
        );
      })}
    </div>
  );
}
