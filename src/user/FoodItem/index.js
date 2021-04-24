import React from 'react'
import { SafeAreaView } from 'react-native'
import Header from '../../custom/header';
import styles from './styles';
import ItemDetails from './ItemDetails';
const FoodItem = (props) => {
    return (
        <SafeAreaView style={styles.ScrollContainer}>
            <Header props={props} />
            {/* Had To be changed */}
            <ItemDetails props={props} />
        </SafeAreaView>
    )
}

export default FoodItem
