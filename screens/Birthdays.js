import React, { useEffect, useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import moment from 'moment'
import ActionBar from '../src/components/ActionBar'
import NewBrithday from './NewBrithday'

import firebase from '../src/utils/firebase'
import 'firebase/firestore'
import Birthday from '../src/components/Birthday'

firebase.firestore().settings({ experimentalForceLongPolling: true })
const db = firebase.firestore(firebase)

const Birthdays = ({ user }) => {
    const [showBithdays, setShowBithdays] = useState(true)
    const [bdaysList, setBdaysList] = useState([])
    const [pastBdaysList, setPastBdaysList] = useState([])
    const [reload, setReload] = useState(true)
    useEffect(() => {
        const getBdays = async () => {
            const response = await db.collection(user.uid)
                .orderBy("birthday", "asc")
                .get()
            const tmpBdays = []
            response.forEach(doc => {
                const bday = {
                    id: doc.id,
                    ...doc.data()
                }
                tmpBdays.push(bday)
            })
            formatBdays(tmpBdays)
        }
        getBdays()
        setReload(false)
    }, [reload])

    const formatBdays = (items) => {
        const currentDate = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        })
        const tmpBdays = []
        const tmpPastBdays = []
        items.forEach(item => {
            const dateOfBirth = new Date(item.birthday)
            const birthday = moment(dateOfBirth)
            const currentYear = moment().get('year')
            birthday.set({ year: currentYear })
            const differenceDate = currentDate.diff(birthday, 'days')
            const tmpItem = {
                ...item,
                birthday: birthday,
                days: differenceDate
            }
            if (differenceDate <= 0) {
                tmpBdays.push(tmpItem)
            } else {
                tmpPastBdays.push(tmpItem)
            }
        })
        setBdaysList(tmpBdays)
        setPastBdaysList(tmpPastBdays)
    }
    const changeScreen = () => {
        setShowBithdays(!showBithdays)
    }

    const deleteBirthday = async (bday) => {
        await db.collection(user.uid)
            .doc(bday.id)
            .delete()

        setReload(true)
    }

    return (
        <>
            <View style={styles.container}>
                {showBithdays ?
                    <ScrollView contentContainerStyle={styles.scroll}>
                        {bdaysList.map((item, i) => (
                            <Birthday key={item.id} birthday={item} deleteBirthday={deleteBirthday} setReload={setReload} />
                        ))}
                        {pastBdaysList.map((item, i) => (
                            <Birthday key={item.id} birthday={item} deleteBirthday={deleteBirthday} setReload={setReload} />
                        ))}
                    </ScrollView>
                    :
                    <NewBrithday user={user} changeScreen={changeScreen} setReload={setReload} />
                }
            </View>
            <ActionBar changeScreen={changeScreen} showBithdays={showBithdays} />

        </>
    )
}

export default Birthdays

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        flex: 1,
        marginTop: StatusBar.currentHeight,
        marginBottom: 75
    },
    scroll: {
        flexGrow: 1
    }
})
