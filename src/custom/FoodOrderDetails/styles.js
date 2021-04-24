import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    subOrdersList: {
        flex: 1.5,
    },
    subOrderContainer: {
        flexDirection: 'row-reverse',
        width: width * .9,
        minHeight: 120,
        alignSelf: 'center',
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#707070',
        marginTop: 25,
    },
    subOrderImage: {
        flex: 1.1,
        width: width * .25,
        height: 120,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    subOrderDetails: {
        flex: 2,
        paddingHorizontal: 5,
    },
    leftLine: {
        borderLeftColor: '#707070',
        borderLeftWidth: 1,
    },
    rightLine: {
        borderRightColor: '#707070',
        borderRightWidth: 1,
    },
    titleText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 16,
        color: '#64615E',
        textAlign: 'right',
    },
    descText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 13,
        color: '#64615E',
        textAlign: 'right',
    },
    countView: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginVertical: 5,
    },
    countText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 18,
        color: '#64615E',
        textAlign: 'center',
        borderColor: '#707070',
        borderWidth: .6,
        borderRadius: 10,
        marginHorizontal: 5,
        minWidth: 30,
    },
    costText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        color: '#64615E',
        textAlign: 'right',
    },
    ////////
    infoRow: {
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
    infoList: {
        width: width * .91,
        height: 150,
        justifyContent: 'center',
        backgroundColor: 'rgba(246, 244, 241, .63)',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 10,
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
    ////
    orderSummery: {
        flex: 1,
    },
    billButton: {
        alignSelf: 'center',
        paddingHorizontal: 25,
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 15,
    },
    /// order Rate View ///
    orderRate: {
        flexDirection: 'row',
        marginHorizontal: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    orderRateLabel: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#64615E',
        marginHorizontal: 5,
    },
    starsStyle: {
        margin: 0,
        color: '#F7901F'
    },
    starsContainer: {
        width: 130,
        alignSelf: 'flex-end',
        marginVertical: 5,
        marginHorizontal: 10,
    },
})

export default styles;