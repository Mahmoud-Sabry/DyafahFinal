import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import I18n from '../../languages/I18n'
import { useDispatch, useSelector } from 'react-redux'
import { getWorker } from '../../Redux/Slices/Worker/info'
import { Spinner } from 'native-base'
import { TextInput } from 'react-native-gesture-handler'
import { addNewOffer, deleteOffer, updateOffer } from '../../Redux/Slices/Provider/info'

const WorkerOffer = ({ OnPress }) => {
    const dispatch = useDispatch()
    const worker = useSelector(({ worker }) => worker.user)
    const product = useSelector(({ worker }) => worker.product)
    product ? null : dispatch(getWorker({ token: worker.api_token }))
    const { id, has_offer, offer_price, offer_description, ar_offer_description } = product ? product : [0, 0, null]
    const [offerPrice, setOfferPrice] = useState('')
    const [ar_offerDesc, setAR_OfferDesc] = useState('')
    const [offerDesc, setOfferDesc] = useState('')
    console.log('product: ', product)

    const _onAdd = () => {
        const { api_token } = worker
        if (offerPrice != '' && offerDesc != '' && ar_offerDesc != '') {
            dispatch(addNewOffer({
                api_token,
                product_id: id,
                offer_price: offerPrice,
                ar_offer_description: ar_offerDesc,
                offer_description: offerDesc
            }))
            OnPress(false)
        }
    }

    const _onEdit = () => {
        const { api_token } = worker
        if (offerPrice != '' || offerDesc != '' || ar_offerDesc != '') {
            dispatch(updateOffer({
                api_token,
                product_id: id,
                offer_price: offerPrice == '' ? offer_price : offerPrice,
                ar_offer_description: ar_offerDesc == '' ? ar_offer_description : ar_offerDesc,
                offer_description: offerDesc == '' ? offer_description : offerDesc
            }))
            OnPress(false)
        }
    }

    const _onDelete = () => {
        const { api_token } = worker
        dispatch(deleteOffer({ api_token, product_id: id }))
        OnPress(false)
    }

    return (
        <View style={styles.popView}>
            <TouchableOpacity style={styles.messageContainer} onPress={() => OnPress(false)}>
                {!product && <Spinner size='large' color='#ffffff' />}
                {product && <>
                    <TextInput
                        placeholder={offer_price != 0 ? offer_price.toString() : I18n.t('provider.offers.offerPrice')}
                        value={offerPrice}
                        onChangeText={(text) => setOfferPrice(text)}
                        style={styles.textInput}
                        keyboardType='numeric'
                    />
                    <TextInput
                        placeholder={ar_offer_description ? ar_offer_description : I18n.t('provider.offers.offerDesc') + I18n.t('arabic')}
                        value={ar_offerDesc}
                        onChangeText={(text) => setAR_OfferDesc(text)}
                        style={styles.textInput}
                        multiline
                    />
                    <TextInput
                        placeholder={offer_description ? offer_description : I18n.t('provider.offers.offerDesc') + I18n.t('english')}
                        value={offerDesc}
                        onChangeText={(text) => setOfferDesc(text)}
                        style={styles.textInput}
                        multiline
                    />
                    <View style={styles.ButtonsView}>
                        {has_offer == 1 && <TouchableOpacity style={styles.deleteButton} onPress={() => _onDelete()}>
                            <Text style={styles.buttonText}>{I18n.t('provider.products.delete')}</Text>
                        </TouchableOpacity>}
                        {has_offer == 1 && <TouchableOpacity style={styles.editButton} onPress={() => _onEdit()}>
                            <Text style={styles.buttonText}>{I18n.t('provider.products.edit')}</Text>
                        </TouchableOpacity>}
                        {has_offer == 0 && <TouchableOpacity style={styles.editButton} onPress={() => _onAdd()}>
                            <Text style={styles.buttonText}>{I18n.t('provider.offers.addNew')}</Text>
                        </TouchableOpacity>}
                    </View>
                </>}
            </TouchableOpacity>
        </View>
    )
}

export default WorkerOffer
