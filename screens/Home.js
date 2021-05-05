import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import {COLORS, SIZES} from '../constants'

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
          <HeaderBar />
          <ScrollView
            style={{
              flex: 1,
              marginTop: -25,
              borderTopLeftRadius: SIZES.radius * 2,
              borderTopRightRadius: SIZES.radius * 2,
              backgroundColor: COLORS.secondary,
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