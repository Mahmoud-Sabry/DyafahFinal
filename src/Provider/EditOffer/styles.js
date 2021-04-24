import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    productPic: {
        width: width * .95,
        height: 160,
        alignSelf: 'center',
        marginVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(246, 244, 241, 1)',
    },
    productIcon: {
        fontSize: 150,
        color: '#D6CFC8',
    },
    entryView: {
        flexDirection: 'row-reverse',
        width: width * .95,
        paddingVertical: 10,
        borderColor: '#D6CFC8',
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#ffffff'
    },
    entryText: {
        flex: 3,
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#64615E',
        textAlign: 'right',
        marginHorizontal: 10,
    },
    entryTitle: {
        flex: 2,
        fontFamily: 'Cairo-Regular',
        fontSize: 14,
        color: '#C8C7C6',
        textAlign: 'right',
        marginHorizontal: 10,
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
    }
})

export default styles