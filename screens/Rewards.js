import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import HeaderBar from '../components/HeaderBar';
import CustomButton from '../components/CustomButton'
import { COLORS, dummyData, FONTS, icons, SIZES } from '../constants';

const Rewards = () => {
  const navigation = useNavigation();
  const { appTheme } = useSelector(state => state);
  const renderRewardPoint = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          marginVertical: SIZES.padding,
        }}
      >
        {/** Text */}
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.h1,
            fontSize: 35,
          }}
        >
          Rewards
          </Text>
        <Text
          style={{
            width: SIZES.width * 0.6,
            marginTop: 10,
            textAlign: 'center',
            color: appTheme.textColor,
            ...FONTS.h3,
            lineHeight: 18,
          }}
        >
          You are 60 points away from your next reward
          </Text>
        {/** Image */}
        <ImageBackground
          source={icons.reward_cup}
          resizeMode="contain"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: SIZES.width * 0.8,
            height: SIZES.width * 0.8,
            marginTop: SIZES.padding,
          }}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 70,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white,
            }}
          >
            <Text style={{ ...FONTS.h1 }}>280</Text>
          </View>
        </ImageBackground>
      </View>
    )
  }
  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/** Scan */}
        <CustomButton
          isPrimary={true}
          label="Scan in store"
          containerStyle={{
            width: 130, 
            paddingVertical: 5,
            marginRight: SIZES.radius,
            borderRadius: SIZES.radius * 2,
          }}
          labelStyle={{
            ...FONTS.h3
          }}
          onPress={() => navigation.navigate('Location')}
        />
        {/** Redeem */}
        <CustomButton
          isPrimary={false}
          label="Redeem"
          containerStyle={{
            width: 130, 
            paddingVertical: 5,
            borderRadius: SIZES.radius * 2,
          }}
          labelStyle={{
            ...FONTS.h3
          }}
          onPress={() => navigation.navigate('Location')}
        />
      </View>
    )
  }
  const renderAvailableRewardsHeader = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginBottom: SIZES.radius,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text style={{color: appTheme.textColor, ...FONTS.h2}}>
          Available rewards
        </Text>
      </View>
    )
  }
  const renderRewards = ({ item }) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.base,
          paddingVertical: SIZES.base,
          borderRadius: 20,
          backgroundColor: item.eligible ? COLORS.yellow : COLORS.gray2
        }}
      >
        <Text
          style={{
            color: item.eligible ? COLORS.black : COLORS.lightGray2,
            ...FONTS.body3
          }}
        >
          {item.title}
        </Text>

      </View>
    )
  }
  return (
    <View style={styles.container}>
      {/** Header */}
      <HeaderBar />
      {/** Details */}
      <FlatList
        style={{
          marginTop: -25,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          backgroundColor: appTheme.backgroundColor
        }}
        data={dummyData.availableRewards}
        keyExtractor={item => item.id + ''}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/** Reward Point */}
            {renderRewardPoint()}
            {/** Buttons */}
            {renderButtons()}
            {/** Header Label */}
            {renderAvailableRewardsHeader()}
          </View>
        }
        renderItem={renderRewards}
        ListFooterComponent={
          <View style={{marginBottom: 120}} />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Rewards;