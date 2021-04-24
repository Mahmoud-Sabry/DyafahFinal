import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import Header from '../../custom/header';
import LangSection from '../../custom/LangSection';
import ConnectUS from '../../custom/ConnectUS';
import AboutSec from '../../custom/AboutSec';
import Terms from '../../custom/TermsConds';
import ShareSec from '../../custom/ShareSec';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from '../../Redux/Slices/Main/appUser';

const About = (props) => {
    const lang = useSelector(({ language }) => language.language)
    const terms = useSelector(({ appUser }) => appUser.termsCondition)
    const _privacy = useSelector(({ appUser }) => appUser.privacy)
    const dispatch = useDispatch()
    terms || _privacy ? null : dispatch(getSettings({}))
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Header props={props} />
            <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
                {/* Language Setting */}
                <LangSection />
                {/* Connect US */}
                <ConnectUS />
                {/* about DYAFAH */}
                <AboutSec />
                {/* Terms & Conds */}
                <Terms />
                {/* Send To Others */}
                <ShareSec />
            </ScrollView>
        </SafeAreaView>
    )
}

export default About
