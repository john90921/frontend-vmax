import { Control, FieldValues, Path } from 'react-hook-form';
import type { RefObject } from 'react';
import type { ScrollView } from 'react-native';

export interface FormPhotoProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  scrollViewRef?: RefObject<ScrollView | null>;
}
