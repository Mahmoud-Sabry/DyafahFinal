import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import ProgressLine from '../../custom/ProgressLine';
import Question from '../../custom/Question';
import Header from '../../custom/header';
import styles from './styles';
import ColoredButton from '../../custom/ColoredButton';
import { useSelector, useDispatch } from 'react-redux';
import { getChefWorkers, getCoffeeWorkers } from '../../Redux/Slices/User/home';
import I18n from '../../languages/I18n'

const WorkHelper = (props) => {
    const lang = useSelector(({ language }) => language.language)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const dispatch = useDispatch()
    const chefs = useSelector(({ home }) => home.chefs)
    const coffees = useSelector(({ home }) => home.coffees)
    chefs.length == 0 ? dispatch(getChefWorkers({ api_token })) : null
    coffees.length == 0 ? dispatch(getCoffeeWorkers({ api_token })) : null
    const det = {
        checked: false,
        color: '#64615E',
        disabled: false,
        flexDirection: 'row-reverse',
        size: 5,
    }
    const detChecked = {
        checked: true,
        color: '#64615E',
        disabled: false,
        flexDirection: 'row-reverse',
        size: 5,
    }
    const [Q1, setQ1] = useState([{
        label: 'workerHelper.times.half',
        value: 'نصف يوم',
        ...detChecked
    }, {
        label: 'workerHelper.times.day',
        value: 'يوم كامل',
        ...det
    }, {
        label: 'workerHelper.times.two',
        value: 'يومين',
        ...det
    }, {
        label: 'workerHelper.times.more',
        value: 'اخري',
        ...det
    }]);
    const [Q2val, setQ2val] = useState('coffee')
    const [Q2, setQ2] = useState([{
        label: 'workerHelper.workers.cofee',
        value: 'coffee',
        ...detChecked
    }, {
        label: 'workerHelper.workers.chef',
        value: 'chef',
        ...det
    }, {
        label: 'workerHelper.workers.both',
        value: 'both',
        ...det
    }]);
    const [Q3, setQ3] = useState([{
        label: 'workerHelper.quantities.one',
        value: 'عامل واحد',
        ...detChecked
    }, {
        label: 'workerHelper.quantities.two',
        value: 'عاملين',
        ...det
    }, {
        label: 'workerHelper.quantities.more',
        value: 'اخري',
        ...det
    }]);

    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            <ScrollView style={styles.container}>
                <Text style={styles.pageTitle}>{I18n.t('workerHelper.title')}</Text>
                <Question data={Q1} set={setQ1} title={I18n.t('workerHelper.howLong')} />
                <Question value={Q2val} setVal={setQ2val} data={Q2} set={setQ2} title={I18n.t('workerHelper.worker')} />
                <Question data={Q3} set={setQ3} title={I18n.t('workerHelper.quantity')} />
                <View style={styles.buttons}>
                    <ColoredButton
                        ContStyle={styles.button}
                        title={I18n.t('workerHelper.skip')}
                        OnPress={() => props.navigation.navigate('Workers', { type: 'both' })}
                    />
                    <ColoredButton
                        ContStyle={styles.button}
                        title={I18n.t('workerHelper.done')}
                        OnPress={() => props.navigation.navigate('Workers', { type: Q2val })}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default WorkHelper
