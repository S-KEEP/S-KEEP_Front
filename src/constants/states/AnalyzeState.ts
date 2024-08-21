export enum AnalyzeState {
  SUCCESS = 'SUCCESS',
  PARTIAL = 'PARTIAL',
  FAILED = 'FAILED',
}

export enum AnalyzeCount {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
}

export type AnalyzeStateType = AnalyzeState;
export type AnalyzeCountType = AnalyzeCount;

export function getAnalyzeState(failed: number, success: number): AnalyzeState {
  if (failed === 0 && success >= 1) {
    return AnalyzeState.SUCCESS;
  } else if (failed >= 1 && success >= 1) {
    return AnalyzeState.PARTIAL;
  } else {
    return AnalyzeState.FAILED;
  }
}

export function getAnalyzeCount(failed: number, success: number) {
  const totalCount = failed + success;

  if (totalCount === 1) {
    return AnalyzeCount.SINGLE;
  } else {
    return AnalyzeCount.MULTIPLE;
  }
}
