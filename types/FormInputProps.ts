import {
  Control,
  FieldValues,
  Path,
} from "react-hook-form";
import {
  TextInputProps
} from "react-native";
export interface FormInputProps<T extends FieldValues>
  extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
}