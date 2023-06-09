import React from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const AxiosCall = axios.create({
    baseURL: 'https://fintech-app-api-production.up.railway.app/',
    headers: { 'Content-Type': 'application/json',
               'fromapp' : 'yes' 
            }
})


export default AxiosCall;