import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    popView: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    messageContainer: {
        width: width * .8,
        maxHeight: height * .8,
        // paddingVertical: 15,
        backgroundColor: '#F58620',
        borderRadius: 10,
        marginVertical: height * .1, //(width * .4),
        alignSelf: 'center',
        // marginHorizontal: width * .1,
        // justifyContent: 'space-between',
        // alignItems: 'center',
    },
    countryButton: {
        flexDirection: 'row',
        minHeight: 30,
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        borderColor: '#ffffff',
        borderWidth: 1,
        padding: 5,
    },
    countryName: {
        flex: 2,
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
    },
    borderRight: {
        borderRightColor: '#ffffff',
        borderRightWidth: 1,
    },
    borderLeft: {
        borderLeftColor: '#ffffff',
        borderLeftWidth: 1,
    },
    countryCode: {
        flex: 1,
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        borderRightColor: '#ffffff',
        borderRightWidth: 1,
    },
    countryFlag: {
        flex: 1,
        width: 60,
        height: 40,
        marginHorizontal: 5,
        resizeMode: 'contain'
    }
})

export default styles;