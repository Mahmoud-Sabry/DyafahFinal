import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { Picker } from 'native-base';
import I18n from '../../languages/I18n';
import { useDispatch, useSelector } from 'react-redux';
import { changeWorkerStatus } from '../../Redux/Slices/Worker/info';

const WorkerStatus = () => {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const { api_token, available } = useSelector(({ worker }) => worker.user)
    const _changeStatus = (status) => {
        dispatch(changeWorkerStatus({ api_token, status }))
    }

    return (
        <View style={[styles.StatusView, { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }]}>
            <Text style={styles.StatusText}>{I18n.t('worker.home.status')}</Text>
            <Picker
                mode="dropdown"
                style={{ width: 120 }}
                textStyle={styles.pickerText}
                itemStyle={styles.pickerItem}
                itemTextStyle={styles.pickerItemText}
                selectedValue={available}
                onValueChange={(value) => _changeStatus(value)}
            >
                <Picker.Item label={I18n.t('worker.home.available')} value={1} key={1} />
                <Picker.Item label={I18n.t('worker.home.notAvailable')} value={0} key={0} />
            </Picker>
        </View>
    )
}
export default WorkerStatus