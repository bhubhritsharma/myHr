import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { addDot } from '../utils/methods';
import { Colors, FontSize, Weight } from '../utils/styles';
import { useNavigation } from '@react-navigation/native';
import Title from './Title';

const window = Dimensions.get('window');

const BlogCard = ({ cardContainerStyle = {}, item = {} }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Blog Details', { id: item?.id })}>
      <View style={[styles.cardContainer, cardContainerStyle]}>
        <View style={styles.cardContainerInner}>
          <Image style={styles.imageStyle} source={require('../images/sample1.jpg')} />
          <View style={[styles.blogContent]}>
            <Title title={item?.title} style={styles.label} />
            <Title title={addDot(item?.content, 40)} style={styles.description} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BlogCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: window.width - 90,
    alignItems: 'center',
  },
  cardContainerInner: {
    position: 'relative',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#d1d1d1',
    overflow: 'hidden',
  },
  imageStyle: {
    width: '100%',
    height: 'auto',
    aspectRatio: 7 / 6,
    marginBottom: 12,
    objectFit: 'cover',
  },
  blogContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#f1f1f1',
  },
  label: {
    fontSize: FontSize.s14,
    fontWeight: Weight.W600,
    color: Colors.black,
  },
  description: {
    fontSize: FontSize.s13,
    color: Colors.black,
  },
  buttonContainerStyle: {
    width: 'auto',
  },
});
