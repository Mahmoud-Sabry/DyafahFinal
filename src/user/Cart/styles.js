import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    ListStyle: {
        flex: 2.5,
    },
    cartInfo: {
        flex: .55,
        backgroundColor: '#ffffff'
    },
    cartCost: {
        width: width * .9,
        alignSelf: 'center',
        backgroundColor: 'rgba(246, 244, 241, 1)'
    },
    salaryView: {
        width: width - 40,
        alignSelf: 'center',
        backgroundColor: '#F6F4F1',
        borderRadius: 20,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    salaryRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    salaryText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#64615E',
        width: 110,
        textAlign: 'right',
    },
    priceText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 20,
        color: '#64615E',
        width: 80,
        textAlign: 'right',
        marginHorizontal: 20
    },
    totalText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        color: '#64615E',
        width: 120,
        textAlign: 'right',
    },
    totalPrice: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        color: '#64615E',
        width: 80,
        textAlign: 'right',
        marginHorizontal: 10
    },
    buyButton: {
        width: width * .5,
        marginHorizontal: width * .25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 15,
        padding: 0
    },
    infoRow:{
        flexDirection: 'row-reverse',
        height: 30,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    infoTitle: {
        flex: 2,
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#64615E',
        textAlign: 'right',
    },
    infoCost: {
        flex: 2,
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#64615E',
        textAlign: 'center',
    },
    infoTag: {
        flex: 2,
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#64615E',
        textAlign: 'center',
    },
    infoList:{
        width: width * .91,
        height: 150,
        justifyContent: 'center',
        backgroundColor: 'rgba(246, 244, 241, .63)',
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 5,
    },
    infoTotalTitle: {
        flex: 2,
        fontFamily: 'Cairo-Bold',
        fontSize: 17,
        color: '#64615E',
        textAlign: 'right',
    },
    infoTotalCost: {
        flex: 2,
        fontFamily: 'Cairo-Bold',
        fontSize: 17,
        color: '#64615E',
        textAlign: 'center',
    },
    infoTotalTag: {
        flex: 2,
        fontFamily: 'Cairo-Bold',
        fontSize: 17,
        color: '#64615E',
        textAlign: 'center',
    },
    notFoundText: {
        fontFamily: 'Cairo-semiBold',
        alignSelf: 'center',
        fontSize: 30,
        color: '#64615E'
    },
})

export default styles