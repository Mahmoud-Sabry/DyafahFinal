import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Icon } from 'native-base';
import styles from './styles'
import PlacesAds from '../../custom/Ads';
import Header from '../../custom/header';
import ColoredButton from '../../custom/ColoredButton';
import BorderdButton from '../../custom/BorderdButton';
import I18n from '../../languages/I18n';
import { useSelector } from 'react-redux'

const Product = (props) => {
    const Lang = useSelector(({ language }) => language.language)
    const [pressed, setPressed] = useState(false);
    const [stars, setStars] = useState(3.5);

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            <Text style={styles.itemTitle}>old Version Code</Text>
            {/* <PlacesAds /> */}
            {/* <ScrollView style={styles.ScrollContainer} >
                <View style={styles.favTitleView}>
                    <View>
                        <Text style={styles.itemDescription}>مدينة حفر الباطن المملكة العربية السعودية</Text>
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
                <Text style={styles.itemDescription}>تسيطر الرمال والصحاري ولذلك وجد سكان المنطقة هواية ممتعة في هذه الصحاري تخرج السيارة بالإضافة الي عامل للشاي</Text>
                <Text style={styles.itemDescription}>4 أبواب بالسيارة</Text>
                <Text style={styles.itemDescription}>1 شنطة كبيرة</Text>
                <Text style={styles.itemDescription}>1 شنطة صغيرة</Text>
                <Text style={styles.itemDescription}>مزودة بمكيف هواء</Text>
                <Text style={styles.itemDescription}>2 عامل للطبخ</Text>
                <Text style={styles.itemDescription}>1 عامل للشاي</Text>
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
                        title={I18n.t('product.reviews')}
                        OnPress={() => props.navigation.navigate('Comments', { rates: [] })}
                    />
                    <ColoredButton
                        title={I18n.t('product.reservation')}
                        OnPress={() => props.navigation.navigate('ChooseDate', { type: 'car' })}
                    />
                </View>
            </ScrollView> */}
        </SafeAreaView>
    )
}

export default Product
