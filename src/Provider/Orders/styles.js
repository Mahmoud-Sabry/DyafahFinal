import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    ///////////////////////////// Tab Bar Component //////////////////////////////
    TabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#ffffff',
        marginVertical: 15,
    },
    contTabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#ffffff',
        marginVertical: 15,
    },
    cornerRight: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    cornerLeft: {
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    TabText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#64615E',
        textAlign: 'center',
    },
    custTabText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#F47421',
        textAlign: 'center',
    },
    //////////////////////////// index file Component ///////////////////////////////
    tabsContainer: {
        width: width * .95,
        alignSelf: 'center',
    },
    notFoundText: {
        alignSelf: 'center',
        fontFamily: 'Cairo-semiBold',
        fontSize: 20,
        color: '#64615E',
        marginTop: 20,
    },
    //////////////////////////////////////////
    // List Style Comp
    ListStyle: {
        flex: 1,
        backgroundColor: '#F6F4F1',
        // paddingVertical: 20,
    },
    orderContainer: {
        width: width * .95,
        borderRadius: 25,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        marginVertical: 10,
    },
    orderDetails: {
        width: width * .6 - 2,
    },
    orderLocation: {
        width: width * .35,
        height: 140,
    },
    orderInfoRow: {
        flexDirection: 'row-reverse',
        marginTop: 5,
    },
    orderInfoText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 12,
        width: width * .2,
        textAlign: 'right',
        color: '#000000',
        marginRight: 10,
    },
    orderDetailText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 12,
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
        marginHorizontal: width * .2 - 40,
    },
    // New Order Component
    orderinfoView: {
        paddingVertical: 10,
        marginHorizontal: 15,
    },
    orderinfoRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    orderinfoLabel: {
        flex: 1,
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#C8C7C6',
        textAlign: 'right',
    },
    orderinfoText: {
        flex: 3,
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#C8C7C6',
        textAlign: 'right',
    },
    tabelTitle: {
        flex: 1,
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        color: '#F7921F',
        textAlign: 'center',
    },
    salary: {
        flex: .6,
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        color: '#F7921F',
        textAlign: 'center',
    },
    tabelText: {
        flex: 1,
        fontFamily: 'Cairo-Regular',
        fontSize: 14,
        color: '#C8C7C6',
        textAlign: 'center',
        marginRight: 5,
    },
    salaryText: {
        flex: .5,
        fontFamily: 'Cairo-Regular',
        fontSize: 14,
        color: '#C8C7C6',
        textAlign: 'center',
        marginRight: 5,
    },
    OrderSummryView: {
        backgroundColor: 'rgba(246, 244, 241, .65)',
        borderRadius: 15,
        marginVertical: 10,
        padding: 15,
    },
    SummryText: {
        flex: 1,
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#64615E',
        textAlign: 'right',
    },
    summryTotal: {
        flex: 1,
        fontFamily: 'Cairo-SemiBold',
        fontSize: 16,
        color: '#64615E',
        textAlign: 'right',
    },
    //////////////////////////// OrderButtons ///////////////////////////////
    ordersView: {
        flexDirection: 'row-reverse',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10,
        // backgroundColor: 'red',
    },
    orderButton: {
        width: 120,
        height: 40,
        borderRadius: 15,
        backgroundColor: '#07A456',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderButtonText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#ffffff',
        textAlign: 'center',
    },
    ////////////////////// Order Status Comp /////////////////////////////
    StatusView: {
        flexDirection: 'row-reverse',
        width: width * .9,
        alignItems: 'center',
        marginVertical: 15,
    },
    StatusText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        color: '#64615E',
        marginHorizontal: 10,
    },
    pickerText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        color: "#F47421",
        alignSelf: 'center',
    },
    pickerItem: {
        // backgroundColor: "#F47421",
        // marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 15,
    },
    pickerItemText: {
        fontFamily: 'Cairo-semiBold',
        fontSize: 18,
        color: '#F47421',
        marginHorizontal: 20,
        // textAlign: 'right'
    },
    pickerContainer: {
        width: 150,
        backgroundColor: '#F6F4F1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    }
})

export default styles