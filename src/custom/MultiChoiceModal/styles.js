import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    popView: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    messageContainer: {
        width: width * .8,
        minHeight: 10, //width * .8,
        paddingVertical: 15,
        backgroundColor: '#F58620',
        borderRadius: 20,
        marginHorizontal: width * .1,
        marginVertical: height * .5 - 150, //(width * .4),
        // justifyContent: 'center',
        alignItems: 'center',
    },
    confirmTitle: {
        fontFamily: 'Cairo-Bold',
        fontSize: 22,
        color: '#ffffff',
        textAlign: 'center',
        marginVertical: 10,
    },
    reviewText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 30,
        color: '#ffffff',
        textAlign: 'center',
        marginVertical: 20,
    },
    starsStyle: {
        margin: 0,
        color: '#ffffff'
    },
    starsContainer: {
        width: 200,
        alignSelf: 'center',
        marginVertical: 15,
    },
    commentText: {
        width: width * .7,
        minHeight: 50,
        padding: 10,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 15,
        textAlign: 'center',
        backgroundColor: '#ffffff',
        color: '#F58620',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Cairo-Regular',
        fontSize: 20
    },
    rateButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 20,
        color: '#F58620',
        textAlign: 'center',
    }
})

export default styles