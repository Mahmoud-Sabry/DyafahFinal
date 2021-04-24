import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    TabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#ffffff',
        borderBottomColor: '#C8C7C6',
        borderBottomWidth: 2,
    },
    contTabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#ffffff',
        borderBottomColor: '#F47421',
        borderBottomWidth: 2,
    },
    TabText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#64615E',
        textAlign: 'center',
    },
    custTabText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#F47421',
        textAlign: 'center',
    }
})

export default styles