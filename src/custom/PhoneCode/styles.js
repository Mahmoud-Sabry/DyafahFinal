import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    phoneCodeView: {
        flexDirection: 'row',
        minWidth: 90,
        minHeight: 35,
        borderRadius: 20,
        backgroundColor: 'rgba(214,207,200,.6)',
        alignItems: 'center',
    },
    flagImage: {
        height: 20,
        width: 25,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    phoneLabel: {
        fontFamily: 'Cairo-Regular',
        fontSize: 14, 
        color: '#F6F4F1',
        marginRight: 5,
    }
})

export default styles