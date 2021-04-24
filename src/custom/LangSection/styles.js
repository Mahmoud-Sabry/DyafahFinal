import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    sectionButton: {
        width: width * .8,
        alignSelf: 'center',
        marginVertical: 15,
    },
    langButton: {
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 25,
        color: '#F7901F'
    },
    iconView: {
        width: 30,
        height: 30,
        backgroundColor: '#f6f578',
        borderRadius: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    langText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 25,
        color: '#F47421',
    },
    lineView: {
        width: width * .6,
        alignSelf: 'center',
        height: 1,
        borderRadius: .5,
        backgroundColor: 'rgba(100, 97, 94, .3)',
        marginVertical: 5,
    }
})

export default styles