import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        // resizeMode: 'contain',
        // backgroundColor: 'rgba(112, 112, 112, .1)',
        marginVertical: 25,
        alignSelf: 'center',
    },
    // ProfileInfoRow Comp
    infoRow: {
        flexDirection: 'row-reverse',
        width: width * .8,
        alignSelf: 'center',
        // marginHorizontal: 50,
        alignItems: 'center',
        marginVertical: 10,
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: 1,
    },
    rowIcon: {
        fontSize: 30,
        color: '#c0c0c0',
    },
    infoText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#64615E',
        textAlign: 'left',
        marginHorizontal: 10,
        width: width * .6,
    },
    ///////////////////////////////
    editButton: {
        height: 50,
        // width: width *.7,
        alignSelf: 'center',
        backgroundColor: '#F47421',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    editButtonText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 18,
        textAlign: 'center',
        color: '#ffffff',
        marginHorizontal: 15,
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
        marginTop: -60,
    },
})

export default styles