import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    );
}

const styles = StyleSheet.create({})

export default AuthLayout;
