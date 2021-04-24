import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F47421',
    },
    logoImage: {
        width,
        height: height * .35,
    },
    inputView: {
        width: width * .8,
        height: 45,
        alignSelf: 'center',
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        marginBottom: 25,
    },
    inputField: {
        width: width * .8,
        alignSelf: 'center',
        fontFamily: 'Cairo-Regular',
        fontSize: 20,
        textAlign: 'center',
        color: '#F6F4F1',
    },
    regButton: {
        width: width * .5,
        height: 50,
        borderRadius: 25,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: height * .1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    regText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 23,
        color: '#F6F4F1',
        textAlign: 'center',
    },
    forgetText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        color: '#F6F4F1',
        textAlign: 'center',
        marginVertical: 20,
    },
    newRegText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#F6F4F1',
        textAlign: 'center',
        marginVertical: 25,
    },
    backButton: {
        top:0,
        marginVertical: 10,
        // backgroundColor: '#F47421',
    }
})

export default styles