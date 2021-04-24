import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    confirmButton: {
        position: 'absolute',
        left: (width * .5 - 50),
        bottom: 20,
        width: 100,
        minHeight: 20,
        paddingVertical: 8,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F47421',
    },
    confirmText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#ffffff',
    },
    searchContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 70,
        left: width * .15,
        width: width * .7,
        height: 40,
        borderRadius: 25,
        borderColor: '#ffffff',
        borderWidth: 1,
        backgroundColor: '#F7921F',
    },
    emptySearchContainer: {
        height: 40,
        backgroundColor: 'transparent',
        width: width - 165,
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    inputContainerStyle: { backgroundColor: '#F7921F' },
    inputStyle: {
        fontFamily: 'Cairo-Regular',
        textAlign: 'right',
        fontSize: 16,
        color: '#ffffff',
    },
})

export default styles