import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    CategoriesView: {
        width,
        backgroundColor: '#F6F4F1',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    CategoriesRow: {
        flexDirection: 'row',
        marginVertical: 5,
    }
});

export default styles;