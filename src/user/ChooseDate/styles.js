import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    ListStyle: {
        borderTopWidth: 1,
        borderTopColor: '#707070',
        borderBottomWidth: 1,
        borderBottomColor: '#707070',
        marginVertical: 5,
        marginHorizontal: 15,
    }
})

export default styles