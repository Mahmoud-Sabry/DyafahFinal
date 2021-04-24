import React from 'react'
import { FlatList } from 'react-native'
import ImagePickerButton from '../../custom/ImagePickerButton'
import styles from './styles';
import ImagePicker from 'react-native-image-picker';

const ImagesList = ({ _images, _setImages, _onPress }) => {
    console.log("ImagesList: ", _images)

    const chooseImage = (index) => {
        console.log("Choose Image: ", _images[index])
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
                // setImage(response)
                const arr = []
                _images.forEach((image, i) => {
                    if (i == index) {
                        if (image != null) {
                            arr.push({ uri: response.uri })
                        } else {
                            arr.push({ uri: response.uri })
                            arr.push(null)
                        }
                    } else {
                        arr.push(image)
                    }
                })
                _setImages(arr)
            }
        });
    }

    return (
        <FlatList
            horizontal={true}
            inverted={false}
            data={_images}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => <ImagePickerButton image={item} _onPress={() => _onPress ? _onPress() : chooseImage(index)} />}
            style={styles.listStyle}
        />
    )
}

export default ImagesList
