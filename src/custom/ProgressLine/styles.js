
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    progressLineView: {
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#BCBCBC',
    },
    progressLine: {
        width: 100,
        height: 3,
        backgroundColor: '#BCBCBC',
    },
})

export default styles