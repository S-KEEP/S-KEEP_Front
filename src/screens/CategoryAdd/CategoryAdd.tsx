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
import styles from './CategoryAdd.style';
import {theme} from '../../styles';
import {IcNoti, IcNotiColor} from '../../assets/icon';
import {usePostAddCategory} from '../../hooks/mutations/category/usePostCategoryAdd';
import {StackScreenProps} from '../../navigators/types';
import {useQueryClient} from '@tanstack/react-query';
import {CATEGORY_KEYS} from '../../hooks/queries/QueryKeys';

type CategoryAddProps = StackScreenProps<'CategoryAdd'>;
export default function CategoryAdd({navigation}: CategoryAddProps) {
  const nameInputRef = useRef<TextInput>(null);
  const memoInputRef = useRef<TextInput>(null);

  const [currentFocus, setCurrentFocus] = useState<'name' | 'memo'>('name');
  const [buttonBottomPosition, setButtonBottomPosition] = useState(0);

  const [nameValue, setNameValue] = useState('');
  const [memoValue, setMemoValue] = useState('');

  const {addCategoryMutation} = usePostAddCategory();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentFocus === 'name' && nameInputRef.current) {
      nameInputRef.current.focus();
    } else if (currentFocus === 'memo' && memoInputRef.current) {
      memoInputRef.current.focus();
    }
  }, [currentFocus]);

  /**
   * 진입 시 키보드 항상 활성화 & 키보드 위치 위에 버튼 생성
   */
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
    addCategoryMutation.mutate(
      {
        name: nameValue,
        description: memoValue || ' ',
      },
      {
        onSuccess: () => {
          console.log('Category added successfully!');
          navigation.replace('CategoryList', {
            title: nameValue,
            description: memoValue,
          });
          queryClient.invalidateQueries({
            queryKey: CATEGORY_KEYS.all,
          });
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
