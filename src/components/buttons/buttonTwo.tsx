import React from 'react';
import { View, Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface ButtonProps {
    onPress?: () => void;
    name: string;
    loading: boolean;
}

const ButtonTwo: React.FC<ButtonProps> = ({ onPress, name, loading }) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress} style={styles.pressable}>
                {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <Text style={styles.text}>{name}</Text>
                )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 35,
    },
    pressable: {
        backgroundColor: '#0F4901',
        paddingVertical: 10,
        width: '80%', 
        maxWidth: 280,
        borderRadius: 10, 
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700',
        fontSize: 16, // Adjust the font size as needed
    },
});

export default ButtonTwo;
