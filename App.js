import React from 'react';
import { Location, Order, OrderDetail } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import {Provider as ReduxStoreProvider} from 'react-redux';

import Tabs from "./navigation/tabs";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './stores';

const Stack = createStackNavigator();

const AppNavigation = () => {

    React.useEffect(() => {
        SplashScreen.hide();
    }, [])

    return (
      <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator
                headerMode="none"
                initialRouteName={'Home'}
            >
                <Stack.Screen
                    name="Home"
                    component={Tabs}
                />

                <Stack.Screen
                    name="Location"
                    component={Location}
                />

                <Stack.Screen
                    name="Order"
                    component={Order}
                />

                <Stack.Screen
                    name="OrderDetail"
                    component={OrderDetail}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
    )
}
const App = () => {
  return (
    <SafeAreaProvider>
      <ReduxStoreProvider store={store}>
        <AppNavigation />
      </ReduxStoreProvider>
    </SafeAreaProvider>
  )
}
export default App;