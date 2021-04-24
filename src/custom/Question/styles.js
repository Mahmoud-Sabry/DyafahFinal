import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    QuestionContainer: {
        marginVertical: 10,
        marginHorizontal: 15,
    },
    // itemInfoTitle: {
    //     fontFamily: 'Cairo-SemiBold',
    //     fontSize: 17,
    //     color: '#64615E',
    //     textAlign: 'right',
    //     // margin: 10,
    // },
    // radioLabels: {
    //     fontSize: 16,
    //     fontFamily: 'Cairo-Regular',
    //     marginVertical: 2
    // },
    itemInfoTitle: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        color: '#64615E',
        textAlign: 'right',
        marginHorizontal: 5,
    },
    radioLabels: {
        fontSize: 15,
        fontFamily: 'Cairo-Regular',
        marginVertical: 2,
    },
    radioButton: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center'
        // alignSelf: 'center',
    },
    radioIcon: {
        fontSize: 20,
        color: '#F47421',
        marginHorizontal: 5,
    }
})

export default styles