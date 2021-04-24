import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    sectionButton: {
        width: width * .8,
        alignSelf: 'center',
        marginVertical: 15,
    },
    aboutText:{
        fontFamily: 'Cairo-Regular',
        fontSize: 17,
        color: '#707070',
        textAlign: 'center',
    },
    aboutView:{
        width: width * .8,
        alignSelf: 'center',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#707070',
        borderRadius: 25,
        padding: 10,
    }
})

export default styles