import React from 'react';
import ReactDOM from 'react-dom';
import { FocusTrap } from 'focus-trap-react';
import styles from './Dialog.module.css';

interface DialogProps {
  title: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  portalRoot?: HTMLElement;
}

export const Dialog: React.FC<DialogProps> = ({ title, onClose, children, portalRoot }) => {
  const targetRoot = portalRoot || document.getElementById('dialog-root') as HTMLElement;

  if (!targetRoot) {
    console.warn('Dialog: No portal root found. Dialog will not render.');
    return null;
  }

  return ReactDOM.createPortal(
    <FocusTrap>
      <div className={styles.overlay} onClick={onClose} data-cy="dialog-overlay">
        <div className={styles.dialog} onClick={(e) => e.stopPropagation()} data-cy="dialog">
          <header className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              className={styles['close-btn']}
              onClick={onClose}
              aria-label="Close"
              data-cy="dialog-close-btn"
            >
              ×
            </button>
          </header>

          <main className={styles.body} data-cy="dialog-body">{children}</main>
        </div>
      </div>
    </FocusTrap>,
    targetRoot
  );
};
