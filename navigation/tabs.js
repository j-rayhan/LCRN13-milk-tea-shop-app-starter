import React from "react";
import {
    Image,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"

import { Home, Rewards } from "../screens"
import { COLORS, SIZES, icons } from "../constants"

const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({containerStyle, isFloat, children, onPress}) => {
  if (isFloat) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
      }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.primary
          }}
          onPress={onPress}
        >

          {children}
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{
          flex: 1,
          height: 60,
          backgroundColor: COLORS.gray3,
          ...containerStyle
        }}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: "transparent",
                    borderTopColor: "transparent",
                    height: (Platform.OS == 'android') ? 60 : 80
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? COLORS.primary : COLORS.black
                            }}
                        />
                    ),
                    tabBarButton: props => (
                      <CustomTabBarButton 
                        {...props}
                        containerStyle={{
                          borderTopLeftRadius: SIZES.radius * 3.5
                        }}
                      />
                    ),
                }}
            />
            <Tab.Screen
                name="Rewards"
                component={Rewards}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.bubbleTea}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? COLORS.primary : COLORS.black
                            }}
                        />
                    ),
                    tabBarButton: props => (
                      <CustomTabBarButton 
                        {...props}
                      />
                    ),
                }}
            />

            <Tab.Screen
                name="AddOrder"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.add}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: COLORS.white
                            }}
                        />
                    ),
                    tabBarButton: props => (
                      <CustomTabBarButton 
                        {...props}
                        isFloat={true}
                      />
                    ),
                }}
            />
            <Tab.Screen
                name="Favourite"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.heart}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? COLORS.primary : COLORS.black
                            }}
                        />
                    ),
                    tabBarButton: props => (
                      <CustomTabBarButton 
                        {...props}
                      />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.profile}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? COLORS.primary : COLORS.black
                            }}
                        />
                    ),
                    tabBarButton: props => (
                      <CustomTabBarButton 
                        {...props}
                        containerStyle={{
                          borderTopRightRadius: SIZES.radius * 3.5
                        }}
                      />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;