import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    itemContainer: {
        height: 115,
        // backgroundColor: 'red',
        borderBottomWidth: 1,
        borderBottomColor: '#707070',
        flexDirection: 'row',
    },
    itemPart1: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#707070',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemPart3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayTextStyle: {
        fontFamily: 'Cairo-Regular',
        fontSize: 17,
        color: '#64615E'
    },
    iconView: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemIcon: {
        fontSize: 40,
        color: '#ffffff'
    }
});

export default styles