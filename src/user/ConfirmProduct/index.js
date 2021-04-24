import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Icon } from 'native-base';
import styles from './styles'
import PlacesAds from '../../custom/Ads';
import Header from '../../custom/header';
import ColoredButton from '../../custom/ColoredButton';
import Payment from '../../custom/PaymentMethods';
import I18n from '../../languages/I18n';
import { useSelector } from 'react-redux';

const ConfirmProduct = (props) => {
    const [stars, setStars] = useState(3.5);
    const Lang = useSelector(({ language }) => language.language)
    const itemInfoTitle = Lang == 'ar' ? styles.itemInfoTitle : [styles.itemInfoTitle, { textAlign: 'left' }]
    const rowView = Lang == 'ar' ? styles.rowView : [styles.rowView, { flexDirection: 'row' }]
    const itemSalary = Lang == 'ar' ? styles.itemSalary : [styles.itemSalary, { textAlign: 'left' }]

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            <PlacesAds />
            <ScrollView style={styles.ScrollContainer} >
                <View>
                    <Text style={styles.itemTitle}>سيارة 4x4 رباعية الدفع</Text>
                    <Text style={styles.itemDescription}>مدينة حفر الباطن المملكة العربية السعودية</Text>
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
                <Text style={itemInfoTitle}>{I18n.t('product.resDate')}</Text>
                <View style={[styles.rowButtonsView, { flexDirection: Lang == 'ar' ? 'row-reverse' : 'row' }]} >
                    <View style={styles.choosenDate} >
                        <Text style={styles.dateText}>2020 / 4 / 13</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ChooseDate', { type: 'car' })}>
                        <Icon type='MaterialCommunityIcons' name='square-edit-outline' style={styles.editIcon} />
                    </TouchableOpacity>
                </View>
                <Payment Lang={Lang} />
                <Text style={itemSalary}>{I18n.t('cart.cost')} 2000 {I18n.t('cart.sar')}</Text>
                <View style={rowView}>
                    <Icon type='Octicons' name='primitive-dot' style={styles.icon} />
                    <Text style={styles.textRow}>{I18n.t('statments.stat1')}</Text>
                </View>
                <View style={rowView}>
                    <Icon type='Octicons' name='primitive-dot' style={styles.icon} />
                    <Text style={styles.textRow}>{I18n.t('statments.stat2')}</Text>
                </View>
                <View style={rowView}>
                    <Icon type='Octicons' name='primitive-dot' style={styles.icon} />
                    <Text style={styles.textRow}>{I18n.t('statments.stat3')}</Text>
                </View>
                <ColoredButton
                    ContStyle={styles.buttonStyle}
                    title={I18n.t('product.confirm')}
                    OnPress={() => props.navigation.navigate('UserInfo')}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ConfirmProduct
