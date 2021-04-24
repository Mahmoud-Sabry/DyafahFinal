import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ColoredButton from '../ColoredButton'
import styles from './styles';
import { Icon } from 'native-base';
import I18n from '../../languages/I18n';

const ShareButton = ({ title, iconName, iconType }) => {

    return (
        <TouchableOpacity style={styles.shareButton}>
            <Icon type={iconType} name={iconName} style={styles.shareIcon} />
            <Text style={styles.shareText}>{title}</Text>
        </TouchableOpacity>
    )
}


const ShareSec = () => {

    const [secPressed, setSecPressed] = useState(false);

    return (
        <View>
            <ColoredButton
                title={I18n.t('about.share.title')}
                ContStyle={styles.sectionButton}
                OnPress={() => setSecPressed(!secPressed)}
            />
            {
                secPressed &&
                <>
                    <ShareButton
                        title={I18n.t('about.share.shareIos')}
                        iconName='apple1'
                        iconType='AntDesign'
                    />
                    {/* <ShareButton
                        title={I18n.t('about.share.shareAndroid')}
                        iconName='android1'
                        iconType='AntDesign'
                    /> */}
                </>
            }
        </View>
    )
}

export default ShareSec
