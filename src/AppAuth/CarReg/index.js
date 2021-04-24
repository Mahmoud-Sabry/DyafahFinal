import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles'
import ImagePicker from 'react-native-image-picker';
import { regCarProvider, resetRegCar } from '../../Redux/Slices/Auth/registerCar';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Toast } from 'native-base';
import I18n from '../../languages/I18n';
import ShowToast from '../../custom/Toast';
import BackButton from '../../custom/BackButton';
import PhoneCode from '../../custom/PhoneCode';

const InputField = ({ val, OnChange, text, numeric, opt, phone }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const label = opt ? I18n.t('providerAuth.mandatory') : I18n.t('providerAuth.optional')
    return (
        <View style={[styles.inputView, langView]}>
            <TextInput
                scrollEnabled={false}
                keyboardType={numeric ? 'numeric' : 'default'}
                placeholder={text}
                placeholderTextColor='#ffffff'
                value={val}
                onChangeText={(text) => OnChange ? OnChange(text) : null}
                style={styles.inputField}
                multiline={true}
            />
            {phone && <PhoneCode />}
            {!phone && <Text style={styles.labelField}>{label}</Text>}
        </View>
    )
}

const CarReg = (props) => {
    const { navigation } = props
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const label = I18n.t('providerAuth.mandatory') // : I18n.t('providerAuth.optional')
    const loading = useSelector(({ registerCar }) => registerCar.loading)
    const success = useSelector(({ registerCar }) => registerCar.success)
    const fail = useSelector(({ registerCar }) => registerCar.fail)
    const error = useSelector(({ registerCar }) => registerCar.error)
    const [name, setName] = useState('')
    const [ar_name, setAR_Name] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPass] = useState('')
    const [carType, setCarType] = useState('')
    const [carModel, setCarModel] = useState('')
    const [description, setDescription] = useState('')
    const [ar_description, setAR_Description] = useState('')
    const [plateNo, setPlateNo] = useState('')
    const [price, setPrice] = useState('')
    const [license, setLicense] = useState('')
    const [photo, setPhoto] = useState(null)

    if (success) {
        navigation.push('Login')
        dispatch(resetRegCar())
    }

    const _onPress = () => {
        console.log("Here")
        if (photo != null) {
            dispatch(regCarProvider({
                image: photo,
                name,
                ar_name,
                email,
                phone,
                password,
                carType,
                carModel,
                plateNo,
                license,
                price,
                description,
                ar_description
            }))
        } else {
            ShowToast(I18n.t('errors.notFilled'), 'warning')
        }
    }
    const chooseImage = () => {
        let options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'photo',
            noData: true
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                console.log('response', response);
                setPhoto(response)
            }
        });
    }

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.Container}>
                <View style={styles.circleView}>
                    <Text style={styles.circleText}>{I18n.t('providerAuth.carReg.carLogin')}</Text>
                </View>
                <BackButton navigation={navigation} />
                <View style={{ top: -60 }}>
                    <InputField
                        text={I18n.t('providerAuth.name') + I18n.t('arabic')}
                        val={ar_name}
                        OnChange={setAR_Name}
                        opt={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.name') + I18n.t('english')}
                        val={name}
                        OnChange={setName}
                        opt={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.email')}
                        val={email}
                        OnChange={setEmail}
                        opt={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.phone')}
                        numeric={true}
                        val={phone}
                        OnChange={setPhone}
                        opt={true}
                        phone={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.password')}
                        val={password}
                        OnChange={setPass}
                        opt={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.carReg.carType')}
                        val={carType}
                        OnChange={setCarType}
                        opt={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.carReg.carModel')}
                        val={carModel}
                        OnChange={setCarModel}
                        opt={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.carReg.carDes') + I18n.t('arabic')}
                        val={ar_description}
                        OnChange={setAR_Description}
                        opt={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.carReg.carDes') + I18n.t('english')}
                        val={description}
                        OnChange={setDescription}
                        opt={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.carReg.carNum')}
                        val={plateNo}
                        OnChange={setPlateNo}
                    />
                    <InputField
                        text={I18n.t('providerAuth.carReg.carLic')}
                        val={license}
                        OnChange={setLicense}
                    />
                    <InputField
                        text={I18n.t('providerAuth.carReg.price')}
                        numeric={true}
                        val={price}
                        OnChange={setPrice}
                        opt={true}
                    />
                    <TouchableOpacity style={[styles.pickImageButton, langView]} onPress={() => chooseImage()}  >
                        <Text style={styles.inputField}>{photo ? I18n.t('providerAuth.carReg.photoPicked') : I18n.t('providerAuth.carReg.pickPhoto')}</Text>
                        <Text style={styles.labelField}>{label}</Text>
                    </TouchableOpacity>
                    {!loading && <TouchableOpacity style={styles.regButton} onPress={() => _onPress()}>
                        <Text style={styles.regText}>{I18n.t('providerAuth.reg')}</Text>
                    </TouchableOpacity>}
                    {loading && <Spinner size='large' color='#ffffff' />}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CarReg
