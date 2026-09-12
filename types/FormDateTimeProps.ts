import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormDateTimeProps<T extends FieldValues> {
  control: Control<T>;
  dateName: Path<T>;
  timeName: Path<T>;
  label?: string;
}
