import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    pageTitle: {
        fontFamily: 'Cairo-Regular',
        fontSize: 20,
        color: '#64615E',
        textAlign: 'center',
        marginVertical: 10,
        borderBottomColor: '#64615E',
        borderBottomWidth: 1,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginVertical: 15,
    },
    button:{
        marginHorizontal: 5,
    }
})

export default styles