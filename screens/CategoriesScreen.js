import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const CategoriesScreen = () => {
  const [blogsData, setBlogsData] = useState(null);

  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    try {
      const data = await firestore().collection('BlogData').get();
      console.log(data, 'data');
      setBlogsData(data);
    } catch (err) {
      console.log(err, 'categories screen error');
    }
  };

  //method to add data in database using form

  // function addData() {
  //   firestore().collection('BlogData').add({
  //     name: 'Bhubhrit',
  //     email: 'bhubhrit@gmail.com',
  //   });
  // }

  // addData();

  return blogsData?.docs.map(e => {
    return (
      <View>
        <Text>Name: {e._data?.name}</Text>
      </View>
    );
  });
};

export default CategoriesScreen;
