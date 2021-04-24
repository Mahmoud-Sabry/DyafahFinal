import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    ButtonContainer:{
        minWidth: width * .6 ,
        minHeight: 30,
        marginVertical: 10,
        backgroundColor: '#F58620',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    ButtonText:{
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        color: '#ffffff'
    }
});

export default styles;