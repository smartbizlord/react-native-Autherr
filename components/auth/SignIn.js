import React, { useContext } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { AuthContext } from '../../helpers/AuthStatus';
import { APP_STYLES, DARK_APP_STYLES, COLORS, DARK_COLORS } from '../../assets/Styles/AppStyles';


const SignIn = ({ navigation }) => {
    const { darkTheme, changeTheme, login, userInfo, deeepLink, isError, isInfo, } = useContext(AuthContext)
    const { primary, secondary, tertiary, country1, country2 } = darkTheme ? DARK_COLORS() : COLORS();
    const APP_STYLE = darkTheme ? DARK_APP_STYLES : APP_STYLES;
    if(deeepLink) {
        deeepLink.path == "reset-password" && navigation.replace('Resetpassword')
    }
    const movement = () => {
        navigation.replace("Signup")
    }
    const resetMovement = () => {
        navigation.replace("ForgotPassword")
    }

    // console.warn("tada",deeepLink, "tada")
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={APP_STYLE.AuthContainer}>
                <Text style={APP_STYLE.AuthHeaderText}>Login</Text>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    onSubmit={(values, actions) => {
                        const {email, password} = values;
                        actions.resetForm()
                        login(email, password)
                    }}
                >
                    {(formProps) => (
                        <View style={APP_STYLE.AuthFormContainer}>
                            <Text>E-mail:</Text>
                            <TextInput
                            placeholder='johnsmith@gmail.com'
                            onChangeText={formProps.handleChange('email')}
                            value={formProps.values.email}
                            style={APP_STYLE.AuthInput}
                            />

                            <Text>Password:</Text>
                            <TextInput
                            placeholder='* * * * * * * *'
                            onChangeText={formProps.handleChange('password')}
                            value={formProps.values.password}
                            secureTextEntry
                            style={APP_STYLE.AuthInput}
                            />
                            <TouchableOpacity onPress={formProps.handleSubmit}><Text style={APP_STYLE.AuthSubmit}>Login</Text></TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <Text style={APP_STYLE.AuthLinkWrapper}>Don't remember your password? <Text style={APP_STYLE.AuthLink} onPress={resetMovement}>Reset Password</Text></Text>
                <Text style={APP_STYLE.AuthLinkWrapper}>Don't have an account yet? <Text style={APP_STYLE.AuthLink} onPress={movement}>Signup</Text></Text>

                <Text style={isError && APP_STYLE.popErrorMessage}>{isError}</Text>
                <Text style={isInfo && APP_STYLE.popMessage}>{isInfo}</Text>
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    input: {
        
    }
})

/*

deepLink.hostname;
deepLink.path;
deepLink.queryParams

*/


export default SignIn