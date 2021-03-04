export interface FormData {
  name: string;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  component: string;
  defaultValue?: string;
  rows?: number;
}

export interface InitialValues {
  [key: string]: string;
}
