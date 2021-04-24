import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { deleteOffer, getOffers, setOfferItem, setProvider } from '../../Redux/Slices/Provider/info'
import I18n from '../../languages/I18n'
import { Spinner } from 'native-base'
import { dyafah } from '../../assets/consts'

const ProductDescription = ({ _Description }) => {
    const lang = useSelector(({ language }) => language.language)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return <Text style={[styles.productDescription, langText]}>{_Description}</Text>
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

const OfferItem = ({ _item, _edit, _delete }) => {
    const te = I18n.t('provider.orders.sar')
    const la = I18n.t('provider.offers.insteadof')
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'en' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <View style={[styles.productContainer, langView]}>
            <Image
                source={{ uri: `${dyafah}${_item.image}` }}
                style={styles.productImage}
            />
            <View style={styles.productDetails}>
                {lang == 'ar' && <ProductDescription _Description={_item.ar_name} />}
                {lang == 'en' && <ProductDescription _Description={_item.en_name} />}
                <Text style={[styles.productDescription, langText]}>
                    {_item.offer_price.toString()} {te} {la}
                    <Text style={[styles.productDescription, { textDecorationLine: 'line-through' }]}>
                        {_item.price.toString()} {te}
                    </Text>
                </Text>
                {lang == 'ar' && <ProductDescription _Description={_item.ar_offer_description} />}
                {lang == 'en' && <ProductDescription _Description={_item.offer_description} />}
                <View style={styles.productButtonsView}>
                    <ProductButton _text={I18n.t('provider.products.delete')} _color='rgba(206, 39, 39, .8)' _onPress={() => _delete()} />
                    <ProductButton _text={I18n.t('provider.products.edit')} _color='#C8C7C6' _onPress={() => _edit()} />
                </View>
            </View>
        </View>
    )
}

const Offers = (props) => {
    const { navigate } = props.navigation
    const lang = useSelector(({ language }) => language.language)
    const provider = useSelector(({ provider }) => provider.provider)
    const offers = useSelector(({ provider }) => provider.offers)
    const loading = useSelector(({ provider }) => provider.offersLoading)
    const [refresh, setRefresh] = useState(loading)
    const dispatch = useDispatch()
    
    const _onEditPressed = (item) => {
        dispatch(setOfferItem({ item, edit: true }))
        navigate('EditOffer')
    }

    const _onDeletePressed = (product_id) => {
        const { api_token } = provider
        dispatch(deleteOffer({ api_token, product_id }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            {/* Add Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => props.navigation.navigate('ChooseProduct')}
            >
                <Text style={styles.addText}>{I18n.t('provider.offers.addNew')}</Text>
            </TouchableOpacity>
            {/*  */}
            {loading && <Spinner size='large' color='#F47421' />}
            {!loading && offers.length == 0 && <Text style={styles.notFoundText}>{I18n.t('provider.notFound')}</Text>}
            <FlatList
                data={offers}
                keyExtractor={item => item.id}
                refreshing={false}
                onRefresh={() => dispatch(getOffers({ token: provider.api_token }))}
                renderItem={({ item }) =>
                    <OfferItem
                        _item={item}
                        _edit={() => _onEditPressed(item)}
                        _delete={() => _onDeletePressed(item.id)}
                    />}
            />
        </SafeAreaView>
    )
}

export default Offers
