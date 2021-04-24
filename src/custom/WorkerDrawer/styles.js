import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#707070',
    },
    // Worker SideMenu Button Component
    ButtonContainer: {
        flexDirection: 'row-reverse',
        height: 70,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderBottomColor: 'rgba(112, 112, 112, .3)',
        borderBottomWidth: 1,
    },
    ButtonText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 16,
        color: '#64615E',
        alignSelf: 'center',
    },
    ButtonImage: {
        width: 35,
        height: 35,
        alignSelf: 'center',
        marginHorizontal: 15,
    },
    // Worker SideMenu Info Component
    InfoContainer: {
        height: 320,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(112, 112, 112, .3)',
        alignItems: 'center',
    },
    InfoImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        // resizeMode: 'contain',
        // backgroundColor: 'rgba(112, 112, 112, .1)',
        marginVertical: 25,
    },
    InfoName: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 18,
        color: '#64615E',
        textAlign: 'center',
    },
    icon: {
        fontSize: 25,
        color: '#707070',
    },
    iconView: {
        width: 50,
        height: 50,
        position: 'absolute',
        right: 50,
        top: 175,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#ffffff'
    }
})

export default styles