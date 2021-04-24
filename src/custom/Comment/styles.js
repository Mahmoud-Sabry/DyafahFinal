import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    CommentContainer: {
        width: width * .9,
        marginHorizontal: width * .05,
        marginTop: 20,
        padding: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#707070',
        backgroundColor: '#ffffff',
    },
    starsStyle: {
        margin: 0,
        color: '#F7901F'
    },
    starsContainer: {
        width: 110,
        alignSelf: 'center',
    },
    commentText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 17,
        color: '#64615E',
        textAlign: 'center'
    }
})

export default styles