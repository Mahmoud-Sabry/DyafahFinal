import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    ScrollContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    adsStyles: {
        marginHorizontal: width * .025,
        alignSelf: 'center',
    },
    nameView: {
        width: width * .95,
        alignSelf: 'center',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(112, 112, 112, .4)',
        borderTopWidth: 0,
    },
    nameText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        color: '#64615E',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    starsStyle: {
        margin: 0,
        color: '#F7901F'
    },
    starsContainer: {
        width: 130,
        alignSelf: 'center',
        marginVertical: 5,
    },
    itemInfoView: {
        width: width * .95,
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(112, 112, 112, .4)',
        padding: 10,
        marginTop: 10,
    },
    hintLabel: {
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        color: '#D6CFC8',
        textAlign: 'right',
    },
    itemCost: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#64615E',
        textAlign: 'right',
    },
    itemAvailable: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#F7901F',
        textAlign: 'right',
    },
    itemInfoText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 17,
        color: '#64615E',
        textAlign: 'right',
    },
    counterView: {
        flexDirection: 'row',
        marginVertical: 10,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#D6CFC8',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    itemIcon: {
        fontSize: 30,
        color: '#ffffff',
        alignSelf: 'center',
    },
    semiProducts: {
        width: width * .95,
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(112, 112, 112, .4)',
        marginTop: 10,
    },
    arrowView: {
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#707070',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 150,
        height: 45,
        alignSelf: 'center',
    },
    arrowButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
    },
    verticatLine: {
        height: 40,
        width: 1,
        backgroundColor: '#707070',
        alignSelf: 'center',
    },
    arrowIcons: {
        fontSize: 30,
        color: '#707070',
        alignSelf: 'center',
    },
    ////////////////// Shops Comp ///////////////////////////
    shopsView: {
        width: width * .95,
        alignSelf: 'center',
        borderRadius: 5,
        borderColor: 'rgba(112, 112, 112, .4)',
        borderWidth: 1,
        marginVertical: 15,
    },
    ListName: {
        fontFamily: 'Cairo-Bold',
        fontSize: 18,
        color: '#64615E',
        textAlign: 'right',
        marginVertical: 5,
        marginHorizontal: 20,
    },
    listContainer: {
        alignSelf: 'center',
        flexDirection: 'row-reverse',
        marginVertical: 15
    },
    shopImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginHorizontal: 10,
        resizeMode: 'cover',
        backgroundColor: 'rgba(112, 112, 112, .4)'
    }
})

export default styles