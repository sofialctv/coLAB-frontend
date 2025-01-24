export interface IField {
  key: string;
  type?: 'checkbox' | 'text' | 'select' | 'date';
  label: string;
  required?: boolean;
  default?: string | boolean;
}
