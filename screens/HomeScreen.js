/* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useEffect, useState } from 'react';
import { getAuth } from '@react-native-firebase/auth';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import MainScreen from '../components/MainScreen';
import MyButton from '../components/MyButton';
import { FlatList, StyleSheet, View } from 'react-native';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import BlogCard from '../components/BlogCard';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import { globalStyle } from '../utils/styles';
import ThemeSwitcher from '../components/ThemeSwitcher';
import SectionContainer from '../components/SectionContainer';

const db = getFirestore();

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categoriesData, setCategoriesData] = useState(null);
  const [blogsData, setBlogsData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getCategoriesData();
      getBlogsData();
    }, []),
  );

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const snapshot = await getDocs(collection(db, 'users'));
    const currentUid = getAuth().currentUser?.uid;
    const userData = snapshot.docs.find(doc => doc.data().uid === currentUid);
    if (userData) {
      setUserDetails(userData.data());
    }
  };

  const getCategoriesData = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'categories'));
      const formattedCategoriesData = snapshot.docs?.map(item => {
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

  const getBlogsData = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'blogs'));
      const formattedBlogsData = snapshot?.docs?.map(item => {
        return {
          id: item?.id,
          ...item?._data,
        };
      });
      setBlogsData(formattedBlogsData);
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
    return <BlogCard item={item} />;
  };

  return (
    <MainScreen
      isHomeScreen={true}
      userDetails={userDetails}
      headerRight={
        <>
          <MyButton
            title="Sign Out"
            onPress={handleSignOut}
            isSignOutBtn={true}
            buttonContainerStyle={styles.buttonContainerStyle}
          />
          <ThemeSwitcher />
        </>
      }
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
      <View style={globalStyle.contentContainerStyle}>
        <SectionContainer>
          <SectionHeading heading="Categories" />
          <FlatList
            horizontal
            scrollEnabled
            ItemSeparatorComponent={
              <View style={{ width: 12, height: '100%' }} />
            }
            data={categoriesData}
            renderItem={({ item, index }) => renderCategoryCard(item)}
          />

        </SectionContainer>
        <SectionContainer>
          <SectionHeading heading="Blogs" />
          <FlatList
            horizontal
            scrollEnabled
            ItemSeparatorComponent={
              <View style={{ width: 12, height: '100%' }} />
            }
            data={blogsData}
            renderItem={({ item, index }) => renderBlogCard(item)}
          />
        </SectionContainer>
        <SectionContainer>
          <SectionHeading
            heading="Want to share your experience ???"
            smallHeading="Write it here..."
          />
          <MyButton
            title="Write a Blog"
            buttonType="primary"
            onPress={() => navigation.navigate('Write Blog')}
          />
        </SectionContainer>
      </View>
    </MainScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttonContainerStyle: {
    marginRight: 8,
  },
});
