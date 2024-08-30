import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {flexBox, padding} from '../../../styles/common';
import {theme} from '../../../styles';
import {TourLocationDTO} from '../../../types/dtos/tourLocation';

const dummyTourLocationList = [
  {
    title: '하이커 그라운드',
    mapX: '126.9816428989',
    mapY: '37.5685818430',
    address: '서울특별시 중구 청계천로 40 한국관광공사 서울센터',
    dist: '11.97810236270856',
    contentTypeId: '14',
    imageUrl:
      'http://tong.visitkorea.or.kr/cms/resource/57/2833957_image2_1.jpg',
  },
  {
    title: '위라이드 서울전차',
    mapX: '126.9816373430',
    mapY: '37.5686123950',
    address: '서울특별시 중구 청계천로 40 한국관광공사 서울센터',
    dist: '15.210215102232612',
    contentTypeId: '14',
    imageUrl:
      'http://tong.visitkorea.or.kr/cms/resource/11/2987811_image2_1.jpg',
  },
  {
    title: '가쯔야',
    mapX: '126.9817290217',
    mapY: '37.5678958128',
    address: '서울특별시 중구 다동길 46',
    dist: '65.35942494553268',
    contentTypeId: '39',
    imageUrl:
      'http://tong.visitkorea.or.kr/cms/resource/21/2654721_image2_1.jpg',
  },
];
export default function Tourism() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>인천대공원 주변에 이런 곳은 어때요?</Text>

      <FlatList
        data={dummyTourLocationList}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.itemContainer}
      />
    </View>
  );
}

const renderItem = ({item}: {item: TourLocationDTO}) => (
  <View style={styles.item}>
    <Image style={styles.itemImage} source={{uri: item.imageUrl}} />
    <Text style={styles.itemTitle}>{item.title}</Text>
    <Text style={styles.itemDistance}>{Number(item.dist).toFixed(0)}km</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...padding,
    paddingVertical: 30,

    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
  },
  title: {
    ...theme.typography.body_sb_17,
  },
  itemContainer: {
    marginTop: 20,
    gap: 40,
  },
  item: {
    ...flexBox('column'),
    gap: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    backgroundColor: '#efefef',
    borderRadius: 10,
  },
  itemTitle: {
    ...theme.typography.text_m_11,
  },
  itemDistance: {
    ...theme.typography.text_m_11,
    color: theme.palette.gray6,
  },
});
