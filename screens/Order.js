import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { Svg, Circle } from "react-native-svg";
import { useSelector } from 'react-redux';
import { AppStatusBar, IconButton, TabButton, VerticalTextButton } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons } from "../constants";
const Order = ({ navigation, route }) => {
  const { appTheme } = useSelector(state => state);
  const { selectedLocation } = route.params;
  const [selectedTab, setSelectedTab] = React.useState(0)
  const [selectedCategory, setSelectedCategory] = React.useState('Milk Tea')
  const menu = React.useMemo(()=>{
    return dummyData.menuList.filter(
      item => item.category === selectedCategory
    )
  },[selectedCategory])
  const renderHeader = () => {
    return (
      <SafeAreaView
        style={{
          height: 200,
          backgroundColor: COLORS.primary,
          alignItems: 'center',
        }}
      >
        <AppStatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        {/* Nav bar */}
        <View
          style={{
            ...styles.row,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconButton
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              ...styles.container,
              ...styles.center,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h1,
                fontSize: 25,
              }}
            >Pick-up Order</Text>
          </View>
          <View style={{ width: 25 }} />
        </View>
        {/* Location */}
        <View
          style={{
            marginTop: SIZES.radius,
            backgroundColor: COLORS.white1,
            paddingHorizontal: SIZES.radius,
            paddingVertical: 5,
            borderRadius: SIZES.radius
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.body3,
            }}
          >{selectedLocation?.title}</Text>
        </View>
      </SafeAreaView>
    )
  }

  const renderTopBar = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          marginTop: SIZES.radius,
          justifyContent: 'center',
          paddingLeft: SIZES.padding * 2,
          paddingRight: SIZES.padding
        }}
      >
        {/* Tab buttons */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <TabButton
            containerStyle={{ width: 60 }}
            label="Menu"
            selected={selectedTab === 0}
            onPress={() => setSelectedTab(0)}
          />
          <TabButton
            containerStyle={{ width: 90 }}
            label="Previous"
            selected={selectedTab === 1}
            onPress={() => setSelectedTab(1)}
          />
          <TabButton
            containerStyle={{ width: 90 }}
            label="Favourite"
            selected={selectedTab === 2}
            onPress={() => setSelectedTab(2)}
          />
        </View>
        <View
          style={{
            ...styles.center,
            width: 35,
            height: 35,
            borderRadius: 10,
            backgroundColor: COLORS.primary
          }}
        >
          <Text style={{
            color: COLORS.white,
            ...FONTS.h3
          }}>0</Text>
        </View>
      </View>
    )
  }
  const renderSideBar = () => {
    return (
      <View>
        <Svg height="65" width="65" viewBox="0 0 65 65">
          <Circle
            cx="5"
            cy="60"
            r="60"
            fill={COLORS.primary}
          />
        </Svg>
        <View
          style={{
            ...styles.center,
            marginTop: -10,
            width: 65,
            backgroundColor: COLORS.primary,
            zIndex: 1,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              ...styles.center,
              marginLeft: -30
            }}
          >
            <VerticalTextButton
              label="Snack"
              containerStyle={{
                marginTop: 15,
              }}
              selected={selectedCategory === 'Snack'}
              onPress={() => setSelectedCategory('Snack')}
            />
            <VerticalTextButton
              label="Coffee"
              containerStyle={{
                marginTop: 50,
              }}
              selected={selectedCategory === 'Coffee'}
              onPress={() => setSelectedCategory('Coffee')}
            />
            <VerticalTextButton
              label="Smoothie"
              containerStyle={{
                marginTop: 70,
                width: 100
              }}
              selected={selectedCategory === 'Smoothie'}
              onPress={() => setSelectedCategory('Smoothie')}
            />
            <VerticalTextButton
              label="Special Tea"
              containerStyle={{
                marginTop: 80,
                width: 120
              }}
              selected={selectedCategory === 'Special Tea'}
              onPress={() => setSelectedCategory('Special Tea')}
            />
            <VerticalTextButton
              label="Milk Tea"
              containerStyle={{
                marginTop: 80,
                width: 80
              }}
              selected={selectedCategory === 'Milk Tea'}
              onPress={() => setSelectedCategory('Milk Tea')}
            />
            <View style={{ height: 100 }} />
          </ScrollView>
        </View>
        <Svg height="65" width="65" viewBox="0 0 65 65">
          <Circle
            cx="5"
            cy="0"
            r="60"
            fill={COLORS.primary}
          />
        </Svg>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {/* Header Section */}
      {renderHeader()}
      {/* Details */}
      <View
        style={{
          flex: 1,
          backgroundColor: appTheme.backgroundColor,
          marginTop: -40,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
        }}
      >
        {/* Top bar */}
        {renderTopBar()}
        {/* Side bar & Listing */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row'
          }}
        >
          {/* Side bar */}
          {renderSideBar()}
          {/* Listing */}
          <FlatList
            contentContainerStyle={{
              marginTop: SIZES.padding,
              paddingBottom: 50
            }}
            data={menu}
            keyExtractor={item => item.id + ''}
            renderItem={({item, index}) => {
              return (
                <TouchableWithoutFeedback
                onPress={ ()=> navigation.navigate('OrderDetail', {selectedItem: item})}
                  style={{}}
                >
                  <View
                    style={{
                      height: 150,
                      paddingHorizontal: SIZES.padding,
                      marginTop: index > 0 ? SIZES.padding : 0,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Thumbnail */}
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: SIZES.padding,
                        width: 130,
                        height: 140,
                        ...styles.center,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightYellow,
                        zIndex: 1
                      }}
                    >
                      <Image
                        source={item.thumbnail}
                        resizeMode="contain"
                        style={{
                          width: 100,
                          height: 100
                        }}
                      />
                    </View>
                    {/* Details */}
                    <View
                      style={{
                        width: '70%',
                        height: '85%',
                        paddingLeft: '25%',
                        paddingRight: SIZES.base,
                        paddingVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.primary
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.white,
                          ...FONTS.h2,
                          fontSize: 18,
                          lineHeight: 25
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.lightYellow,
                          ...FONTS.h2,
                          fontSize: 18,
                        }}
                      >
                        {item.price}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})

export default Order;
