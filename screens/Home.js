import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native';
import { connect } from "react-redux";
import HeaderBar from '../components/HeaderBar';
import {COLORS, SIZES} from '../constants'

const Home = ({ appTheme }) => {
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



const mapStateToProps = ({appTheme, error}) => ({appTheme, error});
const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);