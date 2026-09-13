export interface QuestionOption {
  id: number;
  text: string;
}

export interface ExamQuestion {
  id: number;
  questionNumber: number;
  prompt: string;
  context?: string; // e.g. given conditions
  options: string[];
}

export interface StudentInfoField {
  id: string;
  label: string;
  type: 'SHORT_ANSWER' | 'MULTIPLE_CHOICE';
  required: boolean;
  options?: string[];
}

export interface CreatedFormResult {
  formId: string;
  title: string;
  description: string;
  responderUri: string;
  editUri: string;
  createdAt: string;
}
