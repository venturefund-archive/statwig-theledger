import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import './style.scss';

const Calendar = (props) => {
    const { filterTableByCalendar, startDate, endDate } = props;

    const [state, setState] = useState([
        {
            startDate,
            endDate,
            key: 'selection'
        }
    ]);

    // useEffect(() => {
    //     if(state[0] && state[0].endDate !== null) {
    //         setTimeout(() => {
    //             filterTableByCalendar(state[0]);
    //         }, 1000);
    //     }
    // }, [state]);

    const onDateChange = (values) => {
        filterTableByCalendar(values.selection);
        setState([values.selection]);
    }

    return (
        <DateRange
            endDatePlaceholder={'End Date'}
            startDatePlaceholder={'Start Date'}
            onChange={onDateChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={state}
        />
    )
};

export default Calendar;