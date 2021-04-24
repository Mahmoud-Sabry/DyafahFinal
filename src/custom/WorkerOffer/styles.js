import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    popView: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    messageContainer: {
        width: width * .8,
        height: 300, //width * .8,
        backgroundColor: '#F58620',
        borderRadius: 20,
        marginHorizontal: width * .1,
        marginVertical: height * .5 - 150, //(width * .4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmTitle: {
        fontFamily: 'Cairo-Bold',
        fontSize: 25,
        color: '#ffffff',
        textAlign: 'center',
    },
    buttonText: {
        fontFamily: 'Cairo-semiBold',
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center',
    },
    ButtonsView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    deleteButton: {
        backgroundColor: '#CE2727',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    editButton: {
        backgroundColor: '#07A456',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    textInput: {
        backgroundColor: '#ffffff',
        marginTop: 20,
        width: width * .7,
        height: 50,
        borderRadius: 12,
        textAlign: 'center',
        fontFamily: 'Cairo-Regular',
        fontSize: 20,
        color: '#64615E'
    }
})

export default styles