import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const window = Dimensions.get('window');

const CategoryCard = ({
  onPress = () => {},
  cardContainerStyle = {},
  item = {},
  length = 4,
}) => {
  const navigation = useNavigation();
  const getCardWidth = () => {
    if (length > 2 && length <= 4) {
      return {
        width: (window.width - 56 - 12 * (length - 1)) / length,
      };
    } else {
      return {width: (window.width - 56) / 4 - 9};
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Category Blogs', {categoryId: item?.id})}
      key={item?.id}>
      <View style={[styles.cardContainer, cardContainerStyle, getCardWidth()]}>
        <Image style={styles.imageStyle} src={item?.imageUrl} />
        <Text style={styles.label}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {},
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
    textTransform: 'capitalize',
  },
});
