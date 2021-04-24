import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    backContainer: {
        flexDirection: 'row',
        width: 85,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        borderColor: '#ffffff',
        borderWidth: .8,
    },
    backText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 20,
        color: '#ffffff',
        marginTop: -10,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    backIcon: {
        fontSize: 22,
        color: '#ffffff',
        marginRight: 5,
    },
})

export default styles