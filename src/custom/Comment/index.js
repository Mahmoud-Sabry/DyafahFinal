import React, { useState } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import StarRating from 'react-native-star-rating'
import { useSelector } from 'react-redux'

const Comment = ({ item }) => {
    const lang = useSelector(({ language }) => language.language)
    console.log("Comment: ", item)
    const { comment, rate, created_at, user } = item
    const { ar_name, en_name, username, role } = user ? user : ['', '', '', 'user']
    const event = new Date(created_at);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const [stars, setStars] = useState(rate);
    return (
        <View style={styles.CommentContainer}>
            {role == 'provider' && <Text style={styles.commentText}>{lang == 'ar' ? ar_name : en_name}</Text>}
            {role != 'provider' && <Text style={styles.commentText}>{username}</Text>}
            <StarRating
                reversed
                maxStars={5}
                starSize={20}
                rating={stars}
                halfStarEnabled
                disabled={true}
                starStyle={styles.starsStyle}
                containerStyle={styles.starsContainer}
                selectedStar={(rating) => setStars(rating)}
            />
            <Text style={styles.commentText}>{comment}</Text>
            <Text style={styles.commentText}>{event.toLocaleDateString(lang, options)}</Text>
            {/* 'ar-EG' */}
        </View>
    )
}

export default Comment
