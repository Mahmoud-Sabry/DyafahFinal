import { StyleSheet, Dimensions } from 'react-native';
const { width, height, scale } = Dimensions.get('screen');

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ListStyle: {
        flex: 1,
        marginVertical: 15,
    },
    // Item Styles
    ItemContainer: {
        flexDirection: 'row-reverse',
        width: width - 40,
        minHeight: 150,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#64615E',
        backgroundColor: '#ffffff',
    },
    rightItemImage: {
        width: width * .4,
        minHeight: 150,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    leftItemImage: {
        width: width * .4,
        minHeight: 150,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    ItemDetails: {
        minHeight: 148,
        width: width * .6 - 42,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    Title: {
        textAlign: 'right',
        fontFamily: 'Cairo-Bold',
        marginHorizontal: 10,
        fontSize: 16,
        color: '#64615E',
        width: width * .55 - 42,
        height: 35,
    },
    ItemDescription: {
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
    starsStyle: {
        margin: 2,
        color: '#F7901F'
    },
    starsContainer: {
        width: 110,
    },
    heartButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignSelf: 'center',
        marginHorizontal: 10,
        backgroundColor: '#CCCCCC',
        justifyContent: 'center',
    },
    heartIcon: {
        fontSize: 20,
        color: '#ffffff',
        alignSelf: 'center',
    },
    itemSalary: {
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#CCCCCC',
        textAlign: 'right',
        marginHorizontal: 5,
        marginVertical: 5,
    },
    notFoundText: {
        alignSelf: 'center',
        fontFamily: 'Cairo-semiBold',
        fontSize: 30,
        color: '#64615E'
    }
})

export default styles;
