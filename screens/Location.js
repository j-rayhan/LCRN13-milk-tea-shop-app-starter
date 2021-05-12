import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Image,
    FlatList
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppStatusBar, IconButton } from "../components";
import TabButton from '../components/TabButton';
import { dummyData, COLORS, SIZES, FONTS, icons } from "../constants";
const Location = ({ navigation }) => {
  const { appTheme } = useSelector(state => state);
  const [selected, setSelectedTab] = React.useState(0)
  const renderHeader = () => {
    return (
      <SafeAreaView
        style={{
          height: 80,
          backgroundColor: COLORS.primary
        }}
      >
        <AppStatusBar backgroundColor={COLORS.primary} />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            alignItems: 'center'
          }}
        >
          {/** Icon */}
          <IconButton
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />
          {/** Title */}
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h1,
                fontSize: 25,
              }}
            >
              Locations
            </Text>
          </View>
          {/** empty */}
          <View style={{width: 25}}/>
        </View>
      </SafeAreaView>
    )
  }

  const renderTabs = () => {
    return (
      <View
        style={{ flexDirection: 'row'}}
      >
        {/** Nearby */}
          <TabButton
            containerStyle={{ width: 80}}
            label="Nearby"
            selected={selected === 0}
            onPress={() => setSelectedTab(0)}
          />
        {/** Previous */}
          <TabButton
            containerStyle={{ width: 100}}
            label="Previous"
            selected={selected === 1}
            onPress={() => setSelectedTab(1)}
          />
        {/** Favourite */}
          <TabButton
            containerStyle={{ width: 100}}
            label="Favourite"
            selected={selected === 2}
            onPress={() => setSelectedTab(2)}
          />
        </View>
    )
  }

  const renderSearchBox = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.radius,
          height: 50,
          paddingHorizontal: SIZES.padding,
          borderRadius: 25,
          backgroundColor: COLORS.lightGreen2,
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 50,
            color: COLORS.black,
            ...FONTS.body3,
          }}
          placeholder="enter your city"
          placeholderTextColor={COLORS.lightGray2}
        />
        <Image
          source={icons.search}
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.lightGray2
          }}
        />
      </View>
    )
  }
  const renderLocations = () => {
    return (
      <FlatList
        style={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.radius,
        }}
        data={dummyData.locations}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyExtractor={item => item.id + ''}
        renderItem={({item})=> {
          return (
            <TouchableOpacity
              style={{
                marginBottom: SIZES.radius,
                borderRadius: SIZES.radius * 2,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.radius,
                backgroundColor: appTheme.cardBackgroundColor,
              }}
              onPress={() => navigation.navigate('Order', 
              {selectedLocation: item})}
            >
              {/* Name & Bookmark */}
              <View
                style={{
                  flexDirection: 'row'
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: appTheme.textColor,
                    ...FONTS.h2
                  }}
                >
                  {item.title}
                </Text>
                <Image
                  source={item.bookmarked ? icons.bookmarkFilled: icons.bookmark}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: item.bookmarked ? COLORS.red : COLORS.white
                  }}
                />
              </View>
              {/* Address */}
              <View
                style={{
                  marginTop: SIZES.base,
                  width: '80%'
                }}
              >
                <Text
                  style={{
                    color: appTheme.textColor,
                    ...FONTS.body3,
                    lineHeight: 21
                  }}
                >
                  {item.address}
                </Text>
              </View>
              {/* Operation Hours  */}
              <View
                style={{
                  marginTop: SIZES.base,
                }}
              >
                <Text
                  style={{
                    color: appTheme.textColor,
                    ...FONTS.body5,
                    lineHeight: 16
                  }}
                >
                  {item.operation_hours}
                </Text>
              </View>
              {/* Buttons */}
              <View
                style={{
                  marginTop: SIZES.base,
                  flexDirection: 'row',
                }}
              >
                {/* Pick Up */}
                <View
                  style={{
                    borderColor: appTheme.textColor,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 5
                  }}
                >
                  <Text
                    style={{
                      color: appTheme.textColor,
                      ...FONTS.body3,
                    }}
                  >
                    Pick-Up
                  </Text>
                </View>
                {/* Deliver */}
                <View
                  style={{
                    borderColor: appTheme.textColor,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 5,
                    marginLeft: 5,
                  }}
                >
                  <Text
                    style={{
                      color: appTheme.textColor,
                      ...FONTS.body3,
                    }}
                  >
                    Deliver
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    )
  }
    return (
        <View style={styles.container}>
          {/** Header */}
          {renderHeader()}
          {/** Details */}
          <View
            style={{
              flex: 1,
              backgroundColor: appTheme.backgroundColor,
              marginTop: -20,
              borderTopLeftRadius: SIZES.radius * 2,
              borderTopRightRadius: SIZES.radius * 2,
              padding: SIZES.padding
            }}
          >
            {/** Tab bar section */}
            {renderTabs()}
            {/** Search box */}
            {renderSearchBox()}
            {/** Locations */}
            {renderLocations()}
          </View>

          {/**  */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Location;