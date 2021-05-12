import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';

export const AppStatusBar = ({backgroundColor, ...props}) => {
    return (
        <View style={[styles.statusBar, backgroundColor]}>
            <StatusBar backgroundColor={backgroundColor} {...props} />
        </View>
    );
};
// TODO use it on ios 
{/* <SafeAreaView style={{flex: 0, backgroundColor: COLORS.primary}} /> */}
// source https://webomnizz.com/change-status-bar-background-color-in-react-native/
const BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: BAR_HEIGHT
    },
});
