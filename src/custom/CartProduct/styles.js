import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        width: width * .9,
        minHeight: 100,
        paddingVertical: 5,
        borderRadius: 10,
        borderColor: 'rgba(112, 112, 112, 1)',
        borderWidth: 1,
        marginTop: 15,
    },
    productImage: {
        width: width * .32,
        height: 145,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: 5,
    },
    productInfoView: {
        width: width * .5,
        alignItems: 'center',
    },
    productName: {
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: 'rgba(100, 97, 94, 1)',
        textAlign: 'center',
    },
    productCost: {
        fontFamily: 'Cairo-Regular',
        fontSize: 17,
        color: 'rgba(100, 97, 94, 1)',
        textAlign: 'center',
    },
    // counter Component
    counterContainer: {
        width: 100,
        height: 30,
        borderWidth: 1,
        borderColor: 'rgba(112, 112, 112, 1)',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    counterText: {
        width: 30,
        textAlign: 'center',
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: 'rgba(100, 97, 94, 1)',
        borderLeftColor: 'rgba(112, 112, 112, 1)',
        borderLeftWidth: 1,
        borderRightColor: 'rgba(112, 112, 112, 1)',
        borderRightWidth: 1,
    },
    counterIcon: {
        fontSize: 15,
        color: 'rgba(100, 97, 94, 1)',
        width: 30,
        textAlign: 'center'
    },
    closeIcon:{
        fontSize: 20,
        color: 'rgba(100, 97, 94, 1)',
        width: 25,
        textAlign: 'center'
    }
})

export default styles