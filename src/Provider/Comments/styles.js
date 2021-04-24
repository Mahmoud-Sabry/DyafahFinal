import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    ListStyle: {
        flex: 1,
        marginVertical: 10,
    },
    notFoundText: {
        fontFamily: 'Cairo-semiBold',
        fontSize: 30,
        color: '#F7921F',
        alignSelf: 'center',
        marginVertical: 20,
    },
    ///////////////////////////////////////
    rateView: {
        flexDirection: 'row-reverse',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 15,
        borderColor: '#64615E',
        borderWidth: 1,
        minHeight: 50,
        // padding: 3,
    },
    rateImage: {
        width: width * .35,
        minHeight: width * .3,
        borderRadius: 15,
    },
    rateDetails: {
        flex: 1,
        marginHorizontal: 8,
        justifyContent: 'center'
    },
    rateText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        color: '#707070',
        textAlign: 'right'
    },
    starsStyle: {
        margin: 2,
        color: '#F7901F'
    },
    starsContainer: {
        width: 110,
    },
})

export default styles