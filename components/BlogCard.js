import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import MyButton from './MyButton';

const window = Dimensions.get('window');

const BlogCard = ({ onPress = () => { }, cardContainerStyle = {}, item = {} }) => {
    const [bottom, setBottom] = useState(0);

    const handleLayout = (event) => {
        setBottom(event.nativeEvent.layout.height);
    };

    return (
        <View style={[styles.cardContainer, cardContainerStyle]}>
            <Image style={styles.imageStyle} src={item?.url} />
            <View style={[styles.blogContent, { bottom: bottom - 4 }]} onLayout={handleLayout}>
                <Text style={styles.label}>{item?.title}</Text>
                <Text style={styles.description}>{item?.description}</Text>
            </View>
            <MyButton title={'View Blog'} buttonContainerStyle={styles.buttonContainerStyle} onPress={onPress}/>
        </View>
    );
};

export default BlogCard;

const styles = StyleSheet.create({
    cardContainer: {
        width: window.width - 90,
        position: 'relative',
        alignItems: 'center',
    },
    imageStyle: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#d1d1d1',
        width: '100%',
        aspectRatio: 7 / 6,
        marginBottom: 12,
    },
    blogContent: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1,
        padding: 8,
        backgroundColor: '#f1f1f1',
        margin: 1,
        marginTop: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    label: {
        fontSize: 12,
        fontWeight: '400',
        color: 'black',
    },
    buttonContainerStyle: {
        width: 'auto',
    },
});
