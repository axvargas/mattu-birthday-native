import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from 'moment'
import firebase from '../src/utils/firebase'
import 'firebase/firestore'
firebase.firestore().settings({ experimentalForceLongPolling: true })
const db = firebase.firestore(firebase)

const NewBrithday = ({ user, changeScreen, setReload }) => {
    const { control, handleSubmit, setValue, getValues, setError, errors } = useForm({
        defaultValues: {
            name: '',
            birthday: ''
        }
    })
    const nameRef = useRef()
    const birthdayRef = useRef()

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [birthday, setBirthday] = useState(null)
    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }

    const handleConfirm = (date) => {
        const dateOfBirth = date
        dateOfBirth.setHours(0, 0, 0)
        dateOfBirth.setMilliseconds(0)
        setBirthday(dateOfBirth)
        const bday = moment(dateOfBirth).format('LL')
        setValue('birthday', bday, { shouldValidate: true })
        hideDatePicker()
    }

    const onSubmit = async (data) => {

        try {
            const newBirthday = {
                name: data.name,
                birthday: birthday.setYear(0)
            }
            await db.collection(user.uid).add(newBirthday)
            setReload(true)
            changeScreen()
        } catch (error) {
            console.log(error)
        }
    }

    const rules = {
        name: {
            required: "Type the name of the person please",
            validate: (value) => value.trim() !== '' || "Type the name of the person please",
        },
        birthday: {
            required: "Pick the birthday of the person please",
            validate: (value) => value.trim() !== '' || "Pick the birthday of the person please",
        },

    }
    return (
        <>
            <View style={styles.container}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        nameRef.current.focus();
                    }}
                    rules={rules.name}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            placeholder={"Name"}
                            style={[styles.input, errors.name && styles.errorInput]}
                            placeholderTextColor='#969696'
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            value={value}
                            ref={nameRef}
                        />
                    )}
                />
                {errors.name && <Text style={styles.errorMsg}>{errors.name.message}</Text>}

                <View
                    style={[styles.input, styles.datepicker, errors.birthday && styles.errorInput]}
                    onPress={showDatePicker}
                >
                    <Text
                        style={[styles.textDate, getValues().birthday && { color: '#fff' }]}
                        onPress={showDatePicker}
                    >
                        {getValues().birthday || "Birthday"}
                    </Text>
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                {errors.birthday && <Text style={styles.errorMsg}>{errors.birthday.message}</Text>}
                <Controller
                    name="birthday"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        birthdayRef.current.focus();
                    }}
                    rules={rules.birthday}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.hide}
                            placeholderTextColor='#969696'
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            value={getValues().birthday}
                            ref={birthdayRef}
                        />
                    )}
                />

                <View style={styles.viewBtns}>
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.btnTxt}>Add birthday</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    )
}

export default NewBrithday

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginTop: 25,
        height: 50,
        color: '#fff',
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040'
    },
    btnTxt: {
        color: '#fff',
        fontSize: 18
    },
    viewBtns: {
        marginTop: 20,
        alignItems: 'center',
    },
    errorMsg: {
        textAlign: 'left',
        marginLeft: 20,
        fontSize: 14,
        color: '#969696',
        marginTop: 4
    },
    datepicker: {
        justifyContent: 'center'
    },
    textDate: {
        color: '#969696',
        fontSize: 18
    },
    hide: {
        display: 'none'
    },
    errorInput: {
        borderColor: '#940c0c'
    }
})
