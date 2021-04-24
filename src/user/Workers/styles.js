import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

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
        height: 150,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#64615E',
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row-reverse',
    },
    rightItemImage: {
        width: width * .4,
        height: 148,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    leftItemImage: {
        width: width * .4,
        height: 148,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    ItemDetails: {
        height: 148,
        width: width * .6 - 42,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    Title: {
        textAlign: 'right',
        fontFamily: 'Cairo-Bold',
        marginVertical: 5,
        marginHorizontal: 10,
        fontSize: 16,
        color: '#64615E',
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
        margin: 0,
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
        marginHorizontal: 8,
        backgroundColor: '#CCCCCC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heartIcon: {
        fontSize: 20,
        color: '#ffffff',
        alignSelf: 'center',
    },
    itemSalary: {
        textAlign: 'right',
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#CCCCCC',
        marginHorizontal: 5,
    },
})

export default styles;
