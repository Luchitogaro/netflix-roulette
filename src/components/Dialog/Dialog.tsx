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
  const targetRoot = portalRoot || document.getElementById('dialog-root') || document.body;

  return ReactDOM.createPortal(
    <FocusTrap>
      <div className={styles['dialog-overlay']} onClick={onClose} data-cy="dialog-overlay">
        <div className={styles['dialog-container']} onClick={(e) => e.stopPropagation()} data-cy="dialog">
          <header className={styles['dialog-header']}>
            <h2 className={styles['dialog-title']}>{title}</h2>
            <button
              className={styles['dialog-close-button']}
              onClick={onClose}
              aria-label="Close"
              data-cy="dialog-close-btn"
            >
              ×
            </button>
          </header>

          <main className={styles['dialog-content']} data-cy="dialog-body">{children}</main>
        </div>
      </div>
    </FocusTrap>,
    targetRoot
  );
};
