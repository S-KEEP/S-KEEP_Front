// FriendList.tsx
import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { UserFriend } from '../../types/dtos/category';
import styles from '../../screens/TabNavigator/SettingTab/SettingTab.style';
import { IcProfileFriend, IcProfilePlus } from '../../assets/icon';

interface FriendListProps {
  friends: UserFriend[];
  getFriendToken: () => void;
  navigation: any; 
}

const FriendList: React.FC<FriendListProps> = ({
  friends,
  getFriendToken,
  navigation,
}) => {
  const renderFriendItem = ({item}: {item: UserFriend}) => (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() => navigation.navigate('Friend', {id: item.id})}>
      <IcProfileFriend />
      <Text style={styles.friendName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (friends.length === 0) {
    return (
      <View style={styles.centeredButton}>
        <TouchableOpacity style={styles.addButton} onPress={getFriendToken}>
          <Text style={styles.addButtonText}>카카오톡으로 친구 추가</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      horizontal
      data={friends}
      keyExtractor={item => item.id.toString()}
      renderItem={renderFriendItem}
      ListHeaderComponent={
        <TouchableOpacity style={styles.friendItem} onPress={getFriendToken}>
          <IcProfilePlus />
        </TouchableOpacity>
      }
    />
  );
};

export default FriendList;
