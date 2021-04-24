import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import CarDetails from './CarDetails'
import PlaceDetails from './PlaceDetails'
import EatingDetails from './EatingDetails';
import { Spinner } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { changeSuccessStatus } from '../../Redux/Slices/Provider/info'
// import { editCar } from '../../Redux/Slices/Provider/info'

const EditProduct = (props) => {
    const dispatch = useDispatch()
    const { edit } = props.route.params
    console.log("EditProduct Props: ", props)
    const pd = useSelector(({ provider }) => provider.productDetails)
    const pdLoading = useSelector(({ provider }) => provider.productDetailsLoading)
    const success = useSelector(({ provider }) => provider.success)

    const _onSuccess = () => {
        dispatch(changeSuccessStatus(false))
        let canGoBack = props.navigation.canGoBack()
        if (canGoBack) {
            props.navigation.goBack()
        }
    }

    success ? _onSuccess() : null

    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            {!pd && <Spinner style={styles.spinner} />}
            {pd && pd.type == "car" && <CarDetails edit={edit} pd={pd} />}
            {pd && pd.type == "places" && <PlaceDetails edit={edit} pd={pd} />}
            {pd && pd.type == "kashta" && <EatingDetails edit={edit} pd={pd} />}
            {pd && pd.type == "popular_eating" && <EatingDetails edit={edit} pd={pd} />}
        </SafeAreaView>
    )
}

export default EditProduct

