import React from 'react';
import { View, Text } from 'react-native';
import Logout from '../components/auth/Logout';

const Home = () => {
    return (
        <View>
            <Text>Welcome to Home</Text>
            <Logout />
        </View>
    )
}


export default Home