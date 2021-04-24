import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    addButton: {
        width: 150,
        height: 50,
        borderRadius: 15,
        alignSelf: 'center',
        marginVertical: 15,
        backgroundColor: '#F47421',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#ffffff',
    },
    ///////////////////////// Offer Item Comp //////////////////////////////
    productContainer: {
        flexDirection: 'row',
        width: width * .95,
        // height: 200, //Should be deleted
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 20,
        marginVertical: 15,
    },
    productImage: {
        width: width * .3,
        height: width * .3,
        borderRadius: width * .15,
        alignSelf: 'center',
        // resizeMode: 'contain',
        marginHorizontal: 7,
        backgroundColor: '#F6F4F1'
    },
    productDetails: {
        flex: 2,
        marginVertical: 15,
    },
    productDescription: {
        fontFamily: 'Cairo-Regular',
        fontSize: 14,
        color: '#64615E',
        textAlign: 'right',
        marginHorizontal: 10,
    },
    productButtonsView: {
        marginVertical: 10,
        width: width * .5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    productButton: {
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(206, 39, 39, .8)',
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 14,
        color: '#ffffff',
    },
    addOfferButton: {
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(244, 116, 33, .8)',
        borderRadius: 10,
        marginVertical: 10,
    },
    notFoundText: {
        alignSelf: 'center',
        fontFamily: 'Cairo-semiBold',
        fontSize: 30,
        color: '#64615E'
    }
})

export default styles