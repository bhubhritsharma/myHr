import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import MainScreen from '../components/MainScreen';
import {addDot} from '../utils/methods';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {Colors, FontSize, globalStyle, Weight} from '../utils/styles';

const db = getFirestore();

const BlogDetail = () => {
  const route = useRoute();
  const {id} = route.params || '';
  const [blogData, setBlogData] = useState(null);

  console.log(id, 'passedId');

  useFocusEffect(
    useCallback(() => {
      const getBlogData = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'blogs'));
          const formattedBlogsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (id) {
            const _blogData = formattedBlogsData.filter(item => item.id === id);
            setBlogData(_blogData[0]);
          }
        } catch (error) {
          console.log(error, 'Error fetching blogs');
        }
      };
      getBlogData();
    }, [id]),
  );

  return (
    <MainScreen title={addDot('Blogs')}>
      <View style={globalStyle.contentContainerStyle}>
        {blogData && (
          <View key={blogData?.id}>
            <Text style={styles.label}>{blogData?.title}</Text>
            <Text>{blogData?.content}</Text>
          </View>
        )}
      </View>
    </MainScreen>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({
  label: {
    fontSize: FontSize.s18,
    fontWeight: Weight.W600,
    color: Colors.black,
  },
});
