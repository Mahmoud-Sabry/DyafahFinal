import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import StarRating from 'react-native-star-rating';
import styles from './styles';
import { Icon } from 'native-base';

const Place = ({ item, navigation }) => {
    const [stars, setStars] = useState(4.5);
    const [pressed, setPressed] = useState(false)
    return (
        <TouchableOpacity style={styles.ItemContainer} onPress={() => navigation.navigate('PlaceView')} >
            <Image
                source={{ uri: item.uri }}
                // source={require('../../assets/images/worker.png')}
                style={styles.ItemImage}
            />
            <View style={styles.ItemDetails}>
                <Text style={styles.Title}>اماكن رومانسية علي البحر</Text>
                <Text style={styles.ItemDescription}>
                    مدينة تبوك المملكة العربية السعودية
                </Text>
                <View style={styles.favRatingView}>
                    <StarRating
                        reversed
                        maxStars={5}
                        starSize={25}
                        rating={stars}
                        halfStarEnabled
                        disabled={false}
                        starStyle={styles.starsStyle}
                        containerStyle={styles.starsContainer}
                        selectedStar={(rating) => setStars(rating)}
                    />
                    <TouchableOpacity style={styles.heartButton} onPress={() => setPressed(!pressed)}>
                        <Icon type='AntDesign' name='heart' style={[styles.heartIcon, { color: pressed ? '#F7901F' : '#ffffff' }]} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.itemSalary}>السعر 2000 ريال سعودي</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Place
