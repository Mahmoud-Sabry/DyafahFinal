import React, { useState, useEffect, useRef } from 'react'
import { useInterval } from '../useInterval';
import Slideshow from 'react-native-slideshow';
import styles from './styles';

const defaultData = [
    { url: require('../../assets/images/logo.png') }
]

const index = ({ Height, custStyle, DataSource }) => {
    DataSource = DataSource ? DataSource : []
    const [pos, setPos] = useState(0);

    useInterval(() => {
        let val = pos === DataSource.length ? -1 : pos;
        setPos(val + 1);
    }, 5000);

    return (
        <Slideshow
            height={Height ? Height : 200}
            dataSource={DataSource.length > 0 ? DataSource : defaultData}
            position={pos}
            onPositionChanged={position => setPos(position)}
            onPress={(obj) => console.log("OBJ : ", obj.index)}
            containerStyle={custStyle ? custStyle : styles.AdsContainer}
        />
    )
}

export default index
