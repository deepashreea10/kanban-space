import { useState } from 'react';
import { useUI } from '../../hooks/useUI';
import { useWorkspace } from '../../hooks/useWorkspace';
import { sanitizeWorkspace } from '../../utils/sanitizeWorkspace';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

// Always mounted: holds the hidden file input (the palette and the Data menu
// both click it) and the "replace everything?" confirmation.
function ImportExport() {
  const ui = useUI();
  const { dispatch } = useWorkspace();
  const [pending, setPending] = useState(null);

  const onFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      setPending(sanitizeWorkspace(JSON.parse(await file.text())));
    } catch (err) {
      ui.showToast(err instanceof SyntaxError ? 'That file is not valid JSON.' : err.message);
    }
  };

  const confirm = () => {
    dispatch({ type: 'REPLACE_WORKSPACE', state: pending });
    ui.setView('board');
    ui.clearFilters();
    ui.showToast('Workspace imported');
    setPending(null);
  };

  return (
    <>
      <input ref={ui.importRef} type="file" accept=".json,application/json" hidden onChange={onFile} />
      {pending && (
        <ConfirmDialog
          title="Replace your workspace?"
          message={`Import ${pending.boards.length} board(s). This replaces your current workspace. Export first if you want a backup.`}
          confirmLabel="Replace workspace"
          onConfirm={confirm}
          onCancel={() => setPending(null)}
        />
      )}
    </>
  );
}

export default ImportExport;
