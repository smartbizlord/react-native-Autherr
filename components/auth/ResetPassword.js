import React, { useContext } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { APP_STYLES } from '../../assets/Styles/AppStyles';
import { Formik } from 'formik';
import { AuthContext } from '../../helpers/AuthStatus';

const ResetPassword = ({ navigation }) => {

    const {deeepLink, isError, isInfo, darkTheme } = useContext(AuthContext);
    const APP_STYLE = darkTheme ? DARK_APP_STYLES : APP_STYLES;

    return (
        <View style={APP_STYLE.AuthContainer}>
            
                <Text style={APP_STYLE.AuthHeaderText}>Set new password</Text>
                <Formik
                    initialValues={{
                        password: "",
                        confirmPassword: ""
                    }}
                    onSubmit={(values) => {

                    }}
                >
                    {(formProps) =>(
                        <View style={APP_STYLE.AuthFormContainer}>
                            <TextInput
                            placeholder='* * * * * * * *'
                            onChangeText={formProps.handleChange('password')}
                            value={formProps.values.password}
                            secureTextEntry
                            keyboardType='numeric'
                            style={APP_STYLE.AuthInput}
                            />

                            <TextInput
                            placeholder='* * * * * * * *'
                            onChangeText={formProps.handleChange('confirmPassword')}
                            value={formProps.values.confirmPassword}
                            secureTextEntry
                            keyboardType='numeric'
                            style={APP_STYLE.AuthInput}
                            />
                            <TouchableOpacity onPress={formProps.handleSubmit}><Text style={APP_STYLE.AuthSubmit}>Reset Password</Text></TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <Text style={isError && APP_STYLE.popErrorMessage}>{isError}</Text>
                <Text style={isInfo && APP_STYLE.popMessage}>{isInfo}</Text>
            
        </View>
    )
}


export default ResetPassword