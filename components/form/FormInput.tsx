import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Controller, FieldValues } from 'react-hook-form';

import { colors } from '@/constants/theme';
import { FormInputProps } from '@/types/FormInputProps';

function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="auth-field">
          <Text className="auth-label">{label}</Text>
          <TextInput
            className={`auth-input ${error ? 'auth-input-error' : ''}`}
            placeholder={placeholder}
            placeholderTextColor={colors.mutedForeground}
            value={value == null ? '' : String(value)}
            onChangeText={onChange}
            onBlur={onBlur}
            {...props}
          />
          {error?.message ? <Text className="auth-error">{error.message}</Text> : null}
        </View>
      )}
    />
  );
}

export default FormInput;
