import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    productPic: {
        width: width * .85,
        height: 170,
        alignSelf: 'center',
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productIcon: {
        fontSize: 150,
        color: '#D6CFC8',
    }
})
export default styles;