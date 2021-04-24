import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    sectionButton: {
        width: width * .8,
        alignSelf: 'center',
        marginVertical: 15,
    },
    shareButton: {
        width: width * .75,
        height: 54,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#707070',
        backgroundColor: '#ffffff',
        flexDirection: 'row-reverse',
    },
    shareIcon: {
        fontSize: 35,
        color: '#707070',
        marginHorizontal: 5,
    },
    shareText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 22,
        color: '#707070',
    }
})

export default styles