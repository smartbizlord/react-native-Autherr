import React, { useContext, useState } from 'react';
import { View, Text, Modal, ActionSheetIOS, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native';
import { APP_STYLES, DARK_APP_STYLES } from '../../assets/Styles/AppStyles';
import { Formik } from 'formik';
import { AuthContext } from '../../helpers/AuthStatus';
import * as yup from 'yup'
import { Picker } from '@react-native-picker/picker';

function testSpecial(string) {
    regSpecial = /[^0-9a-zA-Z]/;
    return regSpecial.test(string);
}

function testAlphaUpper(string) {
    regAlphaUpper = /[A-Z]/g;
    return regAlphaUpper.test(string);
}

function testAlphaLower(string) {
    regAlphaLower = /[a-z]/g;
    return regAlphaLower.test(string);
}

function testNum(num) {
    regNum = /[0-9]/g;
    return regNum.test(num);
}



const registerSchema = yup.object({
    firstName: yup.string()
        .required()
        .min(4),
    surname: yup.string()
        .required()
        .min(4),
    gender: yup.string()
        .required()
        .test('is-gender-male-or-female', 'There are only two genders', (val) => {
            if(val == "male" || val == "Male" || val == "female" || val == "Female") {
                return true;
            }
            return false;
        }),
    email: yup.string()
        .required()
        .email(),
    password: yup.string()
        .required()
        .min(8)
        .test('check-password', 'Password should have minimum of a letter and a number', (string) => {
            if(testAlphaLower(string) && testAlphaUpper(string) && testNum(string) && testSpecial(string)) {
                return true
            }
            return false
        }),
    confirmPassword: yup.string()
        .required()
        .min(8)
        .test('check-password', 'Password should have minimum of a letter and a number', (string) => {
            if(testAlphaLower(string) && testAlphaUpper(string) && testNum(string) && testSpecial(string)) {
                return true
            }
            return false
        })
})

const SignUp = ({ navigation }) => {
    const { darkTheme, register, isError, isInfo, setIsError, deeepLink } = useContext(AuthContext)
    const APP_STYLE = darkTheme ? DARK_APP_STYLES : APP_STYLES
    if(deeepLink) {
        deeepLink.path == "reset-password" && navigation.replace('Resetpassword')
    }

    const [gender, setGender] = useState("Male");
    const movement = () => {
        navigation.replace("Login")
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
        <View style={APP_STYLES.AuthContainer}>
            
                <Text style={APP_STYLE.AuthHeaderText}>Register</Text>
                <Formik
                    validationSchema={registerSchema}
                    initialValues={{
                        firstName: "",
                        surname: "",
                        gender: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    // validationSchema={registerSchema}
                    onSubmit={(values, actions) => {
                        values.gender = gender
                        setIsError("")
                        const {firstName, surname, email, password, confirmPassword } = values
                        actions.resetForm()
                        register(email, firstName, surname, gender, password, confirmPassword, navigation)
                    }}
                >
                    {(formProps) =>(
                        <View style={APP_STYLE.AuthFormContainer}>
                            <Text>First Name:</Text>
                            <TextInput
                            placeholder='John'
                            onChangeText={formProps.handleChange('firstName')}
                            value={formProps.values.firstName}
                            onBlur={formProps.handleBlur('firstName')}
                            style={APP_STYLE.AuthInput}
                            />
                            <Text style={APP_STYLE.AuthErrorText}>{formProps.touched.firstName && formProps.errors.firstName}</Text>

                            <Text>Last Name:</Text>
                            <TextInput
                            placeholder='Smith'
                            onChangeText={formProps.handleChange('surname')}
                            value={formProps.values.surname}
                            onBlur={formProps.handleBlur('surname')}
                            style={APP_STYLE.AuthInput}
                            />
                            <Text style={APP_STYLE.AuthErrorText}>{formProps.touched.surname && formProps.errors.surname}</Text>

                            <Text>Gender:</Text>
                            <View style={APP_STYLE.AuthPickerInput}>
                                <Picker
                                    onValueChange={(itemValue, itemIndex) =>
                                        setGender(itemValue)
                                      }
                                    selectedValue={formProps.values.gender}
                                    onBlur={formProps.handleBlur('gender')}
                                >
                                    <Picker.Item label='Male' value='Male' />
                                    <Picker.Item label='Female' value='Female' />
                                </Picker>
                            </View>
                            <Text style={APP_STYLE.AuthErrorText}>{formProps.touched.gender && formProps.errors.gender}</Text>
                            
                            <Text>E-mail:</Text>
                            <TextInput
                            placeholder='johnsmith@gmail.com'
                            onChangeText={formProps.handleChange('email')}
                            value={formProps.values.email}
                            onBlur={formProps.handleBlur('email')}
                            style={APP_STYLE.AuthInput}
                            />
                            <Text style={APP_STYLE.AuthErrorText}>{formProps.touched.email && formProps.errors.email}</Text>
                            
                            <Text>Password:</Text>
                            <TextInput
                            placeholder='* * * * * * * *'
                            onChangeText={formProps.handleChange('password')}
                            value={formProps.values.password}
                            secureTextEntry
                            onBlur={formProps.handleBlur('password')}
                            style={APP_STYLE.AuthInput}
                            />
                            <Text style={APP_STYLE.AuthErrorText}>{formProps.touched.password && formProps.errors.password}</Text>
                            
                            <Text>Confirm Password:</Text>
                            <TextInput
                            placeholder='* * * * * * * *'
                            onChangeText={formProps.handleChange('confirmPassword')}
                            value={formProps.values.confirmPassword}
                            secureTextEntry
                            onBlur={formProps.handleBlur('confirmPassword')}
                            style={APP_STYLE.AuthInput}
                            />
                            <Text style={APP_STYLE.AuthErrorText}>{formProps.touched.confirmPassword && formProps.errors.confirmPassword}</Text>
                            <TouchableOpacity onPress={formProps.handleSubmit}><Text style={APP_STYLE.AuthSubmit}>Register</Text></TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <Text style={APP_STYLE.AuthLinkWrapper}>Already have an account? <Text style={APP_STYLE.AuthLink} onPress={movement}>Login</Text></Text>
                <Text style={isError && APP_STYLE.popErrorMessage}>{isError}</Text>
                <Text style={isInfo && APP_STYLE.popMessage}>{isInfo}</Text>
            
        </View>
        </ScrollView>
        </TouchableWithoutFeedback>
    )
}


export default SignUp