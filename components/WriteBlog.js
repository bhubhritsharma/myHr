import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MainScreen from './MainScreen';
import {Picker} from '@react-native-picker/picker';
import MyButton from './MyButton';

const WriteBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleSubmit = () => {
    if (!title || !content || !selectedCategoryId) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    const formData = {
      title,
      content,
      categoryId: selectedCategoryId,
    };
    console.log('Form Submitted:', formData);
    // Optionally save to Firestore:
    // firestore().collection('posts').add(formData);

    Alert.alert('Success', 'Form submitted!');
  };

  return (
    <MainScreen title="Write a blog">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Enter title"
        />

        <Text style={styles.label}>Content (max 1000 characters)</Text>
        <TextInput
          value={content}
          onChangeText={text => {
            if (text.length <= 1000) {
              setContent(text);
            }
          }}
          multiline
          numberOfLines={5}
          style={[styles.input, styles.textarea]}
          placeholder="Enter content"
        />
        <Text style={styles.charCount}>{content.length}/1000</Text>

        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategoryId}
            onValueChange={value => setSelectedCategoryId(value)}
            style={styles.picker}>
            <Picker.Item label="Select a category" value="" />
            {categories.map(category => (
              <Picker.Item
                label={category.title}
                value={category.id}
                key={category.id}
              />
            ))}
          </Picker>
        </View>

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
    height: 120,
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
});
