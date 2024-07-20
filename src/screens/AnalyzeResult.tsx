import {Animated, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flexBox, wrapper} from '../styles/styleUtils';
import {theme} from '../styles';
import {StackScreenProps} from '../navigators/types';
import {
  IcCancel,
  IcFolder,
  IcMarker,
  IcPaginationLeft,
  IcPaginationRight,
  IcRotate,
  IcTarget,
} from '../assets/icon';
import {useRef} from 'react';

export default function AnalyzeResult({navigation}: StackScreenProps) {
  return (
    <SafeAreaView style={{...wrapper}}>
      <IcCancel onPress={() => navigation.pop()} />

      <Text
        style={{
          ...theme.typography.title_sb_21,
          marginTop: 30,
        }}>
        분석이 완료되었어요!
      </Text>
      <Text
        style={{
          ...theme.typography.title_m_16,
          color: theme.palette.gray5,
          marginTop: 10,
          width: '80%',
        }}>
        이제 스킵에서 인천대공원과 관련된 더 많은 정보를 받아볼 수 있어요
      </Text>

      <View style={{position: 'relative'}}>
        <MyPager />

        <IcPaginationLeft style={{position: 'absolute', left: 10, top: 150}} />
        <IcPaginationRight
          style={{position: 'absolute', right: 10, top: 150}}
        />
      </View>

      <View
        style={{
          backgroundColor: theme.palette.primary,
          borderRadius: 12,
          paddingVertical: 20,
          paddingHorizontal: 122,
          marginTop: 20,
        }}>
        <Text
          onPress={() => navigation.navigate('Detail')}
          style={{
            ...theme.typography.button_sb_15,
            color: theme.palette.white,
          }}>
          확인하러 가기
        </Text>
      </View>

      <View
        style={{...flexBox(), gap: 7, marginHorizontal: 'auto', marginTop: 15}}>
        <Text
          style={{...theme.typography.body_m_15, color: theme.palette.gray6}}>
          다시 분석하기
        </Text>
        <IcRotate />
      </View>
    </SafeAreaView>
  );
}

const MyPager = () => {
  return (
    <View>
      <View key="1">
        <Text>First page</Text>
        <Info />
      </View>
      <View key="2">
        <Text>Second page</Text>
        <Info />
      </View>
      <View key="3">
        <Text>Third page</Text>
        <Info />
      </View>
      <View key="4">
        <Text>Fourth page</Text>
        <Info />
      </View>
    </View>
  );
};

const Info = () => {
  return (
    <View>
      <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#D9D9D9',
          borderRadius: 20,
          marginHorizontal: 'auto',
          marginVertical: 40,
        }}
      />

      <View
        style={{
          width: '100%',
          ...flexBox('column', 'center', 'flex-start'),
          gap: 30,
          padding: 30,
          borderColor: '#EDEDED',
          borderWidth: 2,
          borderRadius: 10,
        }}>
        <View style={{...flexBox(), gap: 7}}>
          <IcMarker />
          <Text
            style={{
              ...theme.typography.body_m_16,
            }}>
            인천대공원
          </Text>
        </View>

        <View style={{...flexBox(), gap: 7}}>
          <IcTarget />
          <Text
            style={{
              ...theme.typography.body_m_16,
            }}>
            인천 남동구 장수동 산79
          </Text>
        </View>

        <View style={{...flexBox(), gap: 7}}>
          <IcFolder />
          <Text
            style={{
              ...theme.typography.body_m_16,
            }}>
            자연
          </Text>
        </View>
      </View>
    </View>
  );
};
