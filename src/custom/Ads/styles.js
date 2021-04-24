import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');


const styles = StyleSheet.create({
    AdsContainer: {
        width,
        height: 200,
        backgroundColor: 'red'
    }
});

export default styles;