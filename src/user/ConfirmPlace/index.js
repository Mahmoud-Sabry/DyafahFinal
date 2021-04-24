import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Icon } from 'native-base';
import styles from './styles'
import PlacesAds from '../../custom/Ads';
import Header from '../../custom/header';
import ColoredButton from '../../custom/ColoredButton';
import Payment from '../../custom/PaymentMethods';

const ConfirmPlace = (props) => {
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
            <PlacesAds DataSource={DataSource} />
            <ScrollView style={styles.ScrollContainer} showsVerticalScrollIndicator={false} >
                <View>
                    <Text style={styles.itemTitle}>اماكن رومانسية علي البحر</Text>
                    <Text style={styles.itemDescription}>مدينة تبوك المملكة العربية السعودية</Text>
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

                <Text style={styles.itemInfoTitle}>التاريخ المختار</Text>
                <View style={styles.rowButtonsView} >
                    <View style={styles.choosenDate} >
                        <Text style={styles.dateText}>2020 / 4 / 13</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ChooseDate', { type: 'place' })}>
                        <Icon type='MaterialCommunityIcons' name='square-edit-outline' style={styles.editIcon} />
                    </TouchableOpacity>
                </View>
                <Payment />
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
                <ColoredButton
                    ContStyle={styles.buttonStyle}
                    title='تأكيد الحجز'
                    OnPress={() => props.navigation.navigate('UserInfo')}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ConfirmPlace
