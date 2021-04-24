import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F6F4F1',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row-reverse',
        width: width * .95,
        padding: 15,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderColor: '#D6CFC8',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        marginTop: 25,
    },
    rowIcon: {
        flex: .7,
        fontSize: 30,
        color: '#D6CFC8',
        alignSelf: 'center',
    },
    infoText: {
        flex: 4,
        fontFamily: 'Cairo-Regular',
        fontSize: 20,
        textAlign: 'right',
        color: '#D6CFC8',
    },
    notificationIcon: {
        fontSize: 30,
        color: '#F47421',
        alignSelf: 'center',
    },
    notificationButton: {
        flex: .6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ////////////// Pass Sec Comp /////////////////
    secView: {
        width: width * .9,
        marginTop: 15,
        padding: 15,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        // borderColor: '#D6CFC8',
        // borderWidth: .8,
    },
    editButton: {
        height: 40,
        // width: width *.7,
        alignSelf: 'center',
        backgroundColor: '#F47421',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    editButtonText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff',
        marginHorizontal: 20,
    },
    passInput: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 20,
        textAlign: 'center',
        color: '#D6CFC8',
        marginTop: 10,
        borderRadius: 5,
        borderWidth: .8,
        borderColor: '#D6CFC8'
    },
    ///////////// Terms and Conds Comp ////////////
    aboutText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 17,
        color: '#707070',
        textAlign: 'center',
    },
    //////////// Lang Comp /////////////
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