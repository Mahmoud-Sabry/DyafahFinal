import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    popView: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    messageContainer: {
        width: width * .8,
        height: 300, //width * .8,
        backgroundColor: '#F58620',
        borderRadius: 20,
        marginHorizontal: width * .1,
        marginVertical: height * .5 - 150, //(width * .4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmTitle: {
        fontFamily: 'Cairo-Bold',
        fontSize: 25,
        color: '#ffffff',
        textAlign: 'center',
    },
    reviewText: {
        fontFamily: 'Cairo-semiBold',
        fontSize: 25,
        color: '#ffffff',
        textAlign: 'center',
        marginVertical: 15,
    },
    textInfoView: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 20,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'rgba(112, 112, 112, .25)',
        marginVertical: 10,
    },
    textInfoStyle: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#64615E',
        width: width * .65,
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 25,
    },
    changeButton: {
        marginTop: 20,
        borderWidth: 0,
        borderRadius: 12,
        paddingHorizontal: 10,
    }
})

export default styles