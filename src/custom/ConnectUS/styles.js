import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    sectionButton: {
        width: width * .8,
        alignSelf: 'center',
        marginVertical: 15,
    },
    shareButtonsView: {
        flexDirection: 'row',
        width: width * .75,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    shareButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 7,
        borderColor: 'rgba(100, 97, 94, .13)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareIcon: {
        fontSize: 35,
        color: 'rgba(100, 97, 94, .19)',
        alignSelf: 'center',
    },
})

export default styles