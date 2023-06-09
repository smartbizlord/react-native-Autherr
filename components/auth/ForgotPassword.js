import React, { useContext } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { APP_STYLES, DARK_APP_STYLES } from '../../assets/Styles/AppStyles';
import { Formik } from 'formik';
import { AuthContext } from '../../helpers/AuthStatus';

const ForgotPassword = ({ navigation }) => {
    const {darkTheme, forgotPassword, deeepLink, isError, isInfo, popMessage } = useContext(AuthContext);
    const APP_STYLE = darkTheme ? DARK_APP_STYLES : APP_STYLES;
    if(deeepLink) {
        deeepLink.path == "reset-password" && navigation.replace('Resetpassword')
    }

    const movement = () => {
        navigation.replace("Login")
    }
    return (
        <View style={APP_STYLE.AuthContainer}>
            
                <Text style={APP_STYLE.AuthHeaderText}>Forgot Password</Text>
                <Text>Fill in your email to begin password recovery process</Text>
                <Formik
                    initialValues={{
                        email: ""
                    }}
                    onSubmit={(values) => {
                        const {email} = values;
                        if(email.length) {forgotPassword(email, navigation)}
                        else {popMessage("Cannot submit empty input!", "err")}


                    }}
                >
                    {(formProps) =>(
                        <View style={APP_STYLE.AuthFormContainer}>
                            <Text>E-mail:</Text>
                            <TextInput
                            placeholder='johnsmith@gmail.com'
                            onChangeText={formProps.handleChange('email')}
                            value={formProps.values.email}
                            style={APP_STYLE.AuthInput}
                            />
                            <TouchableOpacity onPress={formProps.handleSubmit}><Text style={APP_STYLE.AuthSubmit}>Submit</Text></TouchableOpacity>
                        </View>
                    )}
                </Formik>

                <Text style={APP_STYLE.AuthLinkWrapper}><Text style={APP_STYLE.AuthLink} onPress={movement}>Go Back {"<-"} </Text></Text>

                <Text style={isError && APP_STYLE.popErrorMessage}>{isError}</Text>
                <Text style={isInfo && APP_STYLE.popMessage}>{isInfo}</Text>
            
        </View>
    )
}


export default ForgotPassword