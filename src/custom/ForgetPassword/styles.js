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
        fontSize: 25,
        color: '#F7921F',
        textAlign: 'center',
        top: width * .26,
    },
    inputField: {
        width: width * .8,
        // height: 50,
        padding: 13,
        borderRadius: 20,
        alignSelf: 'center',
        fontFamily: 'Cairo-Regular',
        fontSize: 20,
        textAlign: 'center',
        color: '#F6F4F1',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        marginTop: 25,

    },
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
        fontSize: 23,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    loginText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 17,
        textAlign: 'center',
        color: '#ffffff',
        marginTop: 15,
    },
    codeLabel: {
        fontFamily: 'Cairo-Bold',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 25,
        color: '#ffffff',
        marginHorizontal: 20,
    }
})

export default styles