import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F6F4F1'
    },
    profileImage: {
        width: width * .4,
        height: width * .4,
        borderRadius: width * .2,
        resizeMode: 'center',
        // backgroundColor: 'rgba(112, 112, 112, .1)',
        marginVertical: 10,
        alignSelf: 'center',
        resizeMode: 'cover'
    },
    // Info Container Comp
    infoView: {
        flexDirection: 'row-reverse',
        width: width * .95,
        height: 50,
        borderColor: '#D6CFC8',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    infoText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#64615E',
        textAlign: 'right',
        marginHorizontal: 10,
        width: width * .3,
    },
    detailText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#64615E',
        textAlign: 'right',
    },
    dateView: {
        width: width * .3,
        height: 35,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#707070',
        alignSelf: 'center',
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    finishButton: {
        minWidth: 75,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#07A456',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        borderRadius: 10,
    },
    finishButtonText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    }
})

export default styles