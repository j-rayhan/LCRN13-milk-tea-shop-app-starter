import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Svg, Circle } from "react-native-svg";
import { useSelector } from 'react-redux';
import { AppStatusBar, IconButton, TabButton, VerticalTextButton } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons } from "../constants";
const OrderDetail = ({navigation, route}) => {
  const {appTheme} = useSelector(state => state);
  const {selectedItem} = route.params;
  const [selectedSize, setSelectedSize] = React.useState(20)
  const [selectedMilkIndex, setSelectedMilkIndex] = React.useState(0)
  const [selectedSweetnessLevel, setSelectedSweetnessLevel] = React.useState(50)
  const [selectedIceLevel, setSelectedIceLevel] = React.useState(50)
  const handleMilkIndex = action => {
    if (action === 'next' && selectedMilkIndex < dummyData.milkList.length - 1){
      setSelectedMilkIndex(prev => prev + 1)
    }
    if (action === 'prev' && selectedMilkIndex > 0){
      setSelectedMilkIndex(prev => prev - 1)
    }
  }
  const handleSweetnessLevel = action => {
    if (action === '+' && selectedSweetnessLevel < 100){
      setSelectedSweetnessLevel(prev => prev + 25)
    }
    if (action === '-' && selectedSweetnessLevel > 25){
      setSelectedSweetnessLevel(prev => prev - 25)
    }
  }
  const handleIceLevel = action => {
    if (action === '+' && selectedIceLevel < 100){
      setSelectedIceLevel(prev => prev + 25)
    }
    if (action === '-' && selectedIceLevel > 25){
      setSelectedIceLevel(prev => prev - 25)
    }
  }
  const renderHeader = () => {
    return (
      <View
        style={{
          width: '100%',
          height: SIZES.height * 0.4,
          ...styles.center
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 40,
            borderBottomLeftRadius: 100,
            backgroundColor: COLORS.primary,
          }}
          />
          <Image
            source={selectedItem?.thumbnail}
            resizeMode="contain"
            style={{
              width: SIZES.width * 0.7,
              height: SIZES.width * 0.6,
            }}
          />
          {/* Back button */}
          <IconButton
            containerStyle={{
              position: 'absolute',
              top: 45,
              left: 20,
              padding: 10,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.black
            }}
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />
      </View>
    )
  }

  const renderDetails = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 30,
          marginTop: SIZES.padding,
          justifyContent: 'space-between'
        }}
      >
        {/* Name and Description */}
        <View>
          <Text
            style={{
              color: appTheme.headerColor,
              ...FONTS.h1,
              fontSize: 25
            }}
          >
            {selectedItem?.name}
          </Text>
          <Text
            style={{
              color: appTheme.textColor,
              marginTop: SIZES.base,
              ...FONTS.body3
            }}
          >
            {selectedItem?.description}
          </Text>
        </View>
        {/* Size */}
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: SIZES.base
          }}
        >
          {/* Label */}
          <Text
            style={{
              flex: 1,
              color: appTheme.headerColor,
              ...FONTS.h2,
              fontSize: 20
            }}
          >
            Pick a size
          </Text>
          {/* Cup */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
              onPress={() => setSelectedSize(20)}
            >
              <ImageBackground
                source={icons.coffee_cup}
                style={{
                  width: 80,
                  height: 80,
                  ...styles.center
                }}
                imageStyle={{tintColor: selectedSize === 20 ? COLORS.primary : COLORS.gray2}}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.body3
                  }}
                >
                  20oz
                </Text>
              </ImageBackground>
                <Text
                  style={{
                    marginTop: 3,
                    color: appTheme.textColor,
                    ...FONTS.body3
                  }}
                >
                  $4.50
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
              onPress={() => setSelectedSize(32)}
            >
              <ImageBackground
                source={icons.coffee_cup}
                style={{
                  width: 100,
                  height: 100,
                  ...styles.center
                }}
                imageStyle={{tintColor: selectedSize === 32 ? COLORS.primary : COLORS.gray2}}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.body3
                  }}
                >
                  32oz
                </Text>
              </ImageBackground>
                <Text
                  style={{
                    marginTop: 3,
                    color: appTheme.textColor,
                    ...FONTS.body3
                  }}
                >
                  $5.00
                </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Milk, Sweetness and Ice */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding
          }}
        >
          {/* Milk */}
          <View
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                color: appTheme.headerColor,
                ...FONTS.h2,
                fontSize: 20
              }}
            >Milk</Text>
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                height: 100,
                marginTop: SIZES.base,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary
              }}
            >
              <IconButton
                icon={icons.leftArrow}
                containerStyle={{
                  marginLeft: -15,
                  width: 25,
                  height: 25,
                  borderRadius: 3,
                  backgroundColor: COLORS.white
                }}
                iconStyle={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.black
                }}
                onPress={() => handleMilkIndex('prev')}
              />
              <Image
                source={dummyData.milkList[selectedMilkIndex].image}
                resizeMode="contain"
                style={{
                  flex: 1,
                  width: 70,
                  height: 70,
                  tintColor: COLORS.white
                }}
              />
              <IconButton
                icon={icons.rightArrow}
                containerStyle={{
                  marginRight: -15,
                  width: 25,
                  height: 25,
                  borderRadius: 3,
                  backgroundColor: COLORS.white
                }}
                iconStyle={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.black
                }}
                onPress={() => handleMilkIndex('next')}
              />
            </View>
            <Text
              style={{
                marginTop: SIZES.base,
                color: appTheme.textColor,
                ...FONTS.body3
              }}
            >{dummyData.milkList[selectedMilkIndex].name}</Text>
          </View>
          {/* Sweetness & Ice */}
          <View style={styles.container}>
              {/* Sweetness */}
              <View
                style={{
                  flex: 1, 
                  justifyContent: 'center',
                  paddingHorizontal: SIZES.padding
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: appTheme.headerColor,
                    ...FONTS.h2,
                    fontSize: 20
                  }}
                >
                  Sweetness
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 50,
                    borderRadius: 15,
                    backgroundColor: COLORS.primary
                  }}
                >
                <IconButton
                  icon={icons.leftArrow}
                  containerStyle={{
                    marginLeft: -8,
                    width: 25,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: COLORS.white
                  }}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black
                  }}
                  onPress={() => handleSweetnessLevel('-')}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h3
                  }}
                >
                  {selectedSweetnessLevel} %
                </Text>
                <IconButton
                  icon={icons.rightArrow}
                  containerStyle={{
                    marginRight: -8,
                    width: 25,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: COLORS.white
                  }}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black
                  }}
                  onPress={() => handleSweetnessLevel('+')}
                />
                </View>
              </View>
              {/* Ice */}
              <View
                style={{
                  flex: 1, 
                  justifyContent: 'center',
                  paddingHorizontal: SIZES.padding
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: appTheme.headerColor,
                    ...FONTS.h2,
                    fontSize: 20
                  }}
                >
                  Ice
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 50,
                    borderRadius: 15,
                    backgroundColor: COLORS.primary
                  }}
                >
                <IconButton
                  icon={icons.leftArrow}
                  containerStyle={{
                    marginLeft: -8,
                    width: 25,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: COLORS.white
                  }}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black
                  }}
                  onPress={() => handleIceLevel('-')}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h3
                  }}
                >
                  {selectedIceLevel} %
                </Text>
                <IconButton
                  icon={icons.rightArrow}
                  containerStyle={{
                    marginRight: -8,
                    width: 25,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: COLORS.white
                  }}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black
                  }}
                  onPress={() => handleIceLevel('+')}
                />
                </View>
              </View>
          </View>
        </View>
      </View>
    )
  }
    return (
        <View style={[styles.container, {backgroundColor: appTheme.backgroundColor}]}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 150
            }}
          >
            {/* Header */}
            {renderHeader()}
            {/* Details */}
            {renderDetails()}
          </ScrollView>
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
    }
})

export default OrderDetail;