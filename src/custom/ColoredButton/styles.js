import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    buttonContainer: {
        minWidth: 150,
        maxWidth: width - 40,
        // padding: 10,
        height: 50,
        backgroundColor: '#F7901F',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 22,
        color: '#ffffff'
    },
})


export default styles
