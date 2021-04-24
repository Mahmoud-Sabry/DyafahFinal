import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './styles';
import OrderInfo from './OrderInfo';

const NewOrder = ({ item, _onPress }) => {
    return (
        <TouchableOpacity
            style={styles.orderContainer}
            onPress={() => _onPress ? _onPress() : null}
        >
            <OrderInfo _order={item} _OrderButtons={true} />
        </TouchableOpacity>
    )
}

export default NewOrder;