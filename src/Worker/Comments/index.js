import React, { useState } from 'react'
import { SafeAreaView, FlatList, Text } from 'react-native'
import Header from '../../custom/header';
import styles from './styles';
import Comment from '../../custom/Comment';
import I18n from '../../languages/I18n';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'native-base';
import { getRates } from '../../Redux/Slices/Worker/info';

const Comments = (props) => {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const ratesLoading = useSelector(({ worker }) => worker.ratesLoading)
    const rates = useSelector(({ worker }) => worker.rates)
    rates ? null : dispatch(getRates({ token: api_token }))
    const notFound = rates ? rates.length > 0 ? false : true : true

    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            {ratesLoading && <Spinner size='large' color='#F47421' />}
            {notFound && !ratesLoading && <Text style={styles.notFoundText}>{I18n.t('provider.notFound')}</Text>}
            <FlatList
                key='WorkerRatesList'
                refreshing={false}
                onRefresh={() => dispatch(getRates({ token: api_token }))}
                data={rates ? rates : []}
                style={styles.ListStyle}
                renderItem={({ item }) => <Comment item={item} />}
                keyExtractor={item => item.comment}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default Comments
