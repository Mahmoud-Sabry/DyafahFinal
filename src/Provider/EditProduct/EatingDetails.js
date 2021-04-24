import React, { useState } from 'react'
import { Text, SafeAreaView, TouchableOpacity, ScrollView, View, TextInput } from 'react-native'
import styles from './styles'
import MultiChoice from '../../custom/MultiChoice';
import { Spinner } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { editEating } from '../../Redux/Slices/Provider/info'
import ImagePickerButton from '../../custom/ImagePickerButton'
import ImagesList from '../../Worker/EditProfile/ImagesList'
import I18n from '../../languages/I18n'

const EntryField = ({ _title, _value, _setValue, _edit, numeric }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <View style={[styles.entryView, langView]}>
            <Text style={[styles.entryTitle, langText]}>{_title}</Text>
            <TextInput
                keyboardType={numeric ? 'numeric' : 'default'}
                editable={_edit}
                multiline={true}
                value={_value}
                onChangeText={(newVal) => _setValue(newVal)}
                style={[styles.entryText, langText]}
            />
        </View>
    )
}

const EatingDetails = ({ edit, pd }) => {
    const lang = useSelector(({ language }) => language.language)
    const { type } = pd
    const types = [
        { id: 1, ar_name: I18n.t('provider.products.addEating.types.kashta'), en_name: I18n.t('provider.products.addEating.types.kashta') },
        { id: 2, ar_name: I18n.t('provider.products.addEating.types.popular'), en_name: I18n.t('provider.products.addEating.types.popular') }]
    const api_token = useSelector(({ provider }) => provider.provider.api_token)
    const kashtaCategories = useSelector(({ provider }) => provider.kashtaCategories)
    const eatingCategories = useSelector(({ provider }) => provider.eatingCategories)
    const addEatingLoading = useSelector(({ provider }) => provider.addEatingLoading)
    const [selectedType, setSelectedType] = useState(type == 'kashta' ? 1 : 2)
    const [category_id, setSelectedCat] = useState(pd.category_id)
    const [ar_name, setAR_Name] = useState(pd ? pd.ar_name : '')
    const [name, setName] = useState(pd ? pd.en_name : '')
    const [ar_description, setAR_Description] = useState(pd ? pd.ar_description : '')
    const [description, setDescription] = useState(pd ? pd.en_description : '')
    const [details, setDetails] = useState(pd ? pd.details.length > 0 ? pd.details[0].value : '' : '')
    const [price, setPrice] = useState(pd ? pd.price.toString() : '')
    const [images, setImages] = useState(pd.images ? edit ? [...pd.images, null] : [...pd.images] : [null])
    const dispatch = useDispatch()

    const _onEditPress = () => {
        dispatch(editEating({
            api_token,
            product_id: pd.id,
            ar_name,
            name,
            price,
            ar_description,
            description,
            details,
            type: selectedType == 1 ? 'kashta' : 'popular_eating',
            category_id,
            images
        }))
    }

    console.log("EatingDetails category_id: ", category_id)
    return (
        <SafeAreaView style={styles.container}>
            {pd && <ScrollView style={styles.container}>
                <ImagesList _images={images} _setImages={setImages} />
                {/* <ImagePickerButton image={image} setImage={setImage} /> */}
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addEating.name') + I18n.t('arabic')}
                    _value={ar_name}
                    _setValue={setAR_Name}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addEating.name') + I18n.t('english')}
                    _value={name}
                    _setValue={setName}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addEating.desc') + I18n.t('arabic')}
                    _value={ar_description}
                    _setValue={setAR_Description}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addEating.desc') + I18n.t('english')}
                    _value={description}
                    _setValue={setDescription}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addEating.details')}
                    _value={details}
                    _setValue={setDetails}
                />
                <EntryField
                    _edit={edit}
                    _title={I18n.t('provider.products.addEating.price')}
                    numeric={true}
                    _value={price}
                    _setValue={setPrice}
                />
                {/* <MultiChoice
                    _label={I18n.t('provider.products.addEating.type')}
                    _choices={types}
                    _selected={selectedType}
                    _setSelected={setSelectedType}
                /> */}
                {selectedType == 1 && <MultiChoice
                    _label={I18n.t('provider.products.addEating.cat')}
                    _choices={kashtaCategories}
                    _selected={category_id}
                    _setSelected={setSelectedCat}
                />}
                {selectedType == 2 && <MultiChoice
                    _label={I18n.t('provider.products.addEating.cat')}
                    _choices={eatingCategories}
                    _selected={category_id}
                    _setSelected={setSelectedCat}
                />}
                {edit && !addEatingLoading && <TouchableOpacity style={styles.saveButton} onPress={() => _onEditPress()}>
                    <Text style={styles.saveText}>{I18n.t('provider.products.saveChanges')}</Text>
                </TouchableOpacity>}
                {addEatingLoading && <Spinner size='large' color='#F47421' />}
            </ScrollView>}
        </SafeAreaView>
    )
}

export default EatingDetails;