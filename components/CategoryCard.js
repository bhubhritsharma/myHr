import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const window = Dimensions.get('window');

const CategoryCard = ({ onPress = () => { }, categoryTitle = '', cardContainerStyle = {}, imageURL = '' }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.cardContainer, cardContainerStyle]}>
                <Image style={styles.imageStyle} src={imageURL} />
                <Text style={styles.label}>{categoryTitle}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CategoryCard;

const styles = StyleSheet.create({
    cardContainer: {
        // alignItems: 'center',
        // justifyContent: 'center',
        width: ((window.width - 56) / 4) - 9,
    },
    imageStyle: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#d1d1d1',
        width: '100%',
        aspectRatio: 1,
    },
    label: {
        fontSize: 12,
        fontWeight: '400',
        color: 'black',
        textAlign: 'center',
    },
});
