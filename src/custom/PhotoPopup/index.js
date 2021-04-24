import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import I18n from '../../languages/I18n'
import { useDispatch, useSelector } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import { changeCover, changeUserPhoto, deleteCover } from '../../Redux/Slices/User/home'
import { changePhoto } from '../../Redux/Slices/Auth/auth'

const PhotoPopup = ({ OnPress, setCover, setImage, imageType }) => {
    const dispatch = useDispatch()
    const { api_token, role } = useSelector(({ appUser }) => appUser.appUser)
    // console.log("role: ", role)
    const _onEdit = () => {
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
                if (imageType == 'cover') {
                    dispatch(changeCover({ api_token, image: response }))
                    api_token && setCover ? setCover({ uri: response.uri }) : null
                } else if (imageType == 'photo') {
                    role != 'user' ? dispatch(changePhoto({ api_token, image: response })) :
                        dispatch(changeUserPhoto({ api_token, image: response }))
                    api_token && setImage ? setImage({ uri: response.uri }) : null
                }
            }
        })
    }

    const _onDelete = () => {
        dispatch(deleteCover({ api_token, type_image: imageType, role }))
        if (imageType == 'cover') {
            setCover ? setCover(require('../../assets/images/logo.png')) : null
        } else if (imageType == 'photo') {
            setImage ? setImage(require('../../assets/images/logo.png')) : null
        }
        OnPress(false)
    }

    return (
        <View style={styles.popView}>
            <TouchableOpacity style={styles.messageContainer} onPress={() => OnPress(false)}>
                <TouchableOpacity onPress={() => _onEdit()}>
                    <Text style={styles.confirmTitle}>{I18n.t('provider.products.edit')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => _onDelete()}>
                    <Text style={styles.confirmTitle}>{I18n.t('provider.products.delete')}</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

export default PhotoPopup