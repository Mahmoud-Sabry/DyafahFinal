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
        fontFamily: 'Cairo-SemiBold',
        fontSize: 17,
        color: '#64615E',
        textAlign: 'right',
        maxWidth: width *.8
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
        fontSize: 25,
        color: '#ffffff',
        alignSelf: 'center',
    },
    starsStyle: {
        margin: 2,
        color: '#F7901F'
    },
    starsContainer: {
        width: 110,
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
        marginVertical: 15
    },
    workerinfo: {
        fontFamily: 'Cairo-Bold',
        fontSize: 18,
        color: '#64615E',
        textAlign: 'right',
    }
})


export default styles
