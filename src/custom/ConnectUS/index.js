import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ColoredButton from '../ColoredButton'
import styles from './styles';
import { Icon } from 'native-base';
import I18n from '../../languages/I18n';

const ConnectUS = () => {

    const [secPressed, setSecPressed] = useState(false);

    return (
        <View>
            <ColoredButton
                title={I18n.t('about.connectUs')}
                ContStyle={styles.sectionButton}
                OnPress={() => setSecPressed(!secPressed)}
            />
            {
                secPressed &&
                <View style={styles.shareButtonsView}>
                    <TouchableOpacity style={styles.shareButton}>
                        <Icon type='FontAwesome' name='facebook' style={styles.shareIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareButton}>
                        <Icon type='FontAwesome' name='whatsapp' style={styles.shareIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareButton}>
                        <Icon type='AntDesign' name='twitter' style={styles.shareIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareButton}>
                        <Icon type='FontAwesome' name='snapchat-ghost' style={styles.shareIcon} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default ConnectUS
