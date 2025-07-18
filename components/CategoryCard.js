import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../utils/styles';
import { ThemeContext } from './ThemeProvider';

const window = Dimensions.get('window');

const CategoryCard = ({
  onPress = () => { },
  cardContainerStyle = {},
  item = {},
  length = 4,
}) => {
  const navigation = useNavigation();
  const { isDark } = useContext(ThemeContext);
  const getCardWidth = () => {
    if (length > 2 && length <= 4) {
      return {
        width: (window.width - 56 - 12 * (length - 1)) / length,
      };
    } else {
      return { width: (window.width - 56) / 4 - 9 };
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Category Blogs', { categoryId: item?.id })}
      key={item?.id}>
      <View style={[styles.cardContainer, cardContainerStyle, getCardWidth(), { color: isDark ? Colors.textDark : Colors.textLight }]}>
        <Image style={styles.imageStyle} source={require('../images/sample1.jpg')} />
        <Text style={[styles.label, { color: isDark ? Colors.textDark : Colors.textLight }]}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {},
  imageStyle: {
    height: 'auto',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#d1d1d1',
    width: '100%',
    aspectRatio: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
