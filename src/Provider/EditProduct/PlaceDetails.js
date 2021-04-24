import React, { useState } from 'react'
import { Text, SafeAreaView, TouchableOpacity, ScrollView, View, TextInput } from 'react-native'
import styles from './styles'
import { Spinner } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { editPlace } from '../../Redux/Slices/Provider/info'
import ImagesList from '../../Worker/EditProfile/ImagesList'
import I18n from '../../languages/I18n'
import Calendarobj from '../../custom/CalendarObj'
import moment from 'moment'

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

const PlaceDetails = ({ edit, pd }) => {
    console.log("PlaceDetails: ", pd)
    const lang = useSelector(({ language }) => language.language)
    const api_token = useSelector(({ provider }) => provider.provider.api_token)
    const addPlaceLoading = useSelector(({ provider }) => provider.addPlaceLoading)
    const [ar_name, setAR_Name] = useState(pd ? pd.ar_name : '')
    const [name, setName] = useState(pd ? pd.en_name : '')
    const [ar_description, setAR_Description] = useState(pd ? pd.ar_description : '')
    const [description, setDescription] = useState(pd ? pd.en_description : '')
    const [details, setDetails] = useState(pd ? pd.details.length > 0 ? pd.details[0].value : '' : '')
    const [price, setPrice] = useState(pd ? pd.price.toString() : '')
    const [images, setImages] = useState(pd.images ? edit ? [...pd.images, null] : [...pd.images] : [null])
    const [_markedDates, _setmarkedDates] = useState(null)
    const [_days, _setDays] = useState([])
    const dispatch = useDispatch()

    const _onEditPress = () => {
        dispatch(editPlace({
            api_token, product_id: pd.id, ar_name, name, price, ar_description, description, details, images,
            days: _days
        }))
    }

    const _markingDays = () => {
        const { calender } = pd
        var d = new Date()
        const month = d.getMonth() + 1
        const year = d.getFullYear()
        let updatedMarkedDates = []
        let days = _days
        if (calender) {
            calender.forEach(day => {
                days = [...days, day.day]
                const _selectedDay = moment(year + '-' + month + '-' + day.day).format('YYYY-MM-DD')
                updatedMarkedDates = ({ ...updatedMarkedDates, ...{ [_selectedDay]: { selected: true, marked: true } } })
            })
        }
        _setDays([...days])
        _setmarkedDates({ ...updatedMarkedDates })
    }

    _markedDates ? null : _markingDays()

    return (
        <SafeAreaView style={styles.container}>
            {pd && <ScrollView style={styles.container}>
                <ImagesList _images={images} _setImages={setImages} />
                {/* <ImagePickerButton image={image} setImage={setImage} /> */}
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.name') + I18n.t('arabic')}
                    _value={ar_name}
                    _setValue={setAR_Name}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.name') + I18n.t('english')}
                    _value={name}
                    _setValue={setName}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.desc') + I18n.t('arabic')}
                    _value={ar_description}
                    _setValue={setAR_Description}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.desc') + I18n.t('english')}
                    _value={description}
                    _setValue={setDescription}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.details')}
                    _value={details}
                    _setValue={setDetails}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.price')}
                    numeric={true}
                    _value={price}
                    _setValue={setPrice}
                />
                <Calendarobj
                    _markedDates={_markedDates}
                    _setmarkedDates={_setmarkedDates}
                    _days={_days}
                    _setDays={_setDays}
                    _press={false}
                />
                {edit && !addPlaceLoading && <TouchableOpacity style={styles.saveButton} onPress={() => _onEditPress()}>
                    <Text style={styles.saveText}>{I18n.t('provider.products.saveChanges')}</Text>
                </TouchableOpacity>}
                {addPlaceLoading && <Spinner size='large' color='#F47421' />}
            </ScrollView>}
        </SafeAreaView>
    )
}

export default PlaceDetails;