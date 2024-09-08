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
    const focusTimeout = setTimeout(() => {
      if (currentFocus === 'name' && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (currentFocus === 'memo' && memoInputRef.current) {
        memoInputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(focusTimeout);
  }, [currentFocus]);

  useEffect(() => {
    const handleKeyboardShow = (event: any) => {
      setButtonBottomPosition(event.endCoordinates.height);
    };

    const handleKeyboardHide = () => {
      setButtonBottomPosition(0);
    };

    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      handleKeyboardShow,
    );

    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      handleKeyboardHide,
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
        onSuccess: response => {
          console.log('=====카테고리 추가 성공=====');
          const locationHeader = response.locationHeader;

          const userCategoryIdMatch =
            locationHeader.match(/userCategoryId=(\d+)/);
          const userCategoryId = userCategoryIdMatch
            ? userCategoryIdMatch[1]
            : null;

          if (userCategoryId) {
            navigation.replace('CategoryList', {
              title: nameValue,
              description: memoValue,
              id: userCategoryId,
            });
          } else {
            console.error('카테고리ID 추출 실패');
          }

          queryClient.invalidateQueries({
            queryKey: CATEGORY_KEYS.all,
          });
        },
        onError: error => {
          console.error('카테고리 추가 실패 :', error);
        },
      },
    );
  };

  const isButtonDisabled = nameValue.trim() === '';

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
            style={[
              styles.input,
              currentFocus === 'name' && {
                borderBottomColor: theme.palette.primary,
              },
            ]}
            placeholder="어떤 여행지들을 저장하고 싶나요?"
            placeholderTextColor={theme.palette.gray5}
            maxLength={12}
            onFocus={handleNameInputFocus}
            value={nameValue}
            onChangeText={setNameValue}
          />
          <Text
            style={[
              styles.charCount,
              {opacity: currentFocus === 'name' ? 1 : 0},
            ]}>
            {`${nameValue.length}/12`}
          </Text>
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
            style={[
              styles.input,
              currentFocus === 'memo' && {
                borderBottomColor: theme.palette.primary,
              },
            ]}
            placeholder="어떤 카테고리인가요?"
            placeholderTextColor={theme.palette.gray5}
            onFocus={handleMemoInputFocus}
            value={memoValue}
            maxLength={22}
            onChangeText={setMemoValue}
          />
          <View style={styles.countContainer}>
            {currentFocus === 'memo' ? <IcNotiColor /> : <IcNoti />}
            <Text
              style={[
                styles.charCount,
                {opacity: currentFocus === 'memo' ? 1 : 0},
              ]}>
              {`${memoValue.length}/22`}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={[styles.createButtonWrapper, {bottom: buttonBottomPosition}]}>
        <TouchableOpacity
          style={[
            styles.createButton,
            isButtonDisabled
              ? {backgroundColor: theme.palette.gray5}
              : {backgroundColor: theme.palette.primary},
          ]}
          onPress={handleCreateButtonPress}
          disabled={isButtonDisabled}>
          <Text style={[styles.createButtonText]}>만들기</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
