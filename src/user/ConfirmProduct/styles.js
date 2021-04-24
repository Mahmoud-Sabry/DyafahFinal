import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#64615E',
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
        width: 130,
        alignSelf: 'flex-end',
        marginVertical: 5,
    },
    itemInfoTitle: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        color: '#64615E',
        textAlign: 'right',
    },
    itemSalary: {
        fontFamily: 'Cairo-SemiBold',
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
        fontSize: 17,
        color: '#64615E',
        textAlign: 'right',
        marginHorizontal: 10
    },
    rowButtonsView: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginVertical: 15
    },
    buttonStyle: {
        alignSelf: 'center',
        marginVertical: 5,
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
        fontSize: 25,
        color: '#64615E',
        marginHorizontal: 10,
    },
    editIcon: {
        fontSize: 35,
        color: '#CCCCCC'
    },
    radioLabels: {
        fontSize: 15,
        fontFamily: 'Cairo-Regular',
        marginVertical: 0
    },
})


export default styles
