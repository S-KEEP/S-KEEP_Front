import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import styles from './CategoryPlus.style';
import {theme} from '../../styles';
import {IcNoti, IcNotiColor} from '../../assets/icon';
import {usePostAddCategory} from '../../hooks/mutations/category/usePostCategoryAdd';

export default function CategoryPlus() {
  const nameInputRef = useRef<TextInput>(null);
  const memoInputRef = useRef<TextInput>(null);

  const [nameValue, setNameValue] = useState(''); // State for name input value
  const [memoValue, setMemoValue] = useState(''); // State for memo input value

  const {addCategoryMutation} = usePostAddCategory();

  const [currentFocus, setCurrentFocus] = useState<'name' | 'memo'>('name');
  const [buttonBottomPosition, setButtonBottomPosition] = useState(0);

  useEffect(() => {
    if (currentFocus === 'name' && nameInputRef.current) {
      nameInputRef.current.focus();
    } else if (currentFocus === 'memo' && memoInputRef.current) {
      memoInputRef.current.focus();
    }
  }, [currentFocus]);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      event => {
        setButtonBottomPosition(event.endCoordinates.height);
      },
    );

    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setButtonBottomPosition(0);
      },
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);
  const handleNameInputFocus = () => {
    setCurrentFocus('name');
  };

  const handleMemoInputFocus = () => {
    setCurrentFocus('memo');
  };

  const handleCreateButtonPress = () => {
    console.log('내가 바디에 담은 값들', {
      name: nameValue,
      description: memoValue || ' ',
    });

    addCategoryMutation.mutate(
      {
        name: nameValue,
        description: memoValue || ' ',
      },
      {
        onSuccess: () => {
          console.log('Category added successfully!');
          // navigation.navigate('SomeScreen');
        },
        onError: error => {
          console.error('Error adding category:', error);
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>원하는 카테고리를 만들어주세요</Text>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="always">
        <View style={styles.inputWrapper}>
          <Text
            style={[
              styles.label,
              currentFocus === 'name' && {color: theme.palette.primary},
            ]}>
            이름
          </Text>
          <TextInput
            ref={nameInputRef}
            style={styles.input}
            placeholder="어떤 여행지들을 저장하고 싶나요?"
            placeholderTextColor={theme.palette.gray5}
            maxLength={12}
            onFocus={handleNameInputFocus}
            value={nameValue}
            onChangeText={setNameValue}
          />
          <Text style={styles.charCount}>0/12</Text>
        </View>

        <View style={styles.inputWrapper}>
          <Text
            style={[
              styles.label,
              currentFocus === 'memo' && {color: theme.palette.primary},
            ]}>
            메모 (선택)
          </Text>
          <TextInput
            ref={memoInputRef}
            style={styles.input}
            placeholder="어떤 카테고리인가요?"
            placeholderTextColor={theme.palette.gray5}
            onFocus={handleMemoInputFocus}
            value={memoValue}
            onChangeText={setMemoValue}
          />
          {currentFocus === 'memo' ? <IcNotiColor /> : <IcNoti />}
        </View>
      </ScrollView>

      <View
        style={[styles.createButtonWrapper, {bottom: buttonBottomPosition}]}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateButtonPress}>
          <Text style={styles.createButtonText}>만들기</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
