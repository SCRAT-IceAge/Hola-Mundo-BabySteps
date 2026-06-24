export type ValidationResult = {
  id: number;
  label: string;
  passed: boolean;
};

export type ResultState = 'ok' | 'invalid' | 'parse-error' | null;