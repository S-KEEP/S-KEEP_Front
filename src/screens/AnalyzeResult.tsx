import {Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flexBox, wrapper} from '../styles/styleUtils';
import {theme} from '../styles';
import {StackScreenProps} from '../navigators/types';

export default function AnalyzeResult({navigation}: StackScreenProps) {
  return (
    <SafeAreaView style={{...wrapper}}>
      <Text> X </Text>

      <Text
        style={{
          ...theme.typography.title_sb_21,
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
        <Text
          style={{
            ...theme.typography.body_m_16,
          }}>
          인천대공원
        </Text>
        <Text
          style={{
            ...theme.typography.body_m_16,
          }}>
          인천 남동구 장수동 산79
        </Text>
        <Text
          style={{
            ...theme.typography.body_m_16,
          }}>
          자연
        </Text>
      </View>

      <View
        style={{
          backgroundColor: theme.palette.primary,
          borderRadius: 12,
          paddingVertical: 20,
          paddingHorizontal: 122,
          marginTop: 40,
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

      <View style={{marginHorizontal: 'auto', marginTop: 15}}>
        <Text
          style={{...theme.typography.body_m_15, color: theme.palette.gray6}}>
          다시 분석하기
        </Text>
      </View>
    </SafeAreaView>
  );
}
