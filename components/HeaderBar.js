import React from 'react';
import { Image, StyleSheet, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons,FONTS, SIZES } from '../constants'
export default ({ }) => {
  const toggleIcon = (name, styles) => (
    <View style={{
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      ...styles
    }}>
      <Image source={name} 
        style={{
          height: 30,
          width: 30,
          tintColor: COLORS.white
        }}
      />
    </View>)
  return (
    <SafeAreaView
      style={{
        height: 100,
        width: '100%',
        backgroundColor: COLORS.purple,
        flexDirection: 'row'
      }}
    >
      <StatusBar barStyle='light-content' backgroundColor={COLORS.purple} />
      {/** Greetings */}
      <View style={{
        flex: 1,
        paddingLeft: SIZES.padding,
      }}>
        <Text style={{
          color: COLORS.white, ...FONTS.h2
        }}>Johir</Text>
        <Text style={{
          color: COLORS.white, ...FONTS.h2
        }}>Welcome Back</Text>
      </View>
      {/** Toggle Button */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginHorizontal: SIZES.padding,
          height: 40,
          borderRadius: 20,
          backgroundColor: COLORS.lightPurple
        }}
      >
        {/** Sun */}
        {toggleIcon(icons.sunny)}
        {/** Moon */}
        {toggleIcon(icons.night, styles.activeNightMode)}
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  activeNightMode: {
    borderRadius: 20,
    backgroundColor: COLORS.black,
  },
  activeLightMode: {
    borderRadius: 20,
    backgroundColor: COLORS.yellow,
  }
})