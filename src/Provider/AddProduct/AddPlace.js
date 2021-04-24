import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import ImagesList from '../../Worker/EditProfile/ImagesList';
import { addPlace, changeSuccessStatus } from '../../Redux/Slices/Provider/info';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'native-base';
import I18n from '../../languages/I18n';
import Calendarobj from '../../custom/CalendarObj';

const EntryField = ({ _value, _setValue, _height, _text, numeric }) => {
    const lang = useSelector(({ language }) => language.language)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const height = _height ? _height : 50
    return (
        <View style={[styles.entryView, { height }]}>
            <TextInput
                keyboardType={numeric ? 'numeric' : 'default'}
                multiline={true}
                placeholder={_text}
                value={_value}
                onChangeText={(newVal) => _setValue(newVal)}
                style={[styles.entryText, langText]}
            />
        </View>
    )
}

const AddPlace = (props) => {
    const dispatch = useDispatch()
    // console.log("Product Details Props : ", props)
    const lang = useSelector(({ language }) => language.language)
    const [ar_name, setAR_Name] = useState('')
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [price, setPrice] = useState('')
    const [ar_description, setAR_Description] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([null])
    const [_markedDates, _setmarkedDates] = useState([])
    const [_days, _setDays] = useState([])
    const provider = useSelector(({ provider }) => provider.provider)
    const addPlaceLoading = useSelector(({ provider }) => provider.addPlaceLoading)
    const success = useSelector(({ provider }) => provider.success)

    const _onSuccess = () => {
        dispatch(changeSuccessStatus(false))
        setAR_Name('')
        setName('')
        setDetails('')
        setPrice('')
        setDescription('')
        setAR_Description('')
        setImages([null])
        _setmarkedDates([])
        _setDays([])
        let canGoBack = props.navigation.canGoBack()
        if (canGoBack) {
            props.navigation.goBack()
        }
    }
    success ? _onSuccess() : null

    const _onSavePlacePress = () => {
        const { api_token } = provider
        // if (image != null)
        dispatch(addPlace({ api_token, ar_name, name, price, ar_description, description, details, images, days: _days }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            <ScrollView style={styles.container}>
                <ImagesList _images={images} _setImages={setImages} />
                {/* <ImagePickerButton image={image} setImage={setImage} /> */}
                <EntryField _text={I18n.t('provider.products.addPlace.name') + I18n.t('arabic')} _value={ar_name} _setValue={setAR_Name} />
                <EntryField _text={I18n.t('provider.products.addPlace.name') + I18n.t('english')} _value={name} _setValue={setName} />
                <EntryField _text={I18n.t('provider.products.addPlace.desc') + I18n.t('arabic')} _value={ar_description} _setValue={setAR_Description} />
                <EntryField _text={I18n.t('provider.products.addPlace.desc') + I18n.t('english')} _value={description} _setValue={setDescription} />
                <EntryField _text={I18n.t('provider.products.addPlace.details')} _value={details} _setValue={setDetails} _height={70} />
                <EntryField _text={I18n.t('provider.products.addPlace.price')} _value={price} _setValue={setPrice} numeric={true} />
                <Calendarobj
                    _markedDates={_markedDates}
                    _setmarkedDates={_setmarkedDates}
                    _days={_days}
                    _setDays={_setDays}
                    _press={false}
                />
                {!addPlaceLoading &&
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => _onSavePlacePress()}
                    >
                        <Text style={styles.saveText}>{I18n.t('provider.products.save')}</Text>
                    </TouchableOpacity>
                }
                {addPlaceLoading && <Spinner size='large' color='red' />}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddPlace
