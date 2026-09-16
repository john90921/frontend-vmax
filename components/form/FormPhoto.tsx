import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { Alert, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';

import Button from '@/components/button';
import { FormPhotoProps } from '@/types/FormPhotoProps';

type PhotoValue = { uri: string; width: number; height: number };

async function pickPhoto(): Promise<PhotoValue | null> {
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

  return {
    uri: result.assets[0].uri,
    width: result.assets[0].width,
    height: result.assets[0].height,
  };
}

function FormPhoto<T extends FieldValues>({
  control,
  name,
  label,
  scrollViewRef,
}: FormPhotoProps<T>) {
  const [pendingScroll, setPendingScroll] = useState(false);
  const [viewerVisible, setViewerVisible] = useState(false);

  const scrollIntoView = () => {
    // Photo sits at the bottom of the form; scroll after the new image has laid out.
    requestAnimationFrame(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    });
  };

  const applyPhoto = (onChange: (value: PhotoValue) => void, photo: PhotoValue) => {
    onChange(photo);
    setPendingScroll(true);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const photo = value as PhotoValue | null | undefined;
        console.log(photo);
        return (
          <View
            className="auth-field"
            onLayout={() => {
              if (!pendingScroll) return;
              setPendingScroll(false);
              scrollIntoView();
            }}>
            <Text className="auth-label">{label}</Text>

            {photo?.uri ? (
              <View className="gap-3">
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setViewerVisible(true)}
                  accessibilityRole="imagebutton"
                  accessibilityLabel="View full screen photo">
                  <Image
                    source={{ uri: String(photo.uri) }}
                    className="w-full rounded-2xl border border-border"
                    resizeMode="contain"
                    style={{ height: Math.max(120, photo.height * 0.2) }}
                  />
                </TouchableOpacity>
                <View className="flex-row gap-3">
                  <Button
                    title="Change"
                    variant="outline"
                    styles="flex-1"
                    onPress={async () => {
                      const photoData = await pickPhoto();
                      if (photoData) applyPhoto(onChange, photoData);
                    }}
                  />
                  <Button
                    title="Remove"
                    variant="outline"
                    styles="flex-1"
                    onPress={() => onChange(null)}
                  />
                </View>

                <ImageViewing
                  images={[{ uri: String(photo.uri) }]}
                  imageIndex={0}
                  visible={viewerVisible}
                  onRequestClose={() => setViewerVisible(false)}
                  presentationStyle="overFullScreen"
                />
              </View>
            ) : (
      
       
              <Pressable
                className="picker-option"
                onPress={async () => {
                  const photoData = await pickPhoto();
                  if (photoData) applyPhoto(onChange, photoData);
                }}>
                <Text className="picker-option-text">Tap to upload a photo</Text>
              </Pressable>
            )}


            {error?.message ? <Text className="auth-error">{error.message}</Text> : null}
          </View>
        );
      }}
    />
  );
}

export default FormPhoto;
