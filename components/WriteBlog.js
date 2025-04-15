import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainScreen from './MainScreen';
import {Picker} from '@react-native-picker/picker';
import MyButton from './MyButton';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
// import {getStorage, ref} from '@react-native-firebase/storage';

const db = getFirestore();

// const storage = getStorage();
// const storageRef = ref(storage);

const WriteBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  // console.log(storageRef, 'storageRef');

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'categories'));
      const formattedCategories = snapshot?._docs?.map(item => {
        return {
          id: item?.id,
          name: item?._data?.name,
        };
      });
      setCategories(formattedCategories);
    } catch (error) {
      console.log(error, 'failed to fetch categories data');
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !selectedCategoryId) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    const formData = {
      title,
      content,
      categoryId: selectedCategoryId,
    };
    await db.collection('blogs').add(formData);

    setTimeout(() => {
      setTitle('');
      setContent('');
      setSelectedCategoryId('');
    }, 1000);
    console.log('Form Submitted:', formData);

    Alert.alert('Success', 'Form submitted!');
  };

  console.log(title, content, selectedCategoryId, 'title-content_categoryId');

  return (
    <MainScreen title="Write a blog">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>What is it about ?</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="e.g. A day out in the woods."
          placeholderTextColor={'#9c9c9c'}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategoryId}
            onValueChange={value => setSelectedCategoryId(value)}
            style={styles.picker}>
            <Picker.Item
              label="Select a category"
              value=""
              style={styles.categoryPlaceholder}
            />
            {categories.map(category => (
              <Picker.Item
                label={category?.name}
                value={category?.id}
                key={category?.id}
                style={styles.categoryItem}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Content (max 10000 characters)</Text>
        <TextInput
          value={content}
          onChangeText={text => {
            if (text.length <= 10000) {
              setContent(text);
            }
          }}
          multiline
          numberOfLines={25}
          style={[styles.input, styles.textarea]}
          placeholder="Start writing here..."
          placeholderTextColor={'#9c9c9c'}
        />
        <Text style={styles.charCount}>{content.length}/10000</Text>

        <MyButton title="Submit" buttonType="primary" onPress={handleSubmit} />
      </ScrollView>
    </MainScreen>
  );
};

export default WriteBlog;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  textarea: {
    maxHeight: 620,
    minHeight: 220,
    height: 'auto',
    textAlignVertical: 'top',
  },
  charCount: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    fontSize: 12,
    color: '#666',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  categoryPlaceholder: {
    fontSize: 14,
    color: '#9c9c9c',
  },
  categoryItem: {
    fontSize: 16,
    color: '#000',
    textTransform: 'capitalize',
    // backgroundColor: 'red',
    borderBottomWidth: 1,
    borderBlockColor: '#000',
  },
});
