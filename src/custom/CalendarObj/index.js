import React from 'react'
import styles from './styles'
import { Calendar } from 'react-native-calendars';
import moment from 'moment';


const Calendarobj = ({ _markedDates, _setmarkedDates, _days, _setDays, _press }) => {
    const _format = 'YYYY-MM-DD'
    const date = new Date;
    const today = date.getDate();

    function myFunction(array, day) {
        let arr = []
        let found = false
        array.forEach(element => {
            if (element != day) {
                arr.push(element)
            } else {
                found = true
            }
        });
        found ? null : arr.push(day);
        return arr;
    }

    _onSelectDay = (day) => {
        console.log("_onSelectDay: ", day)
        const _selectedDay = moment(day.dateString).format(_format)
        let markedDates = {}
        if (_markedDates[_selectedDay]) {
            _setDays(myFunction(_days, day.day))
            const { selected } = _markedDates[_selectedDay]
            markedDates = { selected: !selected, marked: !selected };
            const updatedMarkedDates = { ..._markedDates, ...{ [_selectedDay]: markedDates } }
            _setmarkedDates({ ...updatedMarkedDates })
        } else {
            _setDays([..._days, day.day])
            markedDates = { ...markedDates, ...{ selected: true, marked: true } }
            const updatedMarkedDates = { ..._markedDates, ...{ [_selectedDay]: markedDates } }
            _setmarkedDates({ ...updatedMarkedDates })
        }
    }
    return (
        <Calendar
            style={styles.calendarContainer}
            theme={{
                'stylesheet.day.basic': {
                    today: styles.calToday,
                    todayText: styles.calTodayText
                },
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#F47421',
                selectedDayBackgroundColor: '#F47421',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#F47421',
                dayTextColor: '#F47421',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: '#989797',
                monthTextColor: '#F47421',
                indicatorColor: 'blue',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
            }}
            firstDay={- 1}
            hideArrows={true}
            hideExtraDays={true}
            markingType={'simple'}
            disableMonthChange={true}
            monthFormat={'MMMM yyyy'}
            markedDates={_markedDates}
            onPressArrowLeft={() => null}
            onPressArrowRight={() => null}
            onDayPress={(day) => !_press ? _onSelectDay(day) : null}
        />
    )
}

export default Calendarobj;