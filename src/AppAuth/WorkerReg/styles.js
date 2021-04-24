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
    inputView: {
        width: width * .8,
        height: 45,
        alignSelf: 'center',
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        marginTop: 25,
        alignItems: 'center',
    },
    inputField: {
        width: width * .6,
        height: 50,
        alignSelf: 'center',
        fontFamily: 'Cairo-Regular',
        fontSize: 20,
        textAlign: 'center',
        color: '#F6F4F1',

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
    },
    regText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 23,
        color: '#FFFFFF',
        textAlign: 'center',
    }
})

export default styles