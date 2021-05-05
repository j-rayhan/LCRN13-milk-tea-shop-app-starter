import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';
import HeaderBar from '../components/HeaderBar';
import {COLORS, SIZES} from '../constants'

const Home = ({ navigation }) => {
  const {appTheme} = useSelector(state => state);
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
          >

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