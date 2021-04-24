import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
// import Animated from 'react-native-reanimated';

const TabBar = ({ state, descriptors, navigation, position }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;
                const contStyle = !isFocused ? styles.TabContainer : styles.contTabContainer;
                const custTextStyle = !isFocused ? styles.TabText : styles.custTabText;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                // modify inputRange for custom behavior
                // const inputRange = state.routes.map((_, i) => i);
                // const opacity = Animated.interpolate(position, {
                //     inputRange,
                //     outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                // });
                var corner = null;
                if (route.name == 'New') {
                    corner = styles.cornerRight
                } else if (route.name == 'Finished') {
                    corner = styles.cornerLeft
                }
                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[contStyle, corner]}
                    >
                        <Text style={custTextStyle}>{label}</Text>
                        {/* <Animated.Text style={{ opacity }}>{label}</Animated.Text> */}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default TabBar