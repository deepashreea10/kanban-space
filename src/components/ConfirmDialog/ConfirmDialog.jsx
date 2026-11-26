import Modal from '../Modal/Modal';

function ConfirmDialog({ title, message, confirmLabel, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p style={{ margin: '0 0 16px', color: 'var(--muted)' }}>{message}</p>
      <div className="form-actions" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button type="button" className="ghost" onClick={onCancel}>Cancel</button>
        <button type="button" className="danger" style={{ margin: 0 }} onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
