import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment, { unix } from 'moment/moment';
import * as Linking from'expo-linking';
import { AuthContext, AuthProvider } from './helpers/AuthStatus';
import AuthModalScreen from './screens/AuthModal.screen';
import MainScreen from './MainScreen';
import { Text } from 'react-native';











// const prefix1 = Linking.createURL('/')

// const prefix2 = "https://"

// const linking = {
//     prefixes: [prefix1, prefix2],
//     config: {
//         screens: {
//             VerifyEmail:  {
//                 path: 'verify-email:token'
//             }
//         }
//     }
// }


const checkers = async() => {
    try{
      let jsonVal = await AsyncStorage.getItem('userInfo');
      return jsonVal != null ? JSON.parse(jsonVal) : false;
    } catch(err) {
      //
    }
  }

  const userAccessExist = (memur) => {
    if(memur && memur !== "false") {
      if(!memur.tokens.access.expires) {
        return false;
        }
        else if (memur.tokens.access.expires <= moment().unix()){
          return false;
        }
        else {
          return true;
        }
    }
    else {
      return false;
    }
  }
  
  const determineAccess = checkers().then((data) => {
      return userAccessExist(data);
    })
    .catch((err) => {
      console.warn(err)
    }
    );



export default function App() {

  // const [deeepLink, setDeeepLink] = useState();
  // const handleDeepLink = (event) => {
  //   let data = Linking.parse(event.url)
  //   setDeeepLink(data);
  // }

  // useEffect(() => {

  //   async function getInitialURL() {
  //     const initialURL = await Linking.getInitialURL();
  //     if(initialURL) setDeeepLink(Linking.parse(initialURL));
  //   }

  //   Linking.addEventListener("url", handleDeepLink)
  //   if(!deeepLink) {
  //     getInitialURL();
  //   }

  // }, [])
  // console.warn("tada",deeepLink, "tada")

  
      return (
        <AuthProvider>
          {/* <Text>{deeepLink}</Text> */}
        <AuthModalScreen />
          <MainScreen />
        </AuthProvider> 
      );
    }
  


