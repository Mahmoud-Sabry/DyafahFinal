import React, { useState } from 'react'
import { Text, SafeAreaView, TouchableOpacity, ScrollView, View, TextInput } from 'react-native'
import styles from './styles'
import { Spinner } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { editCar } from '../../Redux/Slices/Provider/info'
import ImagesList from '../../Worker/EditProfile/ImagesList'
import I18n from '../../languages/I18n'

const EntryField = ({ _title, _value, _setValue, _edit, numeric }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <View style={[styles.entryView, langView]}>
            <Text style={[styles.entryTitle, langText]}>{_title}</Text>
            <TextInput
                keyboardType={numeric ? 'numeric' : 'default'}
                editable={_edit}
                multiline={true}
                value={_value}
                onChangeText={(newVal) => _setValue(newVal)}
                style={[styles.entryText, langText]}
            />
        </View>
    )
}

const CarDetails = ({ edit, pd }) => {
    const lang = useSelector(({ language }) => language.language)
    const api_token = useSelector(({ provider }) => provider.provider.api_token)
    const editCarLoading = useSelector(({ provider }) => provider.editCarLoading)
    const [ar_name, setAR_Name] = useState(pd ? pd.ar_name : '')
    const [name, setName] = useState(pd ? pd.en_name : '')
    const [ar_description, setAR_Description] = useState(pd ? pd.ar_description : '')
    const [description, setDescription] = useState(pd ? pd.en_description : '')
    const [details, setDetails] = useState(pd ? pd.details.length > 0 ? pd.details[0].value : '' : '')
    const [price, setPrice] = useState(pd ? pd.price.toString() : '')
    const [car_type, setCar_type] = useState(pd ? pd.cardetail.car_type : '')
    const [car_model, setCar_model] = useState(pd ? pd.cardetail.car_model : '')
    const [car_numbers, setCar_numbers] = useState(pd ? pd.cardetail.car_numbers : '')
    const [car_license, setCar_license] = useState(pd ? pd.cardetail.car_license : '')
    const [images, setImages] = useState(pd.images ? edit ? [...pd.images, null] : [...pd.images] : [null])
    const dispatch = useDispatch()

    const _onEditPress = () => {
        dispatch(editCar({
            api_token, name, ar_name, images, price,
            description, ar_description, details, car_type, car_model,
            car_numbers, car_license, product_id: pd.id
        }))
    }

    return (
        <SafeAreaView style={styles.container}>
            {pd && <ScrollView style={styles.container}>
                <ImagesList _images={images} _setImages={setImages} />
                {/* <ImagePickerButton image={car_image} setImage={setCar_image} /> */}
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addCar.name') + I18n.t('arabic')}
                    _value={ar_name}
                    _setValue={setAR_Name}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addCar.name') + I18n.t('english')}
                    _value={name}
                    _setValue={setName}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addCar.desc') + I18n.t('arabic')}
                    _value={ar_description}
                    _setValue={setAR_Description}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addCar.desc') + I18n.t('english')}
                    _value={description}
                    _setValue={setDescription}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addCar.details')}
                    _value={details}
                    _setValue={setDetails}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addCar.price')}
                    numeric={true}
                    _value={price}
                    _setValue={setPrice}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addCar.type')}
                    _value={car_type}
                    _setValue={setCar_type}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addCar.model')}
                    _value={car_model}
                    _setValue={setCar_model}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addCar.num')}
                    _value={car_numbers}
                    _setValue={setCar_numbers}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addCar.licence')}
                    _value={car_license}
                    _setValue={setCar_license}
                />
                {edit && !editCarLoading && <TouchableOpacity style={styles.saveButton} onPress={() => _onEditPress()}>
                    <Text style={styles.saveText}>{I18n.t('provider.products.saveChanges')}</Text>
                </TouchableOpacity>}
                {editCarLoading && <Spinner size='large' color='#F47421' />}
            </ScrollView>}
        </SafeAreaView>
    )
}

export default CarDetails;