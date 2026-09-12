import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { Controller, FieldValues } from 'react-hook-form';

import Button from '@/components/button';
import { FormPhotoProps } from '@/types/FormPhotoProps';

async function pickPhoto(): Promise<string | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('Permission needed', 'Allow photo library access to attach a receipt.');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    quality: 0.8,
  });

  if (result.canceled || !result.assets[0]?.uri) {
    return null;
  }

  return result.assets[0].uri;
}

function FormPhoto<T extends FieldValues>({ control, name, label }: FormPhotoProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="auth-field">
          <Text className="auth-label">{label}</Text>

          {value ? (
            <View className="gap-3">
              <Image
                source={{ uri: String(value) }}
                className="h-40 w-full rounded-2xl border border-border"
                resizeMode="cover"
              />
              <View className="flex-row gap-3">
                <Button
                  title="Change"
                  variant="outline"
                  styles="flex-1"
                  onPress={async () => {
                    const uri = await pickPhoto();
                    if (uri) onChange(uri);
                  }}
                />
                <Button
                  title="Remove"
                  variant="outline"
                  styles="flex-1"
                  onPress={() => onChange(null)}
                />
              </View>
            </View>
          ) : (
            <TouchableOpacity
              className="picker-option py-8"
              onPress={async () => {
                const uri = await pickPhoto();
                if (uri) onChange(uri);
              }}>
              <Text className="picker-option-text">Tap to upload a photo</Text>
            </TouchableOpacity>
          )}

          {error?.message ? <Text className="auth-error">{error.message}</Text> : null}
        </View>
      )}
    />
  );
}

export default FormPhoto;
