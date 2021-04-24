import React, { useState } from 'react'
import { View, ScrollView, Image, TextInput, TouchableOpacity, Text, Modal } from 'react-native'
import styles from './styles'
import { Icon, Toast, Spinner } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { changePhoto, updateProfile } from '../../Redux/Slices/Auth/auth';
import ImagePicker from 'react-native-image-picker';
import I18n from '../../languages/I18n';
import { dyafah } from '../../assets/consts';
import PhotoPopup from '../../custom/PhotoPopup';

const ProfileInfoRow = ({ _type, _name, _editable, _value, _setValue, numeric }) => {
    const lang = useSelector(({ language }) => language.language)
    return (
        <View style={[styles.infoRow, { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }]}>
            <Icon type={_type} name={_name} style={styles.rowIcon} />
            <TextInput
                keyboardType={numeric ? 'numeric' : 'default'}
                editable={_editable}
                style={[styles.infoText, { textAlign: lang == 'ar' ? 'right' : 'left' }]}
                value={_value}
                onChangeText={(newVal) => _setValue(newVal)}
            />
        </View>
    )
}

const ProfileInfo = ({ provider }) => {
    // const provider = useSelector(({ provider }) => provider.provider)
    const lang = useSelector(({ language }) => language.language)
    const updateProfileLoading = useSelector(({ auth }) => auth.updateProfileLoading)
    const [editable, setEditable] = useState(false)
    const [ar_Name, setAR_Name] = useState(provider.ar_name)
    const [Name, setName] = useState(provider.en_name)
    const [Phone, setPhone] = useState(provider.phone)
    const [Email, setEmail] = useState(provider.email)
    const [delievery, setDelievery] = useState(provider.delivery_fee.toString())
    const [pass, setPass] = useState('*************')
    const [url, setUrl] = useState(provider.image ? { uri: `${dyafah}${provider.image}` } : require('../../assets/images/logo.png'))
    const [photoPopup, setPhotoPopup] = useState(false)
    const [image_type, setImage_type] = useState('')
    const dispatch = useDispatch()
    console.log('ProfileInfo provider: ', provider)

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
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log('response', response);
                dispatch(changePhoto({ api_token: provider.api_token, image: response }))
                setUrl(response.uri)
            }
        });
    }

    const onSavePressed = () => {
        const { en_name, phone, email } = provider
        if (Name == en_name && Email == email && phone == Phone) {
            // Toast.show({ text: 'Not Changed', buttonText: 'Okay' })
            setEditable(false)
        } else {
            dispatch(updateProfile({
                api_token: provider.api_token, ar_username: ar_Name, username: Name,
                email: Email, phone: Phone
            }))
            setEditable(false)
        }
    }
    return (
        <ScrollView style={styles.Container}>
            <TouchableOpacity>
                <Image
                    style={styles.profileImage}
                    // source={require('../../assets/images/monaShop.png')}
                    source={url}
                />
                <TouchableOpacity style={styles.iconView} onPress={() => { setImage_type('photo'); setPhotoPopup(true) }}>
                    <Icon type='FontAwesome5' name='user-edit' style={styles.icon} />
                </TouchableOpacity>
            </TouchableOpacity>
            <ProfileInfoRow
                _type='AntDesign'
                _name='contacts'
                _value={ar_Name}
                _setValue={setAR_Name}
                _editable={editable}
            />
            <ProfileInfoRow
                _type='AntDesign'
                _name='contacts'
                _value={Name}
                _setValue={setName}
                _editable={editable}
            />
            <ProfileInfoRow
                _type='MaterialIcons'
                _name='phone-iphone'
                numeric={true}
                _value={Phone}
                _setValue={setPhone}
                _editable={editable}
            />
            <ProfileInfoRow
                _type='Fontisto'
                _name='email'
                _value={Email}
                _setValue={setEmail}
                _editable={editable}
            />
            <ProfileInfoRow
                _type='Feather'
                _name='lock'
                _value={pass}
                _setValue={setPass}
                _editable={false}
            />
            {/* <ProfileInfoRow
                _type='FontAwesome'
                _name='truck'
                _value={delievery}
                _setValue={setDelievery}
                _editable={editable}
            /> */}
            {!editable && !updateProfileLoading && <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditable(true)}
            >
                <Text style={styles.editButtonText}>{I18n.t('worker.profile.edit')}</Text>
            </TouchableOpacity>}
            {editable && !updateProfileLoading && <TouchableOpacity
                style={styles.editButton}
                onPress={() => onSavePressed(false)}
            >
                <Text style={styles.editButtonText}>{I18n.t('worker.profile.save')} </Text>
            </TouchableOpacity>}
            {updateProfileLoading && <Spinner size='large' color='#F47421' />}
            <Modal
                animationType="fade"
                transparent={true}
                visible={photoPopup}
                onDismiss={() => setPhotoPopup(false)}
                onRequestClose={() => setPhotoPopup(false)}>
                <PhotoPopup OnPress={setPhotoPopup} setImage={setUrl} imageType={image_type} />
            </Modal>
        </ScrollView>
    )
}

export default ProfileInfo
