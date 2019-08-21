// @flow

import React from "react";
import { observer } from "mobx-react";

import style from "./style";

/**
 * Format a date-time to time only string
 */

/**
 * Event cell component
 * Displays time of event, title and department (if any)
 */

export default observer(props => {
  return (
    <div className={style.select}>
      <select
        onChange={e => {
          props.events(e.target.value);
        }}
      >
        {props.calendars.map((calendar, index) => {
          return (
            <option value={calendar.id} key={index}>
              {calendar.color}
            </option>
          );
        })}
        <option value={"show all"}>show all</option>
      </select>
    </div>
  );
});
