import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    popView: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    messageContainer: {
        width: width * .8,
        minHeight: 200, //width * .8,
        backgroundColor: '#F58620',
        borderRadius: 20,
        marginHorizontal: width * .1,
        marginVertical: height * .5 - 150, //(width * .4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 22,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 40,
    },
    buttonsView: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginVertical: 15,
    },
    confirmButton: {
        minWidth: 120,
        minHeight: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        marginHorizontal: 5,
    },
    cancelButton: {
        minWidth: 120,
        minHeight: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#F47421',
        marginHorizontal: 5,
        shadowColor: '#F47621',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    confirmText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#F7921F',
        textAlign: 'center',
    },
    cancelText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
    },
    reviewText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 30,
        color: '#ffffff',
        textAlign: 'center',
    }
})

export default styles