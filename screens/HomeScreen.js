/* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {getAuth} from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import MainScreen from '../components/MainScreen';
import MyButton from '../components/MyButton';
import {FlatList, StyleSheet, View} from 'react-native';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import BlogCard from '../components/BlogCard';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';

const blogsData = [
  {
    id: '11',
    title: 'Kareri Lake',
    url: '',
    description: 'lorem Ipsum',
  },
  {
    id: '12',
    title: 'Parashar Lake',
    url: '',
    description: 'lorem Ipsum',
  },
];

const db = getFirestore();

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categoriesData, setCategoriesData] = useState(null);

  useEffect(() => {
    getCategoriesData();
  }, []);

  const getCategoriesData = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'categories'));
      const formattedCategoriesData = snapshot?._docs?.map(item => {
        return {
          id: item?.id,
          ...item?._data,
        };
      });
      setCategoriesData(formattedCategoriesData);
    } catch (error) {
      console.log(error, 'failed to fetch categories data');
    }
  };

  const handleSignOut = async () => {
    try {
      await getAuth().signOut();
      navigation.navigate(StackActions.popToTop());
    } catch (error) {
      console.error(error);
    }
  };

  // const DashboardTab = () => (
  //   <ScrollView contentContainerStyle={styles.contentContainerStyle}>
  //     <Text>Dashboard Content</Text>
  //   </ScrollView>
  // );

  // const ProfileTab = () => (
  //   <ScrollView contentContainerStyle={styles.contentContainerStyle}>
  //     <Text>Profile Content</Text>
  //   </ScrollView>
  // );

  const renderCategoryCard = item => {
    return <CategoryCard item={item} length={categoriesData?.length} />;
  };

  const renderBlogCard = item => {
    return (
      <BlogCard
        item={item}
        onPress={() => {
          navigation.navigate('Categories');
        }}
      />
    );
  };

  return (
    <MainScreen
      isHomeScreen={true}
      userDetails={getAuth()?.currentUser}
      headerRight={<MyButton title="Sign Out" onPress={handleSignOut} />}
      // headerFloatingView={[
      //   {
      //     tabName: 'Dashboard',
      //     components: DashboardTab,
      //   },
      //   {
      //     tabName: 'Profile',
      //     components: ProfileTab,
      //   },
      // ]}
    >
      <View style={styles.contentContainerStyle}>
        <View style={styles.sectionContainer}>
          <SectionHeading heading="Categories" />
          <FlatList
            horizontal
            scrollEnabled
            ItemSeparatorComponent={
              <View style={{width: 12, height: '100%'}} />
            }
            data={categoriesData}
            renderItem={({item, index}) => renderCategoryCard(item)}
          />
        </View>
        <View style={styles.sectionContainer}>
          <SectionHeading heading="Blogs" />
          <FlatList
            horizontal
            scrollEnabled
            ItemSeparatorComponent={
              <View style={{width: 12, height: '100%'}} />
            }
            data={blogsData}
            renderItem={({item, index}) => renderBlogCard(item)}
          />
        </View>
        <View style={styles.sectionContainer}>
          <SectionHeading
            heading="Want to share your experience ???"
            smallHeading="Write it here..."
          />
          <MyButton
            title="Write a Blog"
            buttonType="primary"
            onPress={() => navigation.navigate('Write Blog')}
          />
        </View>
      </View>
    </MainScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 16,
  },
  sectionContainer: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 16,
  },
});
