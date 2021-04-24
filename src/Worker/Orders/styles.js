import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    // Canceled Comp
    ListStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
        // paddingVertical: 20,
    },
    orderContainer: {
        width: width * .95,
        alignSelf: 'center',
        borderColor: '#707070',
        borderWidth: 1,
        marginVertical: 10,
        flexDirection: 'row-reverse',
        borderRadius: 15,
        paddingVertical: 10,
    },
    orderDetails: {
        width: width * .59 - 2,
    },
    orderLocation: {
        width: width * .35,
        borderRadius: width * .175,
        height: width * .35,
    },
    orderInfoRow: {
        flexDirection: 'row-reverse',
        marginTop: 5,
        justifyContent: 'space-around'
    },
    orderInfoText: {
        fontFamily: 'Cairo-semiBold',
        fontSize: 15,
        // width: width * .25,
        textAlign: 'right',
        color: '#000000',
        marginHorizontal: 10,
    },
    orderDetailText: {
        fontFamily: 'Cairo-semiBold',
        fontSize: 15,
        width: width * .35,
        textAlign: 'center',
        color: '#000000',
    },
    //  Finished Comp
    starsStyle: {
        margin: 0,
        color: '#F7901F'
    },
    starsContainer: {
        width: 80,
        alignSelf: 'center',
        marginHorizontal: width * .2 - 48,
    },
    notFoundText: {
        fontFamily: 'Cairo-semiBold',
        fontSize: 30,
        marginVertical: 20,
        textAlign: 'center',
        color: '#707070',
    },
    /////////// Button Style /////////
    button: {
        // width: 75,
        minWidth: 75,
        height: 35,
        borderRadius: 5,
        backgroundColor: '#07A456',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    buttonText: {
        fontFamily: 'Cairo-semiBold',
        fontSize: 15,
        textAlign: 'center',
        color: '#ffffff',
    }
})

export default styles