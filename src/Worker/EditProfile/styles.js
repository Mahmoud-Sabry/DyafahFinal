import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    editButton: {
        height: 50,
        // width: width *.7,
        alignSelf: 'center',
        backgroundColor: '#F47421',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    editButtonText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 18,
        textAlign: 'center',
        color: '#ffffff',
        marginHorizontal: 15,
    },
    daysText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 18,
        textAlign: 'center',
        color: '#64615E',
        marginHorizontal: 15,
        marginVertical: 10,
    },
    addDetailsView: {
        flexDirection: 'row-reverse',
        height: 50,
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    addDetailsButton: {
        height: 30,
        width: width * .3,
        marginHorizontal: 5,
        borderRadius: 10,
        backgroundColor: '#F7921F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addDetailsText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        color: '#ffffff',
    },
    detailsText: {
        width: width * .45,
        fontFamily: 'Cairo-Regular',
        fontSize: 17,
        color: '#64615E',
        textAlign: 'center',
        minHeight: 20,
    },
    detailText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#64615E',
        textAlign: 'center',
    },
    infoRowView: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 10,
    },
    infoTagLabel: {
        fontFamily: 'Cairo-Regular',
        fontSize: 17,
        color: '#F7921F',
        marginHorizontal: 10,
    },
    infoTextLabel: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#64615E',
        marginHorizontal: 15,
    },
    PickerButton: {
        width: width * .5,
        height: width * .5,
        alignSelf: 'center',
        marginVertical: 10,
    },
    pickerImage: {
        width: width * .5,
        height: width * .5,
        alignSelf: 'center',
        // resizeMode: 'center',
    },
    productIcon: {
        fontSize: 150,
        color: '#D6CFC8',
    },
    /////////////////// Images List Comp /////////
    listStyle: {
        marginHorizontal: 15,
        // backgroundColor: 'red'
    }
})

export default styles

