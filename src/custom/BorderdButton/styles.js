import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    buttonContainer: {
        minWidth: 150,
        maxWidth: width - 40,
        // padding: 10,
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#707070',
    },
    buttonText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 16,
        color: '#64615E'
    },
})


export default styles
