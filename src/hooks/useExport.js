import { useWorkspace } from './useWorkspace';
import { useUI } from './useUI';
import { buildCSV, buildJSON } from '../utils/exporters';
import { downloadFile } from '../utils/download';
import { todayISO } from '../utils/dates';

export function useExport() {
  const { state } = useWorkspace();
  const { showToast } = useUI();
  return {
    exportJSON: () => {
      downloadFile(`kanbanspace-${todayISO()}.json`, buildJSON(state), 'application/json');
      showToast('Workspace exported as JSON');
    },
    exportCSV: () => {
      downloadFile(`kanbanspace-tasks-${todayISO()}.csv`, buildCSV(state), 'text/csv');
      showToast('Tasks exported as CSV');
    },
  };
}
