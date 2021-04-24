import React from 'react'
import { SafeAreaView } from 'react-native'
import styles from './styles'
import Header from '../../custom/header'
import { Spinner } from 'native-base'
import { useSelector } from 'react-redux'
import ProfileInfo from './profile'

const Profile = (props) => {
    const worker = useSelector(({ worker }) => worker.user)

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            {!worker && <Spinner size='large' color='#F47421' />}
            {worker && <ProfileInfo worker={worker} _navigate={props.navigation.navigate} />}
        </SafeAreaView>
    )
}

export default Profile
