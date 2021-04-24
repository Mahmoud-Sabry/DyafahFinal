import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    // Food Lists Styles
    Container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    // Food List Styles
    ListName: {
        fontFamily: 'Cairo-Bold',
        fontSize: 18,
        color: '#64615E',
        textAlign: 'right',
        marginTop: 10,
        marginHorizontal: 20,
    },
    listContainer: {
        alignSelf: 'center',
        flexDirection: 'row-reverse',
    },
    lineView: {
        width: width * .9,
        height: 1,
        backgroundColor: '#64615E',
        alignSelf: 'center',
        marginVertical: 15,
    },
    // Food Item Styles
    itemView: {
        width: width * .3,
        marginHorizontal: 5,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#F7901F',
        marginVertical: 5,
        alignItems: 'center',
    },
    itemImage: {
        width: width * .3,
        height: 70,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    itemName: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 15,
        color: '#64615E',
        width: width * .3 - 5,
        textAlign: 'center',
    },
    itemPlaceView: {
        width: width * .3,
        height: 30,
        backgroundColor: '#F7901F',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemPlaceText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 18,
        color: '#ffffff',
    },
    // Empty Item Styles
    notFoundText: {
        alignSelf: 'center',
        fontFamily: 'Cairo-semiBold',
        fontSize: 30,
        color: '#64615E'
    }
})

export default styles