import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Image } from 'react-native'
import { useForm, Controller } from 'react-hook-form';
import firebase from '../utils/firebase'
const SignIn = ({ changeForm }) => {

    const [showPassword, setShowPassword] = useState(false)
    const { control, handleSubmit, setError, errors } = useForm()
    const emailRef = useRef()
    const passwordRef = useRef()

    const onSubmit = async (data) => {
        try {
            console.log(data)
            const response = await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            console.log("Signed in")
        } catch (error) {
            const { code, message } = error;
            switch (code) {
                case 'auth/invalid-email':
                case 'auth/user-disabled':
                    setError("email", { type: "validate", message: message });
                    break;
                case 'auth/user-not-found':
                    setError("email", { type: "validate", message: "The user is not registered" });
                    break;
                case 'auth/wrong-password':
                    setError("password", { type: "validate", message: "The password is not valid or does not match the user" });
                    break;
                default:
                    break;
            }
        }
    }

    const rules = {
        email: {
            required: "Type your email please",
            pattern: {
                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Type a valid email please"
            },
            validate: (value) => value.trim() !== '' || "Type your email please",
        },
        password: {
            required: "Type the password please",
            minLength: {
                value: 6,
                message: "Supposed to be minimun 6 character length"
            }
        },
    }

    return (
        <>
            <Controller
                name="email"
                control={control}
                defaultValue=""
                onFocus={() => {
                    emailRef.current.focus();
                }}
                rules={rules.email}
                render={({ onChange, onBlur, value }) => (
                    <TextInput
                        placeholder={"Email"}
                        style={[styles.input, errors.email && styles.errorInput]}
                        placeholderTextColor='#969696'
                        onChangeText={(value) => {
                            onChange(value.toLowerCase().trim())
                        }}
                        value={value}
                        ref={emailRef}
                    />
                )}
            />
            {errors.email && <Text style={styles.errorMsg}>{errors.email.message}</Text>}
            <View style={styles.passwordView}>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        passwordRef.current.focus();
                    }}
                    rules={rules.password}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            placeholder={"Password"}
                            secureTextEntry={!showPassword}
                            style={[styles.input, styles.inputPass, errors.password && styles.errorInput]}
                            placeholderTextColor='#969696'
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            value={value}
                            ref={passwordRef}
                        />
                    )}
                />
                <TouchableOpacity
                    style={styles.showBtn}
                    onPress={() => setShowPassword(!showPassword)}
                >

                    <Image
                        source={showPassword ? require('../../assets/eye.png') : require('../../assets/eye-slash.png')}
                        style={{ width: 32, height: 32 }}
                    />
                </TouchableOpacity>
            </View>

            {errors.password && <Text style={styles.errorMsg}>{errors.password.message}</Text>}

            <View style={styles.viewBtns}>
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.btnTxt}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => changeForm()}
                >
                    <Text style={[styles.btnTxt, { marginBottom: 20 }]}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default SignIn

const styles = StyleSheet.create({
    btnTxt: {
        color: '#fff',
        fontSize: 18
    },
    btnShowTxt: {
        color: '#fff',
        fontSize: 18,
        padding: 10
    },
    input: {
        height: 50,
        color: '#fff',
        // width: '80%',
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040'
    },
    inputPass: {
        width: '80%',
    },
    errorMsg: {
        textAlign: 'left',
        marginLeft: 20,
        fontSize: 14,
        color: '#969696',
        marginTop: 4
    },
    viewBtns: {
        marginTop: 20,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between'
    },
    showBtn: {
        backgroundColor: '#1e3040',
        height: 50,
        color: '#969696',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14
    },
    passwordView: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-between',
        justifyContent: 'space-between'
    },
    errorInput: {
        borderColor: '#940c0c'
    }
})

