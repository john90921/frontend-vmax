import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormPhotoProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}
