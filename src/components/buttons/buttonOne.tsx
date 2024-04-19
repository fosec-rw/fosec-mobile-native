import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

interface ButtonProps {
    onPress: () => void;
    name: string;
}

const ButtonOne: React.FC<ButtonProps> = ({ onPress, name }) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress} style={styles.pressable}>
                <Text style={styles.text}>{name}</Text>
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
        backgroundColor: 'blue', // Adjust the background color as needed
        paddingVertical: 20,
        width: '100%',
        borderRadius: 15,
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700',
        fontSize: 16, // Adjust the font size as needed
    },
});

export default ButtonOne;
