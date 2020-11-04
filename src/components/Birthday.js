import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'

const Birthday = ({ birthday, deleteBirthday }) => {
    const pasat = birthday.days > 0 ? true : false
    const infoDay = () => {
        if (birthday.days === 0) {
            return <Text style={{ color: '#fff' }}>Today</Text>
        } else {
            let { days } = birthday
            days = -days
            return (
                <View style={styles.textCurrent}>
                    <Text>{days}</Text>
                    <Text>{days === 1 ? 'day' : 'days'}</Text>
                </View>
            )
        }
    }



    const showAlert = () => {
        Alert.alert(
            'Delete birthday',
            `Are you sure you want to delete ${birthday.name}'s birthday?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => deleteBirthday(birthday)
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <TouchableOpacity
            style={[styles.card, pasat ? styles.pasat : birthday.days === 0 ? styles.actual : styles.current]}
            onLongPress={() => showAlert()}
        >
            <Text style={styles.username}>{birthday.name}</Text>
            {pasat ?
                <Text style={{ color: '#fff' }}>Past</Text>
                :
                infoDay()
            }
        </TouchableOpacity>
    )
}

export default Birthday

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 15
    },
    pasat: {
        backgroundColor: '#820000'
    },
    current: {
        backgroundColor: '#1ae1f2'
    },
    actual: {
        backgroundColor: '#559204'
    },
    username: {
        color: '#fff',
        fontSize: 16
    },
    textCurrent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
    }
})
