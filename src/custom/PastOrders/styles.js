import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ListStyle: {
        flex: 1,
        marginVertical: 15,
    },
    ScrollContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        // marginVertical: 10
    },
    favTitleView: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    itemTitle: {
        fontFamily: 'Cairo-Bold',
        fontSize: 25,
        color: '#64615E',
        textAlign: 'right',
    },
    itemDescription: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 17,
        color: '#CCCCCC',
        textAlign: 'right',
    },
    heartButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignSelf: 'center',
        marginHorizontal: 10,
        backgroundColor: '#CCCCCC',
        justifyContent: 'center',
    },
    heartIcon: {
        fontSize: 25,
        color: '#ffffff',
        alignSelf: 'center',
    },
    starsStyle: {
        margin: 0,
        color: '#F7901F'
    },
    starsContainer: {
        width: 110,
        alignSelf: 'flex-end',
        marginVertical: 5,
        marginHorizontal: 10,
    },
    notFoundText: {
        alignSelf: 'center',
        fontFamily: 'Cairo-semiBold',
        fontSize: 20,
        marginTop: 20,
        color: '#64615E'
    },
    authText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 50,
        color: '#f05a28'
    },
    itemInfoTitle: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        color: '#64615E',
        textAlign: 'right',
    },
    itemSalary: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        color: '#64615E',
        textAlign: 'right',
    },
    rowView: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    icon: {
        color: '#F47421',
        fontSize: 20,
    },
    textRow: {
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        color: '#64615E',
        textAlign: 'right',
        marginHorizontal: 10
    },
    rowButtonsView: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        marginVertical: 15,
    },
    workerinfo: {
        fontFamily: 'Cairo-Bold',
        fontSize: 18,
        color: '#64615E',
        textAlign: 'right',
    },
    reserveButton: {
        width: 210,
    },
    choosenDate: {
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#707070',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    dateText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 18,
        color: '#64615E',
        marginHorizontal: 10,
    },
    //////////////////////////////// Order Item ////////////////////////////////
    ItemContainer: {
        flexDirection: 'row-reverse',
        width: width - 40,
        minHeight: 20,
        paddingVertical: 5,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#64615E',
        backgroundColor: '#ffffff',
    },
    labelsView: {
        flex: .55,
    },
    leftLine: {
        borderLeftWidth: 1,
        borderLeftColor: '#64615E'
    },
    rightLine: {
        borderRightWidth: 1,
        borderRightColor: '#64615E'
    },
    labelText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        textAlign: 'center',
        color: '#F47421'
    },
    ItemDetails: {
        flex: 1,
        // height: 148,
        // width: width * .6 - 42,
        // borderTopLeftRadius: 20,
        // borderBottomLeftRadius: 20,
    },
    Title: {
        flex: 1,
        textAlign: 'right',
        fontFamily: 'Cairo-Bold',
        marginHorizontal: 10,
        fontSize: 16,
        color: '#64615E',
        // width: width * .55 - 42,
        // height: 35,
    },
    ItemDescription: {
        flex: 1,
        textAlign: 'right',
        fontFamily: 'Cairo-Regular',
        marginHorizontal: 10,
        fontSize: 12,
        color: '#64615E',
    },
    favRatingView: {
        flexDirection: 'row-reverse',
        marginHorizontal: 10,
        alignItems: 'center',
    },
})

export default styles;