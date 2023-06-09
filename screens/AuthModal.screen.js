import React, { useContext } from 'react';
import { View, Text, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SingUp';
import VerifyEmail from '../components/auth/VerifyEmail';
import { AuthContext } from '../helpers/AuthStatus';

const AuthModals = () => {
    return (
        {
            SignUp: <SignUp />,
            SignIn: <SignIn />,
            Logout: <Logout />,
            VerifyEmail: <VerifyEmail />,
            ForgotPassword: <ForgotPassword />,
            ResetPassword: <ResetPassword />
          }
    )
}

const ModalStack = createStackNavigator()

const prefix1 = Linking.createURL('/')

const prefix2 = "https://ysdapp.netlify.app"

const linking = {
    prefixes: [prefix1, prefix2],
   
}



export default  AuthModalScreen = () => {
    const {isLoggedIn, CorrectTime, userInfo} = useContext(AuthContext);
    console.warn(userInfo)
    if(CorrectTime && isLoggedIn == false) {
         return(
            <NavigationContainer linking={linking}>
                <ModalStack.Navigator
                screenOptions={{
                   headerShown: false 
                }}
                >
                    <ModalStack.Screen name='Login' component={SignIn} />
                    <ModalStack.Screen name='Signup' component={SignUp} />
                    <ModalStack.Screen name='Verifyemail' component={VerifyEmail} />
                    <ModalStack.Screen name='ForgotPassword' component={ForgotPassword} />
                    <ModalStack.Screen name='Resetpassword' component={ResetPassword} />
                </ModalStack.Navigator>
            </NavigationContainer>
            )
    }
        if(!CorrectTime) {
            return (
            <Modal visible={!CorrectTime}>

            </Modal>
            )
        }

        return "";
    
}


//  AuthModalScreen