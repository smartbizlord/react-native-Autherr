import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import React, { createContext, useEffect, useState } from "react";
import AxiosCall from "./AxiosCall";
import * as Linking from 'expo-linking';










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



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    const [userInfo, setUserInfo] = useState();
    const [darkTheme, setDarkTheme] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isInfo, setIsInfo] = useState(false)

    const popMessage = (message, type) => {

      if(type == "err") {
        setIsError(message);

        setTimeout(() => {
          setIsError("");
        }, 5000);
      } else if (type == "info") {
        setIsInfo(message);

        setTimeout(() => {
          setIsInfo("");
        }, 5000);
      }

      
    }

    const smoothReplace = (nav, navigat) => {
      setTimeout(() => {
        navigat.replace(nav)
      }, 2000);
    }

    const smoothLogIn = () => {
      setTimeout(() => {
        setIsLoggedIn(true)
      }, 3000);
    }

    // const [deeepLink, setDeeepLink] = useState();
    // const handleDeepLink = (event) => {
    //   let data = Linking.parse(event.url)
    //   setDeeepLink(data);
    // }

    const [deeepLink, setDeeepLink] = useState();
    const handleDeepLink = (event) => {
      let data = Linking.parse(event.url)
      setDeeepLink(data);
    }
  
    
    // console.warn("tada",deeepLink, "tada")

    const loggedIn = async() => {
      try{
        let jsonVal = await AsyncStorage.getItem('userInfo');

        if(jsonVal) {
          setIsLoggedIn(true)
          let result = jsonVal != null ? JSON.parse(jsonVal) : false;
          setUserInfo(result)
        }
      }
      catch(err) {}
    }
    // let parsedUserInfo = userInfo ? JSON.parse(userInfo) : ""
    let accessToken = userInfo?.tokens?.access?.token;
    let refreshToken = userInfo?.tokens?.refresh?.token;
    let userEmail = userInfo?.user?.email;
    // const userInfo = "false"

    // console.warn("This is",userInfo.user)

    const register = (email, firstName, lastName, gender, password, cPassword, navigation) => {
      if(password !== cPassword) {
        popMessage("The passwords are not the same")
      }
      else {
        AxiosCall.post('auth/register', {
          email,
          password,
          firstName,
          lastName,
          gender,
      }).then(async(data) => {
        setUserInfo(data.data)
        let newData = JSON.stringify(data.data)
        await AsyncStorage.setItem('userInfo', newData)
        await sendVerificationEmail(email, data.data?.tokens?.access?.token, navigation)
        smoothReplace('Verifyemail')
      }).catch((err) => {
        popMessage("Registration Failed!", "err")
        return;
      })
      }
      
    }

    

    const sendVerificationEmail = (email, access, navigation) => {
      // send-verification-email
      AxiosCall.post('auth/send-verification-email', {
        email
      },
        {
          headers : {
            phewwwww : "yes",
            Authorization: `Bearer ${access}`
          }
        }
      ).then((data) => {
        // navigation.replace('Verifyemail')
      }).catch((err) => {
        console.warn(err.response)
        popMessage("Send Email Failed!", "err")
      })
    } 

    const resendVerEmail = (navigation) => {
      sendVerificationEmail(userInfo.user.email, accessToken, navigation)
    }

    const verifyEmail = (token, navigation) => {
      AxiosCall.post('auth/verify-email-app', {
        
      },
        {
          headers : {
            phewwwww : "yes",
            Authorization: `Bearer ${accessToken}`
          },
          params: {
            token
          }
        }
      ).then((data) => {
        popMessage("Registration Successful!", "info")
        smoothLogIn()
      }).catch((err) => {
        popMessage("Send Email Failed!", "err")
      })
    }

    const login = (email, password) => {
        AxiosCall.post('auth/login', {
          email,
          password
        },
          
        ).then(async(data) => {
          popMessage("Login Successful!", "info")
          setUserInfo(data.data)
          let newData = JSON.stringify(data.data)
          await AsyncStorage.setItem('userInfo', newData)
          smoothLogIn()
        }).catch((err) => {
          popMessage("Login Failed!", "err")
        })
    }

    const forgotPassword = (email, navigation) => {
      AxiosCall.post('auth/forgot-password', {
        email
      },
      ).then(async(data) => {
        popMessage("Check your Email!", "info")
      }).catch((err) => {
        popMessage("Email cannot be found!", "err")
      })
    }

    const resetPassword = (password, navigation) => {
      token = deeepLink.queryParams.token
      AxiosCall.post('auth/reset-password', {
        password
      },
        {
          params: {
            token
          }
        }
      ).then((data) => {
        popMessage("Password changed successfuly!","info")
        setDeeepLink()
        smoothReplace('Login')
      }).catch((err) => {
        popMessage("There was an error, Try Again!", "err")
        setDeeepLink();
        smoothReplace('Login')
      })
    }

    const CorrectTime = () => {
        axios.get(
            'https://www.timeapi.io/api/TimeZone/zone?timeZone=Africa/Lagos'
        )
        .then((data) => {
            const deviceDate = moment(Date.now());
            const serverDate = data.data.currentLocalTime;

            if(((deviceDate.add(5, 'm') > serverDate ) && deviceDate.subtract(5, 'm') < serverDate )) {
                return true;
            }
            return false;
        })
    }

    const changeTheme = () => {
      setDarkTheme(prevTheme => !prevTheme)
    }

    const logout = () => {
      AsyncStorage.setItem('userInfo', "")
      setIsLoggedIn(false)
    }

    useEffect(() => {
      loggedIn()
      async function getInitialURL() {
        const initialURL = await Linking.getInitialURL();
        if(initialURL) {
          setDeeepLink(Linking.parse(initialURL))
        }
      }
  
      Linking.addEventListener("url", handleDeepLink)
      if(!deeepLink) {
        getInitialURL();
      }
    }, [])

    return (
      <AuthContext.Provider value={{register, login, userInfo, CorrectTime, changeTheme, darkTheme, isLoggedIn, accessToken, refreshToken, isInfo, isError, setIsError, resendVerEmail, verifyEmail, logout, forgotPassword, resetPassword, deeepLink, popMessage}}>{children}</AuthContext.Provider>
    )
  }