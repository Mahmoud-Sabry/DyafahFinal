import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F47421',
    },
    logoImage: {
        width: width,
        height: height * .35,
    },
    labelText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 30,
        textAlign: 'center',
        color: '#F6F4F1',
    },
    loginText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 20,
        textAlign: 'center',
        color: '#F6F4F1',
        marginVertical: 20,
    },
    menuButton: {
        width: width * .8,
        height: 40,
        alignSelf: 'center',
        borderRadius: 30,
        borderColor: '#F6F4F1',
        borderWidth: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 17,
        color: '#F6F4F1',
    }
})

export default styles