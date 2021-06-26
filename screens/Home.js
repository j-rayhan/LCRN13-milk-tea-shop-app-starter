import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Animated,
  Image
} from 'react-native';
import { useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton';
import HeaderBar from '../components/HeaderBar';
import { COLORS, constants, dummyData, FONTS, icons, images, SIZES } from '../constants'
const { promoTabs } = constants;
const tabs = promoTabs.map(item=> ({ ...item, ref: React.createRef()}))
const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = tabs.map((_, i)=> i * SIZES.width);
  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(v => v.width)
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(v => v.x)
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: '100%',
        width: tabIndicatorWidth,
        left: 0,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        transform: [{translateX}]
      }}
    />
  )
}
const Tabs = ({ appTheme, scrollX, onPress }) => {
  const [measureLayout, setMeasureLayout] = React.useState([]);
  const containerRef = React.useRef(null);
  const tabPosition = Animated.divide(scrollX, SIZES.width);
  React.useEffect(()=>{
    let ml =[]
    tabs.forEach(promo => {
      promo.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          // console.log('PRINT IN %s=====>', 'tab measure layout', x, y, width, height);
          ml.push({x,y, width, height})
          if(ml.length === tabs.length) setMeasureLayout(ml)
        }
      )
    })
  },[containerRef.current])
  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SIZES.padding,
        backgroundColor: appTheme.tabBackgroundColor,
        borderRadius: SIZES.radius,
      }}
    >
      {/** Tab indicator */}
      {measureLayout.length > 0 && <TabIndicator {...{measureLayout, scrollX}}/>}
      {/** Tabs */}
      {
        tabs.map((v, index) => {
          const textColor = tabPosition.interpolate({
            inputRange: [index -1, index, index +1],
            outputRange: [COLORS.lightGray2, COLORS.white, COLORS.lightGray2],
            extrapolate: "clamp"
          })
          return (
            <TouchableOpacity
              key={'promo_tab_' + index}
              onPress={() => onPress(index)}
            >
              <View
                ref={v.ref}
                style={{
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40
                }}
              >
                <Animated.Text style={{ color: textColor, ...FONTS.h3 }}>
                  {v.title}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

const Home = ({ navigation }) => {
  const { appTheme } = useSelector(state => state);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const promoScrollViewRef = React.useRef();
  const onPromoTabPress = React.useCallback((promoTabIndex)=>{
    promoScrollViewRef?.current?.scrollToOffset({
      offset: promoTabIndex * SIZES.width
    })
  })
  const renderAvailableRewards = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          height: 100
        }}
        onPress={() => navigation.navigate('Rewards')}
      >
        {/** Rewards Cup */}
        <View
          style={{
            width: 100,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.pink,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        >
          <ImageBackground
            source={icons.reward_cup}
            resizeMethod="resize"
            style={{
              width: 85,
              height: 85,
              marginLeft: 3,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.transparentBlack
              }}
            >

              <Text style={{
                color: COLORS.white, ...FONTS.h4
              }}>280</Text>
            </View>
          </ImageBackground>
        </View>
        {/** Rewards Details */}
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.lightPink,
            marginLeft: -10,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >

          <Text style={{
            color: COLORS.primary, ...FONTS.h2, fontSize: 18
          }}>Available Rewards</Text>
          <View
            style={{
              marginTop: 5,
              padding: SIZES.base,
              borderRadius: SIZES.radius * 2,
              backgroundColor: COLORS.primary,
            }}
          >

            <Text style={{
              color: COLORS.white, ...FONTS.backgroundColor
            }}>150 points - $2.50 off</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderPromoDetails = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center'
        }}
      >
        {/** Header Tabs */}
        <Tabs appTheme={appTheme} scrollX={scrollX} onPress={onPromoTabPress} />
        {/** Details */}
        <Animated.FlatList
          ref={promoScrollViewRef}
          data={dummyData.promos}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } }
          ], { useNativeDriver: false })}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  width: SIZES.width,
                  paddingTop: SIZES.padding
                }}
              >
                {/** Image */}
                  <Image
                    source={images.strawberryBackground}
                    resizeMethod="resize"
                    style={{
                      width: '100%'
                    }}
                  />
                {/** name */}
                <Text style={{ color: COLORS.red, ...FONTS.h1, fontSize: 27}}>
                  {item.name}
                </Text>
                {/** Description */}
                <Text style={{ marginTop: 3, color: appTheme.textColor, ...FONTS.body4}}>
                  {item.description}
                </Text>
                {/** Calories */}
                <Text style={{ marginTop: 3, color:appTheme.textColor, ...FONTS.body4}}>
                  {item.calories}
                </Text>
                {/** Button */}
                <CustomButton 
                  label="Order Now"
                  isPrimary={true}
                  containerStyle={{
                    marginTop: 10,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.base,
                    borderRadius: SIZES.radius * 2
                  }}
                  labelStyle={{ ...FONTS.h3}}
                  onPress={() => navigation.navigate("Location")}
                />
              </View>
            )
          }}
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <HeaderBar />
      <ScrollView
        style={{
          flex: 1,
          marginTop: -25,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          backgroundColor: appTheme.backgroundColor,
        }}
        contentContainerStyle={{
          paddingBottom: 150
        }}
      >
        {/** Rewards */}
        {renderAvailableRewards()}
        {/** Promo */}
        {renderPromoDetails()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Home;