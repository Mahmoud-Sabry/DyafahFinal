import React from 'react'
import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'
import FoodList from '../../custom/FoodList'
import Header from '../../custom/header';
import styles from '../../custom/FoodList/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'native-base';
import { getKashtaProducts, getPopularProducts } from '../../Redux/Slices/User/home';
import I18n from '../../languages/I18n'

const FoodLists = (props) => {
    const { navigate } = props.navigation
    const { type } = props.route.params
    const dispatch = useDispatch()
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const kashtaProducts = useSelector(({ home }) => home.kashtaProducts)
    const popularEatings = useSelector(({ home }) => home.popularEatings)
    const kashtaLoading = useSelector(({ home }) => home.kashtaLoading)
    const popularLoading = useSelector(({ home }) => home.popularLoading)
    kashtaProducts.length == 0 ? dispatch(getKashtaProducts({ api_token })) : null
    popularEatings.length == 0 ? dispatch(getPopularProducts({ api_token })) : null
    const language = useSelector(state => state.language.language)
    const lang = language == 'ar'
    type == 'kashta' ? console.log('kashtaProducts: ', kashtaProducts) : console.log('popularEatings: ', popularEatings)
    const Foods = type == 'kashta' ? kashtaProducts : popularEatings

    const _refresh = () => {
        if (type == 'kashta') {
            dispatch(getKashtaProducts({ api_token }))
        } else dispatch(getPopularProducts({ api_token }))
    }

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            <ScrollView>
                {(kashtaLoading || popularLoading) && <Spinner size='large' color='#F7901F' />}
                {/* {popularLoading && <Spinner size='large' color='#F7901F' />} */}
                {!kashtaLoading && !popularLoading && Foods.length == 0 && <Text style={styles.notFoundText}>{I18n.t('worker.orders.notFound')}</Text>}
                {Foods.map((item, index) => {
                    if (item.products.length > 0) {
                        return <FoodList key={`${item.id}`} listData={[...item.products]}
                            name={lang ? item.ar_name : item.en_name}
                            OnPress={navigate}
                        />
                    }
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default FoodLists
