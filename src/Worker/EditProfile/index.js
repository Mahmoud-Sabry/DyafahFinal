import React, { useState } from 'react'
import {
    SafeAreaView, ScrollView, View, FlatList,
    TouchableOpacity, Text, TextInput, Image,
} from 'react-native'
import Header from '../../custom/header';
import CalendarObj from '../../custom/CalendarObj';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { doneEditInfo, editInfo } from '../../Redux/Slices/Worker/info';
import { Toast, Spinner } from 'native-base';
import ImagesList from './ImagesList';
import I18n from '../../languages/I18n';
import { getWorker } from '../../Redux/Slices/Worker/info';
import moment from 'moment';

// const DetailsRow = ({ _details, _setDetails, numeric }) => {
//     const lang = useSelector(({ language }) => language.language)
//     const [_detail, _setDetail] = useState('')
//     return (
//         <View style={[styles.addDetailsView, { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }]}>
//             <TouchableOpacity style={styles.addDetailsButton}
//                 onPress={() => _detail != '' ? _setDetails([..._details, { value: _detail }]) : null}
//             >
//                 <Text style={styles.addDetailsText}>{I18n.t('worker.profile.addDetail')}</Text>
//             </TouchableOpacity>
//             <TextInput
//                 keyboardType={numeric ? 'numeric' : 'default'}
//                 style={styles.detailsText}
//                 placeholder={I18n.t('worker.profile.writeDetail')}
//                 value={_detail}
//                 onChangeText={(text) => _setDetail(text)}
//             />
//         </View>
//     )
// }

const InfoRow = ({ _text, _tag, _val, _setVal, _numeric }) => {
    const lang = useSelector(({ language }) => language.language)
    return (
        <View style={[styles.infoRowView, { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }]}>
            <Text style={styles.infoTagLabel}>{_tag}</Text>
            <TextInput
                keyboardType={_numeric ? 'numeric' : 'default'}
                placeholder={_text}
                value={_val}
                onChangeText={(t) => _setVal(t)}
                style={styles.detailsText}
                multiline
            />
        </View>
    )
}

const EditProfile = (props) => {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const worker = useSelector(({ worker }) => worker.user)
    const product = useSelector(({ worker }) => worker.product)
    const loading = useSelector(({ worker }) => worker.loading)
    const productLoading = useSelector(({ worker }) => worker.productLoading)
    const successEditing = useSelector(({ worker }) => worker.successEditing)
    product ? null : dispatch(getWorker({ token: worker.api_token }))
    const { price, ar_description, en_description, details, calender } = product ? product : [0, '', '', [{ value: '' }], []]
    const imageList = product ? product.images ? [...product.images, null] : [null] : [null]
    const [_markedDates, _setmarkedDates] = useState(null)
    const [_days, _setDays] = useState([])
    const [_details, _setDetails] = useState(details ? details[0] ? details[0].value : '' : '')
    const [images, setImages] = useState(imageList)
    const [Price, setPrice] = useState(price ? price.toString() : '')
    const [description, setDescription] = useState(ar_description ? ar_description : '')
    const [En_description, setEN_Description] = useState(en_description ? en_description : '')
    console.log("product : ", product)

    const _goBack = () => {
        dispatch(doneEditInfo(false))
        props.navigation.goBack()
    }

    successEditing ? _goBack() : null
    const _markingDays = () => {
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

    const _onPress = () => {
        const { api_token } = worker
        // if (images[0] != null && _days.length > 0 && _details.length > 0) {
        dispatch(editInfo({
            api_token,
            images,
            price: Price,
            ar_description: description,
            description: En_description,
            days: _days,
            details: _details
        }))
        // } else {
        //     Toast.show({ text: "Please Fill Your Data First", type: 'danger' })
        // }
    }

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            <ScrollView style={styles.Container}>
                {productLoading && <Spinner size='large' color='#F47421' />}
                {/* <Text onPress={() => chooseImage()}>pick image</Text> */}
                <ImagesList _images={images} _setImages={setImages} />
                {/* Salary & Description Section */}
                <InfoRow _numeric={true} _text={price ? price.toString() : ''} _tag={I18n.t('worker.profile.price')} _val={Price} _setVal={setPrice} />
                <InfoRow
                    _text={ar_description ? ar_description : `${I18n.t('worker.profile.writeDesc')}${I18n.t('arabic')}`}
                    _tag={I18n.t('worker.profile.desc') + I18n.t('arabic')}
                    _val={description}
                    _setVal={setDescription}
                />
                <InfoRow
                    _text={en_description ? en_description : `${I18n.t('worker.profile.writeDesc')}${I18n.t('english')}`}
                    _tag={I18n.t('worker.profile.desc') + I18n.t('english')}
                    _val={En_description}
                    _setVal={setEN_Description}
                />
                {/* Details Section */}
                <InfoRow
                    _tag={I18n.t('worker.profile.writeDetail')}
                    _val={_details}
                    _setVal={_setDetails}
                />
                {/* <DetailsRow _details={_details} _setDetails={_setDetails} /> */}
                {/* <FlatList
                    data={_details}
                    renderItem={({ item }) => <Text style={styles.detailText}>{item.value ? item.value : item}</Text>}
                    keyExtractor={(item, index) => index}
                /> */}
                {/* Calendar Section */}
                <Text style={styles.daysText}>{I18n.t('worker.profile.pickDay')}</Text>
                <CalendarObj
                    _markedDates={_markedDates}
                    _setmarkedDates={_setmarkedDates}
                    _days={_days}
                    _setDays={_setDays}
                />
                {loading && <Spinner size='large' color='#F47421' />}
                {!loading && <TouchableOpacity style={styles.editButton} onPress={() => _onPress()}>
                    <Text style={styles.editButtonText}>{I18n.t('worker.profile.saveWork')}</Text>
                </TouchableOpacity>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfile
