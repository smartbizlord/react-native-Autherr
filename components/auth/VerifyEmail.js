import React, { useContext } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { APP_STYLES, DARK_APP_STYLES } from '../../assets/Styles/AppStyles';
import { Formik } from 'formik';
import { AuthContext } from '../../helpers/AuthStatus';
import * as yup from 'yup'

const isValidNumber = (num) => {
    let numero = Number(num)
    if(numero == 0 || numero > 0 || numero < 0) {
        return true;
    }else {
        return false;
    }
}

const verifySchema = yup.object({
    verifyCode1: yup.string()
    .required()
    .max(1)
    .test('check-otp-input', 'input must be a number and not more than one per input', (val) => {
        if(isValidNumber(val)) {
            return true
        }
        return false
    }),
    verifyCode2: yup.string()
    .required()
    .max(1)
    .test('check-otp-input', 'input must be a number and not more than one per input', (val) => {
        if(isValidNumber(val)) {
            return true
        }
        return false
    }),
    verifyCode3: yup.string()
    .required()
    .max(1)
    .test('check-otp-input', 'input must be a number and not more than one per input', (val) => {
        if(isValidNumber(val)) {
            return true
        }
        return false
    }),
    verifyCode4: yup.string()
    .required()
    .max(1)
    .test('check-otp-input', 'input must be a number and not more than one per input', (val) => {
        if(isValidNumber(val)) {
            return true
        }
        return false
    }),
    verifyCode5: yup.string()
    .required()
    .max(1)
    .test('check-otp-input', 'input must be a number and not more than one per input', (val) => {
        if(isValidNumber(val)) {
            return true
        }
        return false
    }),
    verifyCode6: yup.string()
    .required()
    .max(1)
    .test('check-otp-input', 'input must be a number and not more than one per input', (val) => {
        if(isValidNumber(val)) {
            return true
        }
        return false
    }),
})

const VerifyEmail = ({ navigation }) => {
    const { darkTheme, resendVerEmail, userInfo, verifyEmail, deeepLink, isError, isInfo } = useContext(AuthContext);
    const APP_STYLE = darkTheme ? DARK_APP_STYLES : APP_STYLES;
    if(deeepLink) {
        deeepLink.path == "reset-password" && navigation.replace('Resetpassword')
    }


    console.warn(userInfo)

    const resend = () => {
        resendVerEmail(navigation);
    }
    return (
        <View style={APP_STYLES.AuthContainer}>
            
                <Text style={APP_STYLE.AuthHeaderText}>Verify E-mail</Text>
                <Formik
                    initialValues={{
                        verifyCode1: "",
                        verifyCode2: "",
                        verifyCode3: "",
                        verifyCode4: "",
                        verifyCode5: "",
                        verifyCode6: "",
                    }}
                    onSubmit={(values, actions) => {
                        const {verifyCode1, verifyCode2, verifyCode3, verifyCode4, verifyCode5, verifyCode6} = values;
                        let fullCode = `${verifyCode1}${verifyCode2}${verifyCode3}${verifyCode4}${verifyCode5}${verifyCode6}`
                        verifyEmail(fullCode, navigation);
                    }}
                    validationSchema={verifySchema}
                >
                    {(formProps) =>(
                        <View>
                            <View
                                style={APP_STYLE.AuthVerifyInputContainer}
                            >
                                <View style={(formProps.touched.verifyCode1 && formProps.errors.verifyCode1) ? APP_STYLE.verifyError : APP_STYLE.verifyWithoutError}><TextInput
                                style={APP_STYLE.AuthVerifyInput}
                                placeholder='6'
                                onChangeText={formProps.handleChange('verifyCode1')}
                                onBlur={formProps.handleBlur('verifyCode1')}
                                value={formProps.values.verifyCode1}
                                /></View>
                                <View style={(formProps.touched.verifyCode2 && formProps.errors.verifyCode2) ? APP_STYLE.verifyError : APP_STYLE.verifyWithoutError}><TextInput
                                style={APP_STYLE.AuthVerifyInput}
                                placeholder='6'
                                onChangeText={formProps.handleChange('verifyCode2')}
                                onBlur={formProps.handleBlur('verifyCode2')}
                                value={formProps.values.verifyCode2}
                                keyboardType='numeric'
                                /></View>
                                <View style={(formProps.touched.verifyCode3 && formProps.errors.verifyCode3) ? APP_STYLE.verifyError : APP_STYLE.verifyWithoutError}><TextInput
                                style={APP_STYLE.AuthVerifyInput}
                                placeholder='6'
                                onChangeText={formProps.handleChange('verifyCode3')}
                                onBlur={formProps.handleBlur('verifyCode3')}
                                value={formProps.values.verifyCode3}
                                keyboardType='numeric'
                                /></View>
                                <View style={(formProps.touched.verifyCode4 && formProps.errors.verifyCode4) ? APP_STYLE.verifyError : APP_STYLE.verifyWithoutError}><TextInput
                                style={APP_STYLE.AuthVerifyInput}
                                placeholder='6'
                                onChangeText={formProps.handleChange('verifyCode4')}
                                onBlur={formProps.handleBlur('verifyCode4')}
                                value={formProps.values.verifyCode4}
                                keyboardType='numeric'
                                /></View>
                                <View style={(formProps.touched.verifyCode5 && formProps.errors.verifyCode5) ? APP_STYLE.verifyError : APP_STYLE.verifyWithoutError}><TextInput
                                style={APP_STYLE.AuthVerifyInput}
                                placeholder='6'
                                onChangeText={formProps.handleChange('verifyCode5')}
                                onBlur={formProps.handleBlur('verifyCode5')}
                                value={formProps.values.verifyCode5}
                                keyboardType='numeric'
                                /></View>
                                <View style={(formProps.touched.verifyCode6 && formProps.errors.verifyCode6) ? APP_STYLE.verifyError : APP_STYLE.verifyWithoutError}><TextInput
                                style={APP_STYLE.AuthVerifyInput}
                                placeholder='6'
                                onChangeText={formProps.handleChange('verifyCode6')}
                                onBlur={formProps.handleBlur('verifyCode6')}
                                value={formProps.values.verifyCode6}
                                keyboardType='numeric'
                                /></View>
                            </View>
                            <TouchableOpacity  onPress={formProps.handleSubmit}><Text style={APP_STYLE.AuthVerifySubmit}>Verify Email</Text></TouchableOpacity>
                        </View>
                    )}
                </Formik>

                <Text style={APP_STYLE.AuthBrief}>To complete the resgistration please type in the code that was sent to your email.</Text>
                <Text style={APP_STYLE.AuthLinkWrapper}>Didn't get an emaail? <Text style={APP_STYLE.AuthLink} onPress={resend}>Resend Code</Text></Text>

                <Text style={isError && APP_STYLE.popErrorMessage}>{isError}</Text>
                <Text style={isInfo && APP_STYLE.popMessage}>{isInfo}</Text>
            
        </View>
    )
}


export default VerifyEmail