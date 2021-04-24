import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    headerGradient: {
        width,
        height: 60,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    iconMenu: {
        fontSize: 30,
        color: '#ffffff',
        marginHorizontal: 5
    },
    langButton: {
        width: 35,
        height: 35,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 17.5,
    },
    langImage: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 20,
    },
    langText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        color: '#ffffff',
    },
    searchContainer: {
        height: 40,
        backgroundColor: 'transparent',
        width: width - 165,
        flexDirection: 'row',
        borderRadius: 25,
        borderColor: '#ffffff',
        borderWidth: 1,
        marginHorizontal: 5,
        backgroundColor: '#F7921F',
    },
    emptySearchContainer:{
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
        fontSize: 18,
        color: '#ffffff',
    },
    // 
    outsearchContainer: {
        height: 40,
        width: width - 165,
        flexDirection: 'row-reverse',
        borderRadius: 25,
        borderColor: '#ffffff',
        borderWidth: 1,
        marginHorizontal: 5,
        backgroundColor: '#F7921F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontFamily: 'Cairo-Regular',
        fontSize: 17,
        color: '#FFFFFF',
        marginHorizontal: 15,
    }
});

export default styles;
