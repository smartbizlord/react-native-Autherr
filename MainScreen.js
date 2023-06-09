import React, { useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home.screen';
import Payment from './screens/Payment.screen';
import Deposit from './screens/Deposit.screen.js';
import Profile from './screens/Profile.screen.js';
import Settings from './screens/Settings.screen';
import { AuthContext, AuthProvider } from './helpers/AuthStatus';






export default MainScreen = () => {
    const {userInfo, isLoggedIn, CorrectTime} = useContext(AuthContext);
    const Tab = createBottomTabNavigator();

    if(isLoggedIn && CorrectTime) {
        return (
            <NavigationContainer>
            <Tab.Navigator
              screenOptions={ ({ route, title }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                  let iconName;
                  let iconColor;
                  switch (route.name) {
                    case 'home':
                      iconName = focused ? 'home' : 'home';
                      iconColor = focused ? '#1aa7ec' : color;
                      break;
                    case 'payment':
                      iconName = focused ? 'send' : 'send';
                      iconColor = focused ? '#1aa7ec' : color;
                      break;
                    case 'deposit':
                      iconName = focused ? 'payment' : 'payment';
                      iconColor = focused ? '#1aa7ec' : color;
                      break;
                    case 'profile':
                      iconName = focused ? 'person-pin' : 'person-pin';
                      iconColor = focused ? '#1aa7ec' : color;
                      break;
                    case 'settings':
                      iconName = focused ? 'settings' : 'settings';
                      iconColor = focused ? '#1aa7ec' : color;
                      break;
                  
                    default:
                      break;
                  }
                  return <MaterialIcons name={iconName} size={size} color={iconColor} />
                },
                tabBarStyle: {
                      backgroundColor: '#fff',
                },
                title: title,
                headerShown: true
              })}
              // screenOptions={{
              //   tabBarStyle: {
              //     backgroundColor: 'green',
              //   }
              // }}
              //headerTitle={"mrrr"}
            >
              <Tab.Screen name='home' component={Home} />
              <Tab.Screen name='payment' component={Payment} />
              <Tab.Screen name='deposit' component={Deposit} />
              <Tab.Screen name='profile' component={Profile} />
              <Tab.Screen name='settings' component={Settings} />
            </Tab.Navigator>
          </NavigationContainer>
        )
    } else {
        return "";
    }
}


  





