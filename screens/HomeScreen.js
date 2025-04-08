/* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Auth from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import MainScreen from '../components/MainScreen';
import MyButton from '../components/MyButton';
// import {ScrollView} from 'react-native';
import { FlatList, StyleSheet, View } from 'react-native';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import BlogCard from '../components/BlogCard';

const categoriesData = [
  {
    id: '1',
    title: 'Category 1',
    url: '',
  },
  {
    id: '2',
    title: 'Category 2',
    url: '',
  },
  {
    id: '3',
    title: 'Category 3',
    url: '',
  },
  {
    id: '4',
    title: 'Category 4',
    url: '',
  },
  {
    id: '5',
    title: 'Category 5',
    url: '',
  },
];

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

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await Auth().signOut();
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

  const renderCategoryCard = (item) => {
    return <CategoryCard categoryTitle={item?.title} />;
  };

  const renderBlogCard = (item) => {
    return <BlogCard item={item} />;
  };

  return (
    <MainScreen
      isHomeScreen={true}
      userDetails={Auth()?.currentUser}
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
            ItemSeparatorComponent={<View style={{ width: 12, height: '100%' }} />}
            data={categoriesData}
            renderItem={({ item, index }) => renderCategoryCard(item)}
          />
        </View>
        <View style={styles.sectionContainer}>
          <SectionHeading heading="Blogs" />
          <FlatList
            horizontal
            scrollEnabled
            ItemSeparatorComponent={<View style={{ width: 12, height: '100%' }} />}
            data={blogsData}
            renderItem={({ item, index }) => renderBlogCard(item)}
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
