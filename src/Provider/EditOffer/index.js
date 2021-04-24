import React, { useState, useMemo } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import { Icon, Spinner } from 'native-base'
import ImagePickerButton from '../../custom/ImagePickerButton'
import { useDispatch, useSelector } from 'react-redux'
import { addNewOffer, updateOffer, setOfferItem, changeSuccessStatus } from '../../Redux/Slices/Provider/info'
import ImagesList from '../../Worker/EditProfile/ImagesList'
import I18n from '../../languages/I18n';
import { dyafah } from '../../assets/consts'

const EntryField = ({ _title, _value, _setValue, edit, numeric }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <View style={[styles.entryView, langView]}>
            <Text style={[styles.entryTitle, langText]}>{_title}</Text>
            <TextInput
                keyboardType={numeric ? 'numeric' : 'default'}
                editable={edit}
                multiline={true}
                value={_value}
                onChangeText={(newVal) => _setValue(newVal)}
                style={[styles.entryText, langText]}
            />
        </View>
    )
}

const OfferDetails = ({ props, item, edit }) => {
    const dispatch = useDispatch()
    console.log('item ', item)
    const lang = useSelector(({ language }) => language.language)
    const api_token = useSelector(({ provider }) => provider.provider.api_token)
    const addOfferLoading = useSelector(({ provider }) => provider.addOfferLoading)
    const [name, setName] = useState(item.en_name)
    const [ar_name, setAR_Name] = useState(item.ar_name)
    const [description, setDescription] = useState(item.en_description)
    const [ar_description, setAR_Description] = useState(item.ar_description)
    const [price, setPrice] = useState(item.price.toString())
    const [offer_price, setOffer_price] = useState(edit ? item.offer_price.toString() : '')
    const [ar_offer_description, setAR_Offer_description] = useState(edit ? item.ar_offer_description : '')
    const [offer_description, setOffer_description] = useState(edit ? item.offer_description : '')
    const [offer_images, setOfferImages] = useState([{ uri: `${dyafah}${item.product_image.image}` }])
    const success = useSelector(({ provider }) => provider.success)

    const _onSuccess = () => {
        dispatch(changeSuccessStatus(false))
        let canGoBack = props.navigation.canGoBack()
        if (canGoBack) {
            props.navigation.goBack()
        }
    }
    success ? _onSuccess() : null

    if (item.ar_name != name || item.price.toString() != price) {
        setName(item.ar_name)
        setDescription(item.ar_description)
        setPrice(item.price.toString())
        setOffer_price(edit ? item.offer_price.toString() : '')
        setOffer_description(edit ? item.offer_description : '')
        setAR_Offer_description(edit ? item.ar_offer_description : '')
        setOfferImages([{ uri: `${dyafah}${item.product_image.image}` }])
    }

    const _onSavePressed = () => {
        if (!edit) {
            dispatch(addNewOffer({ api_token, product_id: item.id, offer_price, offer_description, ar_offer_description }))
        } else {
            dispatch(updateOffer({ api_token, product_id: item.id, offer_price, offer_description, ar_offer_description }))
        }

    }
    return (
        <ScrollView style={styles.container}>
            <ImagesList _images={offer_images} _setImages={setOfferImages} _onPress={() => null} />
            {/* <ImagePickerButton image={offer_image} setImage={setOfferImage} /> */}
            <EntryField
                edit={false}
                _title={I18n.t('provider.offers.name') + I18n.t('arabic')}
                _value={ar_name}
                _setValue={setAR_Name}
            />
            <EntryField
                edit={false}
                _title={I18n.t('provider.offers.name') + I18n.t('english')}
                _value={name}
                _setValue={setName}
            />
            <EntryField
                edit={false}
                _title={I18n.t('provider.offers.desc') + I18n.t('arabic')}
                _value={ar_description}
                _setValue={setAR_Description}
            />
            <EntryField
                edit={false}
                _title={I18n.t('provider.offers.desc') + I18n.t('english')}
                _value={description}
                _setValue={setDescription}
            />
            <EntryField
                edit={false}
                _title={I18n.t('provider.offers.productPrice')}
                _value={price}
                _setValue={setPrice}
            />
            <EntryField
                edit={true}
                _title={I18n.t('provider.offers.offerDesc') + I18n.t('arabic')}
                _value={ar_offer_description}
                _setValue={setAR_Offer_description}
            />
            <EntryField
                edit={true}
                _title={I18n.t('provider.offers.offerDesc') + I18n.t('english')}
                _value={offer_description}
                _setValue={setOffer_description}
            />
            <EntryField
                edit={true}
                numeric={true}
                _title={I18n.t('provider.offers.offerPrice')}
                _value={offer_price}
                _setValue={setOffer_price}
            />
            {!addOfferLoading && <TouchableOpacity style={styles.saveButton} onPress={() => _onSavePressed()}>
                <Text style={styles.saveText}>{I18n.t('provider.offers.save')}</Text>
            </TouchableOpacity>}
            {addOfferLoading && <Spinner size='large' color='#F47421' />}
        </ScrollView>
    )
}

const EditOffer = (props) => {
    const item = useSelector(({ provider }) => provider.offerItem)
    const edit = useSelector(({ provider }) => provider.editoffer)
    const lang = useSelector(({ language }) => language.language)
    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            {!item && <Spinner size='large' color='#F47421' />}
            {item && <OfferDetails props={props} item={item} edit={edit} />}
        </SafeAreaView>
    )
}

export default EditOffer

