import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Controller, FieldValues } from 'react-hook-form';

import { FormSelectProps } from '@/types/FormSelectProps';

function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
}: FormSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="auth-field">
          <Text className="auth-label">{label}</Text>
          <View className="category-scroll">
            {options.map((option) => {
              const active = value === option;
              return (
                <TouchableOpacity
                  key={option}
                  className={`category-chip ${active ? 'category-chip-active' : ''}`}
                  onPress={() => onChange(option)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}>
                  <Text
                    className={`category-chip-text ${active ? 'category-chip-text-active' : ''}`}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {error?.message ? <Text className="auth-error">{error.message}</Text> : null}
        </View>
      )}
    />
  );
}

export default FormSelect;
