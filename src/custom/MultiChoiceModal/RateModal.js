import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'
import StarRating from 'react-native-star-rating'
import { useSelector } from 'react-redux'
import { Spinner } from 'native-base'
import I18n from '../../languages/I18n'

const RateModal = ({ OnPress, _onRate, _id }) => {
    const lang = useSelector(({ language }) => language.language)
    const ratingProduct = useSelector(({ appUser }) => appUser.ratingProduct)
    const addingComment = useSelector(({ appUser }) => appUser.addingComment)
    const [rate, setRate] = useState(0)
    const [comment, setComment] = useState('')

    const _close = () => {
        OnPress(false)
        setRate(0)
        setComment('')
    }

    const _onStarPress = (rate) => {
        setRate(rate)
        _onRate(_id, rate, comment)
    }

    const _onRatePress = () => {
        _onRate(_id, rate, comment)
        _close()
    }

    return (
        <View style={styles.popView}>
            <TouchableOpacity style={styles.messageContainer} onPress={() => _close()}>
                <StarRating
                    reversed={lang == 'ar'}
                    maxStars={5}
                    starSize={35}
                    rating={rate}
                    halfStarEnabled
                    disabled={false}
                    starStyle={styles.starsStyle}
                    containerStyle={styles.starsContainer}
                    selectedStar={(rating) => _onStarPress(rating)}
                />
                <TextInput
                    placeholder={I18n.t('product.addComment')}
                    placeholderTextColor='#F58620'
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                    style={styles.commentText}
                    multiline={true}
                    textAlignVertical='center'
                />
                {(!ratingProduct || !addingComment) && <TouchableOpacity style={styles.rateButton} onPress={() => _onRatePress()}>
                    <Text style={styles.buttonText}>{I18n.t('product.evaluate')}</Text>
                </TouchableOpacity>}
                {(ratingProduct || addingComment) && <Spinner size='large' color='#ffffff' />}
            </TouchableOpacity>
        </View>
    )
}

export default RateModal