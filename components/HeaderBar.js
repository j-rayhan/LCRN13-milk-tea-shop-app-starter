import React from 'react';
import { Image, StyleSheet, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons,FONTS, SIZES, lightTheme, darkTheme } from '../constants'
import { toggleTheme } from '../stores/themeActions';
export default ({ }) => {
  const dispatch = useDispatch();
  const {appTheme} = useSelector(state => state);
  const handleTheme = () => {
    if(appTheme.name === 'dark') {
      dispatch(toggleTheme('light'))
    } else {
      dispatch(toggleTheme('dark'))
    }
  }
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
    const activeNight = appTheme.name === 'dark' && styles.activeNightMode;
    const activeLight = appTheme.name === 'light' && styles.activeLightMode;
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
        onPress={() => handleTheme()}
      >
        {/** Sun */}
        {toggleIcon(icons.sunny, activeLight)}
        {/** Moon */}
        {toggleIcon(icons.night, activeNight)}
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