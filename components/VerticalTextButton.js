import React from 'react';
import { TouchableOpacity, View, Text } from "react-native";
import { COLORS, FONTS, } from "../constants";

export const VerticalTextButton = ({containerStyle, label, selected, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        transform: [{rotate: '-90deg'}],
        ...containerStyle,
      }}
      onPress={onPress}
    >
    {/** Text */}
    <Text
      style={{
        color: selected ? COLORS.white : COLORS.lightGreen2,
        ...FONTS.body2,
        fontSize: 20,
      }}
    >
      {label}
    </Text>
    {/** Line */}
    {/* <View
      style={{
        marginTop: selected ? 3 : 4,
        height: selected ? 4 : 2,
        width: '100%',
        backgroundColor: selected ? COLORS.primary : COLORS.gray
      }}
      /> */}
    </TouchableOpacity>
  )
}
