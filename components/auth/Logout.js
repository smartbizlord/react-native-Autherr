import React, { useContext } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { APP_STYLES } from '../../assets/Styles/AppStyles';
import { AuthContext } from '../../helpers/AuthStatus';

const Logout = ({ navigation }) => {
    const {logout} = useContext(AuthContext)
    return (
        <View>
            
                <Text>Welcome to Logout</Text>
                <TouchableOpacity onPress={logout}><Text>Logout</Text></TouchableOpacity>
            
        </View>
    )
}


export default Logout