import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Image } from 'react-native'
import { useForm, Controller } from 'react-hook-form';
import firebase from '../utils/firebase'

const SignUp = ({ changeForm }) => {

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConf, setShowPasswordConf] = useState(false)
    const { control, handleSubmit, getValues, setError, errors } = useForm()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()

    const onSubmit = async (data) => {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            console.log("Account created")
        } catch (error) {
            const { code, message } = error;
            switch (code) {
                case 'auth/email-already-in-use':
                case 'auth/invalid-email':
                    setError("email", { type: "validate", message: message });
                    break;
                case 'auth/operation-not-allowed':
                    setError("password", { type: "validate", message: message });
                    setError("email", { type: "validate", message: message });
                    break;
                case 'auth/weak-password':
                    setError("password", { type: "validate", message: message });
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
        passwordConfirmation: {
            required: "Type the password confirmation please",
            validate: {
                matchesPreviousPassword: value => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                }
            }
        }
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

            <View style={styles.passwordView}>
                <Controller
                    name="passwordConfirmation"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        passwordConfirmationRef.current.focus();
                    }}
                    rules={rules.passwordConfirmation}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            placeholder={"Password Confirmation"}
                            secureTextEntry={!showPasswordConf}
                            style={[styles.input, styles.inputPass, errors.passwordConfirmation && styles.errorInput]}
                            placeholderTextColor='#969696'
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            value={value}
                            ref={passwordConfirmationRef}
                        />
                    )}
                />
                <TouchableOpacity
                    style={styles.showBtn}
                    onPress={() => setShowPasswordConf(!showPasswordConf)}
                >

                    <Image
                        source={showPasswordConf ? require('../../assets/eye.png') : require('../../assets/eye-slash.png')}
                        style={{ width: 32, height: 32 }}
                    />
                </TouchableOpacity>
            </View>

            {errors.passwordConfirmation && <Text style={styles.errorMsg}>{errors.passwordConfirmation.message}</Text>}

            <View style={styles.viewBtns}>
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.btnTxt}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => changeForm()}
                >
                    <Text style={[styles.btnTxt, { marginBottom: 20 }]}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default SignUp

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
        justifyContent: 'space-between'
    },
    errorInput: {
        borderColor: '#940c0c'
    }
})
