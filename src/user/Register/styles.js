import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F47421',
    },
    circleView: {
        width: width,
        height: width * .45,
        borderBottomLeftRadius: width,
        borderBottomRightRadius: width,
        backgroundColor: '#FFFFFF',
        top: -(width * .25),
        alignSelf: 'center',
    },
    circleText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 22,
        color: '#F7921F',
        textAlign: 'center',
        top: width * .26,
    },
    inputView: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    nameField: {
        width: width * .35,
        height: 50,
        alignSelf: 'center',
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        textAlign: 'center',
        color: '#F6F4F1',
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        marginTop: 25,
    },
    inputField: {
        width: width * .75,
        height: 50,
        alignSelf: 'center',
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        textAlign: 'center',
        color: '#F6F4F1',
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        marginTop: 25,
    },
    // address
    addressView: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        alignSelf: 'center',
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: .6,
        marginTop: 25,
        paddingHorizontal: 10,
    },
    addressStyle: {
        width: width * .75,
        height: 50,
        alignSelf: 'center',
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        textAlign: 'center',
        color: '#F6F4F1',
    },
    addressIcon: {
        fontSize: 30,
        color: '#ffffff',
    },
    // address
    labelField: {
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        textAlign: 'center',
        color: '#F6F4F1',
    },
    regButton: {
        width: width * .35,
        height: 50,
        borderRadius: 25,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 50,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    regText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    loginText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        textAlign: 'center',
        color: '#F6F4F1',
        marginVertical: 20,
    },
    phoneView: {
        width: width * .8,
        height: 45,
        alignSelf: 'center',
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        marginTop: 25,
        alignItems: 'center',
    },
    phoneField: {
        width: width * .6,
        height: 50,
        alignSelf: 'center',
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        textAlign: 'center',
        color: '#F6F4F1',

    },
})

export default styles