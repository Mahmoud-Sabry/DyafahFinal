import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles';
import { RadioGroup, RadioButton } from 'react-native-btr';
import I18n from '../../languages/I18n';
import { useSelector } from 'react-redux'
import { Icon } from 'native-base';


const RenderItem = ({ item, _onPress }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <TouchableOpacity style={[styles.radioButton, langView]} onPress={() => _onPress()}>
            <Icon type='FontAwesome'
                name={item.checked ? 'dot-circle-o' : 'circle-o'}
                color='#64615E' style={styles.radioIcon}
            />
            <Text style={[styles.radioLabels, langText]}>{I18n.t(`${item.label}`)}</Text>
        </TouchableOpacity>
    )
}

const Payment = ({ _setPayment }) => {
    const lang = useSelector(({ language }) => language.language)

    const [radioButtons, setButtons] = useState([{
        label: 'product.paymentLabels.cash',
        value: 'cash',
        checked: true,
    }, {
        label: 'product.paymentLabels.master',
        value: 'mastercard',
        checked: false,
    }, {
        label: 'product.paymentLabels.visa',
        value: 'visa',
        checked: false,
    }, {
        label: 'product.paymentLabels.pay',
        value: 'pay',
        checked: false,
    }])
    const [choosenMethod, setChoosenMethod] = useState(false)
    const _onRadioPressed = (val) => {
        _setPayment(val)
        let rbs = []
        radioButtons.forEach((item) => {
            item.value == val ? rbs.push({ ...item, checked: true }) : rbs.push({ ...item, checked: false })
            item.value == val ? setChoosenMethod(val) : null
        })
        setButtons(rbs)
    }

    return (
        <View>
            <Text style={[styles.itemInfoTitle, { textAlign: lang == 'ar' ? 'right' : 'left' }]} >
                {I18n.t('product.choosePayment')}
            </Text >
            <FlatList
                key={'PaymentMethodsList'}
                data={radioButtons}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <RenderItem item={item} _onPress={() => _onRadioPressed(item.value)} />}
            />
        </View>
    )
}

export default Payment
