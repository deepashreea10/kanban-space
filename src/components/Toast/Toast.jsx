import { useUI } from '../../hooks/useUI';
import './Toast.css';

function Toast() {
  const { toast } = useUI();
  if (!toast) return null;
  return <div className="toast" role="status">{toast}</div>;
}

export default Toast;
