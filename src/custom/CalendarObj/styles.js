import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    calendarContainer: {
        borderRadius: 25,
        marginVertical: 15,
        shadowColor: '#B4B2B2',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        height: 370,
        width: Dimensions.get('screen').width - 25,
        alignSelf: 'center',
    },
    calToday: {
        backgroundColor: '#F47421',
        borderRadius: 16,
    },
    calTodayText: {
        color: '#ffffff',
    },
})

export default styles

