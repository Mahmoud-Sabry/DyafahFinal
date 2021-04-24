import React from 'react'
import { SafeAreaView } from 'react-native'
import styles from './styles'
import Header from '../../custom/header'
import FoodOrderDetails from '../FoodOrderDetails'
import OtherOrderDetails from '../OtherOrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { addProductComment, getProductDetails, rateProduct } from '../../Redux/Slices/Main/appUser'
import { Spinner } from 'native-base'

const OrderView = (props) => {
    const dispatch = useDispatch()
    const { navigate } = props.navigation
    const { order_id } = props.route.params
    const appUser = useSelector(({ appUser }) => appUser.appUser)
    const orderDetails = useSelector(({ appUser }) => appUser.orderDetails)
    const orderLoading = useSelector(({ appUser }) => appUser.orderLoading)
    console.log('OrderView: ', orderDetails)
    // get Type of order:  foods => Foods Comp. , other => .......
    let type = 'foods'
    // type = orderDetails ? orderDetails.details > 1 ? 'foods' : 'other' : 'other'

    const _goToProduct = (id) => {
        const { api_token, role } = appUser ? appUser : [null, null]
        dispatch(getProductDetails({ id, api_token, role }))
        type != 'foods' ? navigate('FoodItem') : navigate('WorkerView') //must edit
    }

    const _onEvaluate = (id, rate, comment) => {
        console.log("_onEvaluate role: ", appUser)
        const { api_token, role } = appUser ? appUser : [null, null]
        if (rate > 0 && comment != '') {
            dispatch(addProductComment({ id, api_token, role, comment }))
            dispatch(rateProduct({ id, api_token, role, rate, order_id: orderDetails.id }))
        }
    }

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            {/* <PlacesAds DataSource={DataSource} /> */}
            {orderLoading && <Spinner size='large' color='#F7901F' />}
            {type == 'foods' && !orderLoading &&
                <FoodOrderDetails
                    _details={orderDetails}
                    order_id={order_id}
                    _onItemPress={_goToProduct}
                    _onRate={_onEvaluate}
                />}
            {/* {type == 'other' && <OtherOrderDetails _details={orderDetails} order_id={order_id} />} */}
        </SafeAreaView>
    )
}

export default OrderView
