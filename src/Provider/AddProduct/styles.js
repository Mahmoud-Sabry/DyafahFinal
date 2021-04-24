import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    productPic: {
        width: width * .95,
        height: 155,
        alignSelf: 'center',
        marginVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productIcon: {
        fontSize: 150,
        color: '#D6CFC8',
    },
    entryView: {
        width: width * .95,
        height: 50,
        borderColor: '#D6CFC8',
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#ffffff'
    },
    entryText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#D6CFC8',
        textAlign: 'right',
        marginHorizontal: 20,
    },
    saveButton: {
        width: 150,
        height: 40,
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: '#F47421',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 17,
        textAlign: 'center',
        color: '#ffffff',
    },
})

export default styles