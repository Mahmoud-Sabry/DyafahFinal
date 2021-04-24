import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    StatusView: {
        flexDirection: 'row-reverse',
        width: width * .95,
        // height: 100, //Should Deleted
        // borderRadius: 5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 15,
        borderColor: '#D6CFC8',
        borderWidth: 1,
    },
    StatusText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 16,
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
        marginHorizontal: 20,
    },
})

export default styles