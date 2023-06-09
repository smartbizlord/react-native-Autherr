import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../helpers/AuthStatus";









let darkThemer;


const AppRendering = () => {
    
    const {darkTheme} = useContext(AuthContext)
    darkThemer = darkTheme;
    return(
        <View></View>
    )
}


export const COLORS = () => {
    return ({
        primary : "blue",
        secondary: "gold",
        tertiary: "white",
        country1: "green",
        country2: "white",
        error: "red",
    })
}

export const DARK_COLORS = () => {
    return ({
        darkPrimary :  "darkblue",
        darkSecondary:  "darkgold",
        darkTertiary:  "darkwhite",
        darkCountry1:  "darkgreen",
        darkCountry2:  "darkwhite",
        darkError: "oxblood"
    })
}

const { primary, secondary, tertiary, country1, country2, error } = COLORS()

const { darkPrimary, darkSecondary, darkTertiary, darkCountry1, darkCountry2, darkError } = DARK_COLORS()

export const APP_STYLES = StyleSheet.create({
    AuthContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: tertiary
    },
    AuthHeaderText: {
        fontSize: 36,
        marginBottom: 20,
    },
    AuthFormContainer: {
        borderWidth:1,
        borderColor: country1,
        width: 300,
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    AuthInput: {
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
    },
    AuthPickerInput: {
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 0
    },
    AuthSubmit: {
        backgroundColor: primary,
        width: 100,
        height: 25,
        textAlign: "center",
        color: tertiary,
        fontSize: 20,
        borderRadius: 4,
        marginHorizontal: 70,
        marginTop: 20
    },
    AuthVerifySubmit: {
        backgroundColor: primary,
        width: 120,
        height: 57,
        textAlign: "center",
        color: tertiary,
        fontSize: 25,
        borderRadius: 4,
        marginHorizontal: 100,
        marginTop: 20
    },
    AuthLink : {
        color: "blue",
    },
    AuthLinkWrapper : {
        marginVertical: 5,
    },
    AuthVerifyInputContainer: {
        flexDirection: "row"
    },
    verifyError: {
        borderWidth: 1,
        borderColor: "red",
        padding: 0,
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginHorizontal: 5,
    },
    verifyWithoutError: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 0,
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginHorizontal: 5,
    },
    AuthVerifyInput: {
        padding: 5,
        margin: 0,
        flex: 1,
        fontSize: 30,
    },
    AuthBrief: {
        padding: 25,
        textAlign:"center",
    },
    popMessage: {
        position: "absolute",
        bottom: 40,
        fontSize: 20,
        backgroundColor: country1,
        color: tertiary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 3,
    },
    popErrorMessage: {
        position: "absolute",
        bottom: 40,
        fontSize: 20,
        backgroundColor: error,
        color: tertiary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 3,
    }
})

export const DARK_APP_STYLES = StyleSheet.create({
    
})