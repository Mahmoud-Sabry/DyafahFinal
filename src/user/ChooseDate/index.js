import React, { useState } from 'react'
import { SafeAreaView, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../custom/header';
import DateItem from '../../custom/DateItem';
import ColoredButton from '../../custom/ColoredButton';
import I18n from '../../languages/I18n';
import { useSelector, useDispatch } from 'react-redux';
import ShowToast from '../../custom/Toast';
import { updateDates } from '../../Redux/Slices/User/home';
import { Spinner, View } from 'native-base';

const ChooseDate = (props) => {
    const lang = useSelector(({ language }) => language.language)
    const dates = useSelector(({ home }) => home.dates)
    const choosenDate = useSelector(({ home }) => home.choosenDate)
    const datesLoading = useSelector(({ home }) => home.datesLoading)
    const dispatch = useDispatch()
    const { type } = props.route.params ? props.route.params : ''
    let Goto = '';
    if (type == 'worker')
        Goto = 'ConfirmWorker'
    else if (type == 'car')
        Goto = 'ConfirmProduct'
    else if (type == 'place')
        Goto = 'ConfirmPlace'

    console.log('Choose Date dates : ', dates)
    const _onDayPress = (index) => {
        dispatch(updateDates({ index }))
    }

    const _onPickPressed = () => {
        if (choosenDate) {
            props.navigation.navigate(Goto, { date: choosenDate })
        } else ShowToast(I18n.t('pickDay'), 'warning')
    }

    return (
        <SafeAreaView style={styles.container}  >
            <Header props={props} />
            {datesLoading && <View style={styles.ListStyle}><Spinner size='large' color='#F47421' /></View>}
            {!datesLoading && <FlatList
                data={dates ? dates : []}
                style={styles.ListStyle}
                renderItem={({ item, index }) => <DateItem item={item} _onDayPress={() => _onDayPress(index)} />}
                keyExtractor={item => item.day}
                showsVerticalScrollIndicator={false}
            />}
            <ColoredButton
                title={I18n.t('product.date')}
                ContStyle={{ alignSelf: 'center', margin: 5 }}
                OnPress={() => _onPickPressed()}
            />
        </SafeAreaView>
    )
}

export default ChooseDate
