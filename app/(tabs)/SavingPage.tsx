import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView as RNSSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
const SafeAreaView = styled(RNSSafeAreaView);
const SavingPage = () => {
    return (
        <SafeAreaView className='p-4'>
            <View>
                <Text>Saving</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default SavingPage;
