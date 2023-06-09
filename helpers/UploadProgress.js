import React from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const AxiosCall = axios.create({
    baseURL: 'https://fintech-app-api-production.up.railway.app/'
})

const config = {
    onUploadProgress: (progEv) => {
        const percentedComplete = (progEv.loaded / progEv.total) * 100;
    }
}


export default AxiosCall;