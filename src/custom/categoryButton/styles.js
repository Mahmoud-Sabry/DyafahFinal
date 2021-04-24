import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    CategoryContainer: {
        width: width / 2 - 20,
        minHeight: 110,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D6CFC8',
        backgroundColor: '#ffffff',
        marginHorizontal: 5,
        alignItems: 'center'
        // marginVertical: 10
    },
    CategoryImage: {
        width: 70,
        height: 70,
        marginVertical: 10
    },
    lineView: {
        width: width / 2 - 20,
        height: 1,
        backgroundColor: '#D6CFC8'
    },
    CategoryText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        color: '#F47421',
        marginHorizontal: 5,
    }
});

export default styles;