import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    popView: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    messageContainer: {
        width: width * .8,
        minHeight: 10, //width * .8,
        paddingVertical: 15,
        backgroundColor: '#F58620',
        borderRadius: 20,
        marginHorizontal: width * .1,
        marginVertical: height * .5 - 150, //(width * .4),
        // justifyContent: 'center',
        alignItems: 'center',
    },
    confirmTitle: {
        fontFamily: 'Cairo-Bold',
        fontSize: 22,
        color: '#ffffff',
        textAlign: 'center',
        marginTop: 15,
    },
})

export default styles