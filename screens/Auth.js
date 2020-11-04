import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import SignIn from '../src/components/SignIn'
import SignUp from '../src/components/SignUp'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Auth = () => {
    const [showSignIn, setShowSignIn] = useState(true)

    const changeForm = () => {
        setShowSignIn(!showSignIn)
    }
    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.view}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
            </View>
            {showSignIn ?
                <SignIn changeForm={changeForm} />
                :
                <SignUp changeForm={changeForm} />
            }

        </KeyboardAwareScrollView>
    )
}

export default Auth

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        height: 240,
        marginTop: 50,
        marginBottom: 50
    }
})
