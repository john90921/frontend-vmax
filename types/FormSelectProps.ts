import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: readonly string[];
}
