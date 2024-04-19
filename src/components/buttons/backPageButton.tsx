import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackPageButton = () => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.goBack()}>
            <View style={styles.container}>
                <Ionicons name="chevron-back" size={24} color="black" />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default BackPageButton;
