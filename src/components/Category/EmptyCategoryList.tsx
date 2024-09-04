import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {IcEmpty, IcPlus} from '../../assets/icon';
import useAnalyze from '../../hooks/useAnalyze';
import {styles} from './EmptyCategoryList.style';

export default function EmptyCategoryList() {
  const {handleGoToGallery} = useAnalyze();

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <IcEmpty />
      </View>
      <Text style={styles.emptyText}>아직 저장된 여행지가 없어요!</Text>
      <Text style={styles.emptySubText}>
        여행지 정보가 담긴 스크린샷을 선택해주세요
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={handleGoToGallery}>
        <IcPlus />
        <Text style={styles.addButtonText}> 여행지 추가</Text>
      </TouchableOpacity>
    </View>
  );
}
