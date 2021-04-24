import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Icon } from 'native-base';
import styles from './styles'
import PlacesAds from '../../custom/Ads';
import Header from '../../custom/header';
import ColoredButton from '../../custom/ColoredButton';
import BorderdButton from '../../custom/BorderdButton';

const PlaceView = (props) => {

    const [pressed, setPressed] = useState(false);
    const [stars, setStars] = useState(3.5);
    const [DataSource, setData] = useState([
        { url: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg' },
        { url: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg' },
        { url: 'https://images.pexels.com/photos/2108709/pexels-photo-2108709.jpeg' },
        { url: 'https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg' },
        { url: 'https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg' },
        { url: 'https://images.pexels.com/photos/1082316/pexels-photo-1082316.jpeg' },
    ])
    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            <Text style={styles.itemTitle}>old Version Code</Text>
            {/* <PlacesAds DataSource={DataSource} /> */}
            {/* <ScrollView style={styles.ScrollContainer} >
                <View style={styles.favTitleView}>
                    <View>
                        <Text style={styles.itemDescription}>مدينة تبوك المملكة العربية السعودية</Text>
                    </View>
                    <TouchableOpacity style={styles.heartButton} onPress={() => setPressed(!pressed)}>
                        <Icon type='AntDesign' name='heart' style={[styles.heartIcon, { color: pressed ? '#F7901F' : '#ffffff' }]} />
                    </TouchableOpacity>
                </View>
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
                <Text style={styles.itemInfoTitle}>معلومات خاصة</Text>
                <Text style={styles.textRow}>تسيطر الرمال والصحاري ولذلك وجد سكان المنطقة هواية ممتعة في هذه الصحاريتسيطر الرمال والصحاري ولذلك وجد سكان المنطقة هواية ممتعة في هذه الصح</Text>
                <Text style={styles.itemSalary}>السعر 2000 ريال سعودي</Text>
                <View style={styles.rowView}>
                    <Icon type='Octicons' name='primitive-dot' style={styles.icon} />
                    <Text style={styles.textRow}>جميع الحجوزات لدينا حجوزات مسبقة</Text>
                </View>
                <View style={styles.rowView}>
                    <Icon type='Octicons' name='primitive-dot' style={styles.icon} />
                    <Text style={styles.textRow}>الدفع</Text>
                </View>
                <View style={styles.rowView}>
                    <Icon type='Octicons' name='primitive-dot' style={styles.icon} />
                    <Text style={styles.textRow}>لا رسوم على التعديل</Text>
                </View>
                <View style={styles.rowButtonsView}>
                    <BorderdButton
                        title='اراء الزبائن السابقين'
                        OnPress={() => props.navigation.navigate('Comments', { rates: [] })}
                    />
                    <ColoredButton
                        title='اختار التاريخ '
                        OnPress={() => props.navigation.navigate('ChooseDate', { type: 'place' })}
                    />
                </View>
            </ScrollView> */}
        </SafeAreaView>
    )
}

export default PlaceView
