import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    // Worker Status Component
    StatusView: {
        flexDirection: 'row-reverse',
        width: width * .9,
        height: 100, //Should Deleted
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 15,
    },
    StatusText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        color: '#F47421',
        marginHorizontal: 20,
    },
    pickerText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        color: "#64615E",
    },
    pickerItem: {
        backgroundColor: "#d3d3d3",
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 15,
    },
    pickerItemText: {
        color: '#788ad2',
        marginHorizontal: 20
    },
    // Worker Rates Component
    ratesView: {
        width: width * .9,
        // height: 400,
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    },
    // 
    progressView: {
        marginTop: -190,
        width: 180,
        height: 180,
        alignItems: 'center',
        borderRadius: 90,
    },
    progressIcon: {
        fontSize: 40,
        color: '#F7921F',
    },
    progressText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 45,
        color: '#F7921F',
        textAlign: 'center',
    },
    progressLabel: {
        fontFamily: 'Cairo-Regular',
        fontSize: 25,
        color: '#C8C7C6',
        textAlign: 'center',
        marginBottom: 10,
    },
    ratesCountText: {
        marginVertical: 15,
        fontFamily: 'Cairo-Regular',
        fontSize: 20,
        color: '#C8C7C6'
    },
    // 
    starCountView: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    starLabel: {
        fontFamily: 'Cairo-Regular',
        fontSize: 15,
        color: '#C8C7C6',
    },
    countBarView: {
        height: 12,
        backgroundColor: '#F7921F',
        marginHorizontal: 10,
    },
    ///////////////////// Worker Total Orders Comp //////////////////////
    totalOrdersView: {
        width: width * .9,
        alignSelf: 'center',
        alignItems: 'center',
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    totalOrdersText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 23,
        color: '#F47421',
        textAlign: 'center',
    }
})

export default styles