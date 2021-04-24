import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, Modal } from 'react-native'
import styles from './styles';
import Header from '../../custom/header';
import ColoredButton from '../../custom/ColoredButton';
import { Icon, Spinner } from 'native-base';
import I18n from '../../languages/I18n';
import ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
// import { changeUserPhoto } from '../../Redux/Slices/User/home';
import { dyafah } from '../../assets/consts';
import { getProfile, updateProfile } from '../../Redux/Slices/Main/appUser';
import ChangePasswordPopup from '../../custom/ChangePasswordPopup';
import PhotoPopup from '../../custom/PhotoPopup';

const TextInfo = ({ text, edit, val, setVal }) => {
    return (
        <View style={styles.textInfoView}>
            <TextInput
                placeholder={text}
                placeholderTextColor='#64615E'
                editable={edit}
                value={val}
                onChangeText={(newText) => setVal(newText)}
                style={styles.textInfoStyle}
            />
        </View>
    )
}

const WalletView = ({ _wallet }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row' : 'row-reverse' }
    return (
        <View style={[styles.walletView, langView]}>
            <Text style={styles.walletText}>{_wallet} {I18n.t('profile.sar')}</Text>
            <View style={styles.walletLine}></View>
            <Text style={styles.walletText}>{I18n.t('profile.wallet')}</Text>
        </View>
    )
}

const ProfileDetails = () => {
    const lang = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const profile = useSelector(({ appUser }) => appUser.profile)

    console.log('profile: ', profile)
    const photoLoading = useSelector(({ home }) => home.photoLoading)
    const { image, cover, address, email, username, phone, wallet } = profile ?
        profile : [null, null, null, '', '', '', '', '', 0]
    const [editProfile, setEditProfile] = useState(false)
    const [userImage, setImage] = useState(image ? { uri: `${dyafah}${image}` } : require('../../assets/images/logo.png'))
    const [userCover, setCover] = useState(cover ? { uri: `${dyafah}${cover}` } : require('../../assets/images/logo.png'))
    const [Username, setUsername] = useState(username)
    const [Email, setEmail] = useState(email)
    const [Phone, setPhone] = useState(phone)
    const [modalVisible, setModalVisible] = useState(false)
    const [photoPopup, setPhotoPopup] = useState(false)
    const [image_type, setImage_type] = useState('')
    const [Address, setAddress] = useState(address)
    const dispatch = useDispatch()
    !profile && api_token ? dispatch(getProfile({ api_token })) : null
    // const chooseImage = () => {
    //     let options = {
    //         title: 'Select Image',
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //         mediaType: 'photo',
    //         noData: true
    //     };
    //     ImagePicker.launchImageLibrary(options, (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             dispatch(changeUserPhoto({ api_token, image: response }))
    //             api_token ? setImage({ uri: response.uri }) : null
    //         }
    //     });
    // }

    const _onSave = () => {
        if (Username != username || Email != email || Phone != phone) {
            dispatch(updateProfile({ api_token, Username, Email, Phone, Address }))
        }
        setEditProfile(false)
    }

    const _showPhotoPopup = (Type) => {
        setImage_type(Type)
        setPhotoPopup(true)
    }

    return (
        <ScrollView>
            <View style={styles.imagesView}>
                {photoLoading && <Spinner size='large' color='#F47421' style={styles.imageCover} />}
                {!photoLoading && <Image
                    defaultSource={require('../../assets/images/logo.png')}
                    source={userCover}
                    style={styles.imageCover}
                />}
                {editProfile && !photoLoading &&
                    <TouchableOpacity style={styles.coverEditIcon} onPress={() => _showPhotoPopup('cover')}>
                        <Icon type='FontAwesome5' name='user-edit' style={styles.icon} />
                    </TouchableOpacity>}
                {photoLoading && <Spinner size='large' color='#F47421' />}
                {!photoLoading && <Image
                    source={userImage}
                    style={styles.imageProfile}
                />}
                {editProfile && !photoLoading &&
                    <TouchableOpacity style={styles.iconView} onPress={() => _showPhotoPopup('photo')}>
                        <Icon type='FontAwesome5' name='user-edit' style={styles.icon} />
                    </TouchableOpacity>}
            </View>
            <WalletView _wallet={wallet} />
            <TextInfo edit={editProfile} val={Username} setVal={setUsername} />
            <TextInfo edit={editProfile} val={Email} setVal={setEmail} />
            <TextInfo edit={editProfile} val={Phone} setVal={setPhone} />
            <TextInfo edit={editProfile} val={Address} setVal={setAddress} />
            {!photoLoading && <ColoredButton
                title={I18n.t('userAuth.changePass')} //
                ContStyle={styles.editButton}
                TextStyle={styles.editButtonText}
                OnPress={() => setModalVisible(true)} //
            />}
            {!editProfile && !photoLoading && <ColoredButton
                title={I18n.t('profile.edit')}
                ContStyle={styles.editButton}
                TextStyle={styles.editButtonText}
                OnPress={() => setEditProfile(true)}
            />}
            {editProfile && !photoLoading && <ColoredButton
                title={I18n.t('profile.save')}
                ContStyle={styles.editButton}
                TextStyle={styles.editButtonText}
                OnPress={() => _onSave()}
            />}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                onRequestClose={() => setModalVisible(false)}>
                <ChangePasswordPopup OnPress={setModalVisible} />
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={photoPopup}
                onDismiss={() => setPhotoPopup(false)}
                onRequestClose={() => setPhotoPopup(false)}>
                <PhotoPopup
                    OnPress={setPhotoPopup}
                    setCover={setCover}
                    setImage={setImage}
                    imageType={image_type}
                />
            </Modal>
        </ScrollView>
    )
}

const UserProfile = (props) => {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const profile = useSelector(({ appUser }) => appUser.profile)
    const gettingProfile = useSelector(({ appUser }) => appUser.gettingProfile)
    !profile && api_token ? dispatch(getProfile({ api_token })) : null

    console.log('profile: ', profile)
    console.log('api_token: ', api_token)
    console.log('gettingProfile: ', gettingProfile)

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            {!api_token && <Text style={styles.authText}>{I18n.t('profile.auth')}</Text>}
            {gettingProfile && <Spinner size='large' color='#F47421' />}
            {profile && <ProfileDetails />}
        </SafeAreaView>
    )
}

export default UserProfile
