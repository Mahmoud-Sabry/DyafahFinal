import { Dimensions, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    itemStyle: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 15,
    },
    labelItemStyle: {
        fontFamily: 'Cairo-Bold',
        fontSize: 18,
        color: '#ffffff'
    },
    iconStyle: {
        fontSize: 28,
        color: '#ffffff',
    },
    iconBorder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
});

export default styles;