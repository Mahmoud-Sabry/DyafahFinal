import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: width * .7,
        height: 40,
        alignSelf: 'center',
    },
    TextStyle: {
        fontFamily: 'Cairo-Bold',
        fontSize: 16,
    },
    titleText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 22,
        color: '#64615E',
        textAlign: 'center',
        marginTop: 15,
    }
})

export default styles