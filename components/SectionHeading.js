import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SectionHeading = ({heading = '', headingContainerStyle = {}, headingTextStyle = {}}) => {
    return (
        <View style={[headingContainerStyle, styles.containerStyle]}>
            <Text style={[headingTextStyle, styles.textStyle]}>{heading}</Text>
        </View>
    );
};

export default SectionHeading;

const styles = StyleSheet.create({
    containerStyle: {
        marginBottom: 10,
    },
    textStyle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
    },
});
