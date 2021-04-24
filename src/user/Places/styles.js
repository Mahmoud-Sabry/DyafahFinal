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
        width: width - 40,
        height: 160,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#64615E',
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row-reverse',
    },
    ItemImage: {
        width: width * .4,
        height: 158,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    ItemDetails: {
        height: 158,
        width: width * .6 - 42,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    Title: {
        textAlign: 'right',
        fontFamily: 'Cairo-Bold',
        marginHorizontal: 5,
        fontSize: 15,
        color: '#64615E',
        width: width * .45,
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
        marginHorizontal: 5,
        alignItems: 'center',
    },
    starsStyle: {
        margin: 0,
        color: '#F7901F'
    },
    starsContainer: {
        width: 130,
    },
    heartButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignSelf: 'center',
        marginHorizontal: scale,
        backgroundColor: '#CCCCCC',
        justifyContent: 'center',
    },
    heartIcon: {
        fontSize: 25,
        color: '#ffffff',
        alignSelf: 'center',
    },
    itemSalary: {
        textAlign: 'right',
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#CCCCCC',
        marginRight: 10,
    },
    notFoundText: {
        alignSelf: 'center',
        fontFamily: 'Cairo-semiBold',
        fontSize: 30,
        color: '#64615E'
    }
})

export default styles;
