import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Modal } from 'react-native'
import styles from './styles'
import { Icon, Toast, Spinner } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { changePhoto, updateProfile } from '../../Redux/Slices/Auth/auth';
import ImagePicker from 'react-native-image-picker';
import I18n from '../../languages/I18n';
import { dyafah } from '../../assets/consts';
import WorkerOffer from '../../custom/WorkerOffer';
import { getWorker } from '../../Redux/Slices/Worker/info';
import PhotoPopup from '../../custom/PhotoPopup';

const ProfileInfoRow = ({ _type, _name, _value, _setValue, _edit, _numeric, _lang }) => {
    return (
        <View style={[styles.infoRow, { flexDirection: _lang == 'ar' ? 'row-reverse' : 'row' }]}>
            <Icon type={_type} name={_name} style={styles.rowIcon} />
            <TextInput
                keyboardType={_numeric ? 'numeric' : 'default'}
                editable={_edit}
                style={[styles.infoText, { textAlign: _lang == 'ar' ? 'right' : 'left' }]}
                value={_value}
                onChangeText={(newVal) => _setValue(newVal)}
            />
        </View>
    )
}

const ProfileInfo = ({ worker, _navigate }) => {
    const updateProfileLoading = useSelector(({ auth }) => auth.updateProfileLoading)
    const lang = useSelector(({ language }) => language.language)
    const { api_token, image, ar_name, en_name, phone, email } = worker ? worker : ['', null, '', '', '']
    const [modalVisible, setModalVisible] = useState(false)
    const [ar_Name, setAR_Name] = useState(ar_name)
    const [Name, setName] = useState(en_name)
    const [Phone, setPhone] = useState(phone)
    const [Email, setEmail] = useState(email)
    const pass = '*************'
    const [url, setUrl] = useState(image ? { uri: `${dyafah}${image}` } : require('../../assets/images/logo.png'))
    const [editable, setEditable] = useState(false)
    const [photoPopup, setPhotoPopup] = useState(false)
    const [image_type, setImage_type] = useState('photo')
    const dispatch = useDispatch()

    const chooseImage = () => {
        let options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
                waitUntilSaved: true
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
                dispatch(changePhoto({ api_token, image: response }))
                setUrl(response.uri)
            }
        });
    }
    const onSavePressed = () => {
        if (ar_Name == ar_name && Name == en_name && Email == email && phone == Phone) {
            setEditable(false)
        } else {
            dispatch(updateProfile({ api_token, ar_username: ar_Name, username: Name, email: Email, phone: Phone }))
            setEditable(false)
        }
    }
    const _showPopup = () => {
        setImage_type('photo')
        setPhotoPopup(true)
    }

    return (
        <ScrollView style={styles.Container}>
            <TouchableOpacity >
                <Image
                    style={styles.profileImage}
                    source={url}
                />
                <TouchableOpacity style={styles.iconView} onPress={() => _showPopup()}>
                    <Icon type='FontAwesome5' name='user-edit' style={styles.icon} />
                </TouchableOpacity>
            </TouchableOpacity>
            <ProfileInfoRow
                _lang={lang}
                _type='AntDesign'
                _name='contacts'
                _value={ar_Name}
                _edit={editable}
                _setValue={setAR_Name}
            />
            <ProfileInfoRow
                _lang={lang}
                _type='AntDesign'
                _name='contacts'
                _value={Name}
                _edit={editable}
                _setValue={setName}
            />
            <ProfileInfoRow
                _lang={lang}
                _type='MaterialIcons'
                _name='phone-iphone'
                _numeric={true}
                _value={Phone}
                _edit={editable}
                _setValue={setPhone}
            />
            <ProfileInfoRow
                _lang={lang}
                _type='Fontisto'
                _name='email'
                _value={Email}
                _edit={editable}
                _setValue={setEmail}
            />
            <ProfileInfoRow
                _lang={lang}
                _type='Feather'
                _name='lock'
                _value={pass}
                _edit={false}
            />
            {!editable && !updateProfileLoading &&
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setEditable(true)}
                >
                    <Text style={styles.editButtonText}>{I18n.t('worker.profile.edit')} </Text>
                </TouchableOpacity>}
            {editable && !updateProfileLoading &&
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => onSavePressed(false)}
                >
                    <Text style={styles.editButtonText}>{I18n.t('worker.profile.save')} </Text>
                </TouchableOpacity>}
            {updateProfileLoading && <Spinner size='large' color='#F47421' />}
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => _navigate('EditProfile')}
            >
                <Text style={styles.editButtonText}>{I18n.t('worker.profile.editWork')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                    dispatch(getWorker({ token: api_token }))
                    setModalVisible(true)
                }}
            >
                <Text style={styles.editButtonText}>{I18n.t('provider.offers.addNew')}</Text>
            </TouchableOpacity>
            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                onRequestClose={() => setModalVisible(false)}>
                <WorkerOffer OnPress={setModalVisible} />
            </Modal>
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
