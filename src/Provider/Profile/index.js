import React, { useState } from 'react'
import { View, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import Header from '../../custom/header';
import { useSelector } from 'react-redux';
import ProfileInfo from './profile';



const Profile = (props) => {
    const provider = useSelector(({ provider }) => provider.provider)

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            <ProfileInfo provider={provider} />
        </SafeAreaView>
    )
}

export default Profile
