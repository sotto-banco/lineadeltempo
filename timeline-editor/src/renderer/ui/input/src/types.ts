export interface Props {
  className?: string;
  label: string;
  value: string;
  change: (value: string) => void;
  date?: boolean;
  required?: boolean;
}
