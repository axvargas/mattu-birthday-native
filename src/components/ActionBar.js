import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import firebase from '../utils/firebase'
const ActionBar = ({ changeScreen, showBithdays }) => {
    const signOut = async () => {
        try {
            const response = await firebase.auth().signOut()
            console.log("Signed out")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={styles.viewFooter}>
            <TouchableOpacity
                onPress={() => signOut()}
                style={styles.signOutBtn}
            >

                <Text style={styles.btnTxt}>Sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => changeScreen()}
            >

                <Text style={styles.btnTxt}>{showBithdays ? "New birthday" : "Cancel"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ActionBar

const styles = StyleSheet.create({
    viewFooter: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 15
    },
    btn: {
        backgroundColor: '#1e3040',
        height: 50,
        color: '#969696',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14
    },
    btnTxt: {
        color: '#fff',
        fontSize: 18
    },
    signOutBtn: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14
    }

})
