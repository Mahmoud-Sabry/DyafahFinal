import { StyleSheet, Dimensions } from 'react-native'
const { width, hegiht } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    lineView: {
        width: width * .9,
        marginHorizontal: width * .05,
        height: 1,
        backgroundColor: '#707070',
        marginTop: 25,
        borderRadius: .5
    },
    searchButton: {
        alignSelf: 'center',
        width: width * .5,
        marginVertical: 20,
    },
    priceButtonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceButton: {
        marginHorizontal: 5,
        marginVertical: 15,
        height: 35,
        paddingHorizontal: 10,
    },
    priceButtonText: {
        fontSize: 17,
        fontFamily: 'Cairo-Bold'
    },
    priceLabel: {
        fontFamily: 'Cairo-Regular',
        fontSize: 22,
        color: '#64615E',
        marginVertical: 15,
        textAlign: 'center',
    },
    priceSlider: {
        width: width * .8,
        height: 40,
        alignSelf: 'center',
    },
    priceSliderLabelsView: {
        flexDirection: 'row-reverse',
        width: width * .83,
        height: 40,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceSliderLabel: {
        fontSize: 20,
        fontFamily: 'Cairo-Regular',
        color: '#64615E'
    }
})

export default styles