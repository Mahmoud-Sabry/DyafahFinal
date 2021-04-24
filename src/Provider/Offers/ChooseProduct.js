import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, setOfferItem, setProvider } from '../../Redux/Slices/Provider/info'
import I18n from '../../languages/I18n'
import { Spinner } from 'native-base'
import { dyafah } from '../../assets/consts'

const ProductDescription = ({ _Description }) => {
    const lang = useSelector(({ language }) => language.language)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return <Text style={[styles.productDescription, langText]}>{_Description}</Text>
}

const ProductItem = ({ _item, _onPress }) => {
    const { product_image, ar_name, en_name, price, ar_description, en_description } = _item ? _item : [null, '', '', '', '', '']
    const { image } = product_image != null ? product_image : _item ? _item : [null]
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'en' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    console.log("ProductItem: ", _item)
    return (
        <TouchableOpacity style={[styles.productContainer, langView]}>
            <Image
                source={{ uri: `${dyafah}${image}` }}
                style={styles.productImage}
            />
            <View style={styles.productDetails}>
                {lang == 'ar' && <ProductDescription _Description={ar_name} />}
                {lang == 'en' && <ProductDescription _Description={en_name} />}
                <ProductDescription _Description={`${price} ${I18n.t('provider.orders.sar')}`} />
                {lang == 'ar' && <ProductDescription _Description={ar_description} />}
                {lang == 'en' && <ProductDescription _Description={en_description} />}
                <TouchableOpacity style={styles.addOfferButton} onPress={() => _onPress()} >
                    <Text style={styles.buttonText}>{I18n.t('provider.offers.addNew')}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const Products = (props) => {
    const { navigate } = props.navigation
    const provider = useSelector(({ provider }) => provider.provider)
    const products = useSelector(({ provider }) => provider.products)
    const loading = useSelector(({ provider }) => provider.productsLoading)
    const dispatch = useDispatch()
    console.log("products: ", products)

    const _onPress = (item) => {
        dispatch(setOfferItem({ item, edit: false }))
        navigate('EditOffer')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            {loading && <Spinner size='large' color='#F47421' />}
            {!loading && products.length == 0 && <Text style={styles.notFoundText}>{I18n.t('provider.notFound')}</Text>}
            <FlatList
                key='productsToAddOfferList'
                data={products}
                keyExtractor={item => item.id}
                refreshing={false}
                onRefresh={() => dispatch(getProducts({ token: provider.api_token }))}
                renderItem={({ item }) =>
                    <ProductItem
                        _item={item}
                        _onPress={() => _onPress(item)}
                    />}
            />
        </SafeAreaView>
    )
}

export default Products
