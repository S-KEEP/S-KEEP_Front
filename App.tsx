import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeIc from './src/assets/icon/home.svg';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Category from './src/screens/CategoryTab';
import Etc from './src/screens/EtcTab';
import Navigator from './src/navigators/Navigator';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Category: undefined;
  Etc: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({navigation}: HomeScreenProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />

      <Button
        title="Go to Category"
        onPress={() => navigation.navigate('Category')}
      />

      <Button title="Go to Etc" onPress={() => navigation.navigate('Etc')} />
      <HomeIc />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="Details" component={DetailsScreen} />
    //     <Stack.Screen name="Category" component={Category} />
    //     <Stack.Screen name="Etc" component={Etc} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
};

export default App;
