import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct, setProvider, deleteProduct, getProducts } from '../../Redux/Slices/Provider/info'
import I18n from '../../languages/I18n'
import { Spinner } from 'native-base'
import { dyafah } from '../../assets/consts'

const ProductDescription = ({ _Description }) => {
    const lang = useSelector(({ language }) => language.language)
    return <Text style={[styles.productDescription, { textAlign: lang == 'ar' ? 'right' : 'left' }]}>
        {_Description}
    </Text>
}

const ProductButton = ({ _text, _color, _onPress }) => {
    return (
        <TouchableOpacity
            onPress={() => _onPress()}
            style={[styles.productButton, { backgroundColor: _color }]}
        >
            <Text style={styles.buttonText}>{_text}</Text>
        </TouchableOpacity>
    )
}

const ProductItem = ({ _item, _edit, _onPress, _delete }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'en' ? 'row-reverse' : 'row' }
    const url = _item.product_image ? `${dyafah}${_item.product_image.image}` : `${dyafah}${_item.image}`
    return (
        <TouchableOpacity style={[styles.productContainer, langView]} onPress={() => _onPress()}>
            <Image source={url ? { uri: url } : null}
                style={styles.productImage}
                defaultSource={require('../../assets/images/logo.png')}
            />
            <View style={styles.productDetails}>
                {lang == 'ar' && <ProductDescription _Description={_item.ar_name} />}
                {lang == 'en' && <ProductDescription _Description={_item.en_name} />}
                <ProductDescription _Description={`${_item.price} ${I18n.t('provider.orders.sar')}`} />
                {lang == 'ar' && <ProductDescription _Description={_item.ar_description} />}
                {lang == 'en' && <ProductDescription _Description={_item.en_description} />}
                <View style={styles.productButtonsView}>
                    <ProductButton _text={I18n.t('provider.products.delete')} _color='#ce2727' _onPress={() => _delete()} />
                    <ProductButton _text={I18n.t('provider.products.edit')} _color='#C8C7C6' _onPress={() => _edit()} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Products = (props) => {
    const { navigate } = props.navigation
    const provider = useSelector(({ provider }) => provider.provider)
    const products = useSelector(({ provider }) => provider.products)
    const loading = useSelector(({ provider }) => provider.productsLoading)
    const language = useSelector(({ language }) => language.language)
    const pd = useSelector(({ provider }) => provider.productDetails)
    const dispatch = useDispatch()
    
    const _onAddPress = () => {
        const { type } = provider
        switch (type) {
            case "car":
                console.log("This is a Car Provider!")
                navigate('AddCar')
                break;
            case "places":
                console.log("This is a Places Provider!")
                navigate('AddPlace')
                break;
            default: //popular_eating & Kashta
                console.log("This is a eating Provider!")
                navigate('AddEating')
                break;
        }
    }

    const _onItemPress = (item, edit) => {
        const { api_token } = provider
        const { id } = item
        dispatch(getProduct({ api_token, product_id: id }))
        navigate('EditProduct', { edit })
    }

    const _onDeletePress = (product_id) => {
        const { api_token } = provider
        dispatch(deleteProduct({ api_token, product_id }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            {/* Add Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => _onAddPress()}
            >
                <Text style={styles.addText}>{I18n.t('provider.products.addNewProduct')}</Text>
            </TouchableOpacity>
            {/*  */}
            {loading && <Spinner size='large' color='#F47421' />}
            {!loading && products.length == 0 && <Text style={styles.notFoundText}>{I18n.t('provider.notFound')}</Text>}
            <FlatList
                data={products ? products : []}
                keyExtractor={item => item.id}
                refreshing={false}
                onRefresh={() => dispatch(getProducts({ token: provider.api_token }))}
                renderItem={({ item }) =>
                    <ProductItem
                        _item={item}
                        _onPress={() => _onItemPress(item, false)}
                        _edit={() => _onItemPress(item, true)}
                        _delete={() => _onDeletePress(item.id)}
                    />
                }
            />
        </SafeAreaView>
    )
}

export default Products
