import { useMemo } from 'react';
import { useWorkspace } from './useWorkspace';
import { useUI } from './useUI';
import { computeStats } from '../utils/stats';

export function useBoardStats() {
  const { columns } = useWorkspace();
  const { tagFilter } = useUI();
  const stats = useMemo(() => computeStats(columns), [columns]);
  // A tag filter from another board is ignored if this board has no such tag.
  const activeTag = stats.tagList.includes(tagFilter) ? tagFilter : 'All';
  return { ...stats, activeTag };
}
