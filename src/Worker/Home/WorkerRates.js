import React, { useState } from 'react'
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import styles from './styles'
import * as Progress from 'react-native-progress';
import { Icon } from 'native-base';
const { width, height } = Dimensions.get('screen')
import { useSelector } from 'react-redux'
import I18n from '../../languages/I18n';


const WorkerRatesInfo = ({ _count }) => {
    return (
        <View style={styles.progressView}>
            <Icon type='Entypo' name='star' style={styles.progressIcon} />
            <Text style={styles.progressText}>{_count}</Text>
            <Text style={styles.progressLabel}>{I18n.t('worker.home.from')} 5</Text>
        </View>
    )
}

const StarCount = ({ item, lang }) => {
    let percent = .5 * (item.count / 10)  // 100 is the max value
    return (
        <View style={[styles.starCountView, { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }]}>
            <Text style={styles.starLabel}>{item.id} {I18n.t('worker.home.star')}</Text>
            <View style={[styles.countBarView, { width: width * percent }]} />
            <Text style={styles.starLabel}>{item.count}</Text>
        </View>
    )
}


const WorkerRates = ({ OnPress }) => {
    const home = useSelector(({ worker }) => worker.home)
    const lang = useSelector(({ language }) => language.language)
    let starsArr = [
        { id: 1, count: home.rate1 },
        { id: 2, count: home.rate2 },
        { id: 3, count: home.rate3 },
        { id: 4, count: home.rate4 },
        { id: 5, count: home.rate5 }
    ]
    renderitem = ({ item }) => {
        return (
            <StarCount item={item} lang={lang} />
        )
    }
    return (
        <TouchableOpacity
            style={styles.ratesView}
            onPress={() => OnPress ? OnPress() : null}
        >
            <Progress.Circle
                size={200}
                progress={(home.rate / 5).toFixed(2)}
                thickness={7}
                color='#F7921F'
                unfilledColor='#D6CFC8'
                borderWidth={0}
            />
            <WorkerRatesInfo _count={home.rate} />
            <Text style={styles.ratesCountText}>{I18n.t('worker.home.uHave')} {home.count_rate} {I18n.t('worker.home.rate')}</Text>
            <FlatList
                data={starsArr}
                keyExtractor={(item, index) => item.id}
                renderItem={(item) => renderitem(item)}
            />
        </TouchableOpacity>
    )
}

export default WorkerRates
