import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import ImagePickerButton from '../../custom/ImagePickerButton';
import { addCar, changeSuccessStatus } from '../../Redux/Slices/Provider/info';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'native-base';
import ImagesList from '../../Worker/EditProfile/ImagesList';
import I18n from '../../languages/I18n'

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

const AddCar = (props) => {
    const dispatch = useDispatch()
    // console.log("Product Details Props : ", props)
    const [name, setName] = useState('')
    const [ar_name, setAR_Name] = useState('')
    const [details, setDetails] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [ar_description, setAR_Description] = useState('')
    const [car_type, setCar_type] = useState('')
    const [car_model, setCar_model] = useState('')
    const [car_numbers, setCar_numbers] = useState('')
    const [car_license, setCar_license] = useState('')
    const [images, setImages] = useState([null])
    const provider = useSelector(({ provider }) => provider.provider)
    const addCarLoading = useSelector(({ provider }) => provider.addCarLoading)
    const lang = useSelector(({ language }) => language.language)

    const success = useSelector(({ provider }) => provider.success)

    const _onSuccess = () => {
        dispatch(changeSuccessStatus(false))
        setName('')
        setAR_Name('')
        setDetails('')
        setPrice('')
        setDescription('')
        setAR_Description('')
        setCar_type('')
        setCar_model('')
        setCar_numbers('')
        setCar_license('')
        setImages([null])
        let canGoBack = props.navigation.canGoBack()
        if (canGoBack) {
            props.navigation.goBack()
        }
    }

    success ? _onSuccess() : null

    const _onSaveCarPress = () => {
        const { api_token } = provider
        // if (image) {
        dispatch(addCar({
            api_token,
            name,
            ar_name,
            images,
            price,
            description,
            ar_description,
            details,
            car_type,
            car_model,
            car_numbers,
            car_license
        }))
        // }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            <ScrollView style={styles.container}>
                <ImagesList _images={images} _setImages={setImages} />
                {/* <ImagePickerButton image={image} setImage={setImage} /> */}
                <EntryField _text={I18n.t('provider.products.addCar.name') + I18n.t('arabic')} _value={ar_name} _setValue={setAR_Name} />
                <EntryField _text={I18n.t('provider.products.addCar.name') + I18n.t('english')} _value={name} _setValue={setName} />
                <EntryField _text={I18n.t('provider.products.addCar.details')} _value={details} _setValue={setDetails} _height={70} />
                <EntryField _text={I18n.t('provider.products.addCar.price')} _value={price} _setValue={setPrice} numeric={true} />
                <EntryField _text={I18n.t('provider.products.addCar.desc') + I18n.t('arabic')} _value={ar_description} _setValue={setAR_Description} />
                <EntryField _text={I18n.t('provider.products.addCar.desc') + I18n.t('english')} _value={description} _setValue={setDescription} />
                <EntryField _text={I18n.t('provider.products.addCar.type')} _value={car_type} _setValue={setCar_type} />
                <EntryField _text={I18n.t('provider.products.addCar.model')} _value={car_model} _setValue={setCar_model} />
                <EntryField _text={I18n.t('provider.products.addCar.num')} _value={car_numbers} _setValue={setCar_numbers} />
                <EntryField _text={I18n.t('provider.products.addCar.licence')} _value={car_license} _setValue={setCar_license} />
                {!addCarLoading &&
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => _onSaveCarPress()}
                    >
                        <Text style={styles.saveText}>{I18n.t('provider.products.save')}</Text>
                    </TouchableOpacity>}
                {addCarLoading && <Spinner size='large' color='red' />}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddCar
