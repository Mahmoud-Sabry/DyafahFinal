import React, { useState } from 'react'
import { SafeAreaView, FlatList, Text } from 'react-native'
import Header from '../../custom/header';
import styles from './styles';
import Comment from '../../custom/Comment';
import I18n from '../../languages/I18n';
import { useSelector } from 'react-redux';
import { Spinner } from 'native-base';

const Comments = (props) => {
    const lang = useSelector(({ language }) => language.language)
    const reviews = useSelector(({ home }) => home.reviews)
    const reviewsLoading = useSelector(({ home }) => home.reviewsLoading)

    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            {reviewsLoading && <Spinner size='large' color='#F47421' />}
            {reviews.length == 0 && !reviewsLoading &&
                <Text style={styles.notFoundText}>{I18n.t('provider.notFound')}</Text>}
            <FlatList
                data={reviews}
                style={styles.ListStyle}
                renderItem={({ item }) => <Comment item={item} />}
                keyExtractor={item => item.comment}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default Comments
