import React from 'react';
import { Image, StyleSheet, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {connect} from 'react-redux'
import { COLORS, icons,FONTS, SIZES } from '../constants'
import { toggleTheme } from '../stores/themeActions';
const HeaderBar = ({ appTheme, toggleTheme }) => {
  const handleTheme = () => {
    if (appTheme.name === 'light') {
      toggleTheme('dark')
    } else {
      toggleTheme('light')
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
    const lightStyle = appTheme.name === 'dark' && styles.activeLightMode
    const nightStyle = appTheme.name === 'light' && styles.activeNightMode
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
        {toggleIcon(icons.sunny, lightStyle)}
        {/** Moon */}
        {toggleIcon(icons.night, nightStyle)}
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
});


const mapStateToProps = ({appTheme, error}) => ({appTheme, error});
const mapDispatchToProps = dispatch => {
  return {
    toggleTheme: type => dispatch(toggleTheme(type))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
