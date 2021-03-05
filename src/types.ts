interface FormData1 {
  name: string;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  component: string;
  defaultValue?: string;
  rows?: number;
}

interface FormData2 {
  name: string;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  component: string;
  defaultValue?: boolean;
  rows?: number;
}

export type FormData = FormData1 | FormData2;

export interface InitialValues {
  [key: string]: string | boolean | null;
}
