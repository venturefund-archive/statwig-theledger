import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function DateFs({t}) {
    const [state, setState] = React.useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);
  return <>
  <div className="valueDisplay">
            <div className="groupFlex fromData">
                <label htmlFor="from">{t("from")}</label>
                {/* <input type="text" placeholder='DD/MM/YYYY' /> */}
            </div>
            <div className="groupFlex toData">
            <label htmlFor="to">{t("to")}</label>
                {/* <input type="text" placeholder='DD/MM/YYYY' /> */}
            </div>
        </div>
        <DateRange
  editableDateInputs={true}
  onChange={item => setState([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={state}
/>
        </>;
}
