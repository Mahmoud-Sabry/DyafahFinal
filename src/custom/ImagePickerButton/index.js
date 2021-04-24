import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import ImagePicker from 'react-native-image-picker';


const ImagePickerButton = ({ image, setImage, _onPress }) => {

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
                setImage(response)
            }
        });
    }
    return (
        <TouchableOpacity style={styles.productPic} onPress={() => _onPress ? _onPress() : chooseImage()}>
            {image && <Image source={{ uri: image.uri }} style={styles.productPic} defaultSource={require('../../assets/images/logo.png')}/>}
            {!image && <Icon type='FontAwesome' name='image' style={styles.productIcon} />}
        </TouchableOpacity>
    )
}

export default ImagePickerButton;