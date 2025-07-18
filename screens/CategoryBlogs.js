/* eslint-disable react/no-unstable-nested-components */
import { ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import MainScreen from '../components/MainScreen';
import { Text } from '@react-navigation/elements';
import { globalStyle } from '../utils/styles';
import {
  getFirestore,
  getDocs,
  collection,
} from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import Title from '../components/Title';

const db = getFirestore();

const CategoryBlogs = () => {
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const route = useRoute();
  const { categoryId } = route.params || '';

  useEffect(() => {
    const getCategoryBlogs = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'blogs'));
        const formattedBlogsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const _categoryBlogs = formattedBlogsData.filter(
          blog => blog?.categoryId === categoryId,
        );

        setCategoryBlogs(_categoryBlogs);
      } catch (error) {
        console.log(error, 'failed to fetch categories data');
      }
    };

    getCategoryBlogs();
  }, [categoryId]);

  const AllCategoriesTab = () => (
    <ScrollView contentContainerStyle={globalStyle.contentContainerStyle}>
      <Title title={'Dashboard Content'} />
    </ScrollView>
  );

  const FavouritesTab = () => (
    <ScrollView contentContainerStyle={globalStyle.contentContainerStyle}>
      {categoryBlogs.map(blog => (
        <Title title={'Blog ID:' + blog?.title} />
      ))}
    </ScrollView>
  );

  return (
    <MainScreen
      title="Categories"
      headerFloatingView={[
        {
          tabName: 'All Categories',
          components: AllCategoriesTab,
        },
        {
          tabName: 'Favourites',
          components: FavouritesTab,
        },
      ]}
    />
  );
};

export default CategoryBlogs;
