import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    imagesView: {
        height: height * .42,
    },
    imageCover: {
        width: width - 20,
        height: height * .3,
        margin: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(112, 112, 112, .2)',
    },
    imageProfile: {
        width: width / 2,
        height: width / 2,
        borderRadius: width / 4,
        position: 'absolute',
        marginHorizontal: width * .25 - 5,
        marginVertical: height * .15 + 10,
        backgroundColor: 'rgba(112, 112, 112, .2)',
    },
    textInfoView: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'rgba(112, 112, 112, .25)',
        marginVertical: 10,
    },
    textInfoStyle: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#64615E',
        width: width * .8,
        textAlign: 'center',
        alignSelf: 'center',
    },
    editButton: {
        marginVertical: 15,
        alignSelf: 'center',
        width: width * .8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    editButtonText: {
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    iconView: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#707070',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: width / 3,
        marginTop: 15,
    },
    coverEditIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#707070',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 5,
        top: height* .3 - 40,
    },
    icon: {
        fontSize: 25,
        color: '#707070',
        alignSelf: 'center',
    },
    authText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 50,
        color: '#f05a28'
    },
    walletView: {
        flexDirection: 'row',
        minWidth: 120,
        minHeight: 60,
        padding: 10,
        borderRadius: 20,
        borderColor: 'rgba(112,112,112,.35)',
        borderWidth: 2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    walletLine: {
        width: 1,
        height: 55,
        backgroundColor: '#707070',
        marginHorizontal: 10,
    },
    walletText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: '#64615E',
    }
})

export default styles