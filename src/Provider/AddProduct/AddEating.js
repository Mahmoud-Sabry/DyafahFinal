import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import { addEating, changeSuccessStatus } from '../../Redux/Slices/Provider/info';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'native-base';
import MultiChoice from '../../custom/MultiChoice';
import ImagesList from '../../Worker/EditProfile/ImagesList';
import I18n from '../../languages/I18n'

const EntryField = ({ _value, _setValue, _height, _text, numeric }) => {
    const lang = useSelector(({ language }) => language.language)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const height = _height ? _height : 50
    return (
        <View style={[styles.entryView, langText, { height }]}>
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



const AddEating = (props) => {
    const dispatch = useDispatch()
    // console.log("Product Details Props : ", props)
    const lang = useSelector(({ language }) => language.language)
    const provider = useSelector(({ provider }) => provider.provider)
    const kashtaCategories = useSelector(({ provider }) => provider.kashtaCategories)
    const eatingCategories = useSelector(({ provider }) => provider.eatingCategories)
    const addEatingLoading = useSelector(({ provider }) => provider.addEatingLoading)
    const types = [
        { id: 1, ar_name: I18n.t('provider.products.addEating.types.kashta'), en_name: I18n.t('provider.products.addEating.types.kashta') },
        { id: 2, ar_name: I18n.t('provider.products.addEating.types.popular'), en_name: I18n.t('provider.products.addEating.types.popular') }]
    const [ar_name, setAR_Name] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [ar_description, setAR_Description] = useState('')
    const [description, setDescription] = useState('')
    const [details, setDetails] = useState('')
    const [images, setImages] = useState([null])
    const [selectedType, setSelectedType] = useState(provider.type == 'kashta' ? 1 : 2)
    const [category_id, setSelectedCat] = useState(provider.type == 'kashta' ? kashtaCategories[0].id : eatingCategories[0].id)

    const success = useSelector(({ provider }) => provider.success)

    const _onSuccess = () => {
        dispatch(changeSuccessStatus(false))
        setAR_Name('')
        setName('')
        setPrice('')
        setAR_Description('')
        setDescription('')
        setDetails('')
        setImages([null])
        setSelectedType(provider.type == 'kashta' ? 1 : 2)
        setSelectedCat(kashtaCategories[0].id)
        let canGoBack = props.navigation.canGoBack()
        if (canGoBack) {
            props.navigation.goBack()
        }
    }

    success ? _onSuccess() : null


    const _onSavePress = () => {
        const { api_token } = provider
        // if (images != null)
        dispatch(addEating({
            api_token,
            ar_name,
            name,
            price,
            ar_description,
            description,
            details,
            images,
            type: selectedType == 1 ? 'kashta' : 'popular_eating',
            category_id
        }))
    }
    console.log("AddEating category_id: ", category_id)
    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            <ScrollView style={styles.container}>
                <ImagesList _images={images} _setImages={setImages} />
                {/* <ImagePickerButton image={image} setImage={setImage} /> */}
                <EntryField _text={I18n.t('provider.products.addEating.name') + I18n.t('arabic')} _value={ar_name} _setValue={setAR_Name} />
                <EntryField _text={I18n.t('provider.products.addEating.name') + I18n.t('english')} _value={name} _setValue={setName} />
                <EntryField _text={I18n.t('provider.products.addEating.desc') + I18n.t('arabic')} _value={ar_description} _setValue={setAR_Description} />
                <EntryField _text={I18n.t('provider.products.addEating.desc') + I18n.t('english')} _value={description} _setValue={setDescription} />
                <EntryField _text={I18n.t('provider.products.addEating.details')} _value={details} _setValue={setDetails} _height={70} />
                <EntryField _text={I18n.t('provider.products.addEating.price')} _value={price} _setValue={setPrice} numeric={true} />
                {/* <MultiChoice
                    _label={I18n.t('provider.products.addEating.type')}
                    _choices={types}
                    _selected={selectedType}
                    _setSelected={setSelectedType}
                /> */}
                {selectedType == 1 && <MultiChoice
                    _label={I18n.t('provider.products.addEating.cat')}
                    _choices={kashtaCategories}
                    _selected={category_id}
                    _setSelected={setSelectedCat}
                />}
                {selectedType == 2 && <MultiChoice
                    _label={I18n.t('provider.products.addEating.cat')}
                    _choices={eatingCategories}
                    _selected={category_id}
                    _setSelected={setSelectedCat}
                />}
                {!addEatingLoading &&
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => _onSavePress()}
                    >
                        <Text style={styles.saveText}>{I18n.t('provider.products.save')}</Text>
                    </TouchableOpacity>
                }
                {addEatingLoading && <Spinner size='large' color='red' />}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddEating
