// @flow

import React from "react";

import style from "./style";

import EventCell from "../EventCell/";

/**
 * Generic list container
 */

type tProps = {
  showDepartments: Boolean,
  selectedEvents: Array,
  events: Array
};

export default ({ showDepartments, selectedEvents, events }: tProps) => {
  events = selectedEvents ? selectedEvents : events;

  const sortDepartments = events => {
    let sortedEvents = {};

    for (let event of events) {
      if (!sortedEvents[event.event.department]) {
        sortedEvents[event.event.department] = [event];
      } else {
        sortedEvents[event.event.department].push(event);
      }
    }

    return sortedEvents;
  };

  const sortedEvents = showDepartments ? sortDepartments(events) : false;

  return (
    <div className={style.outer}>
      {sortedEvents
        ? Object.keys(sortedEvents).map(eventDepartment => (
            <div>
              <div className={style.header}>{eventDepartment}</div>
              {sortedEvents[eventDepartment].map(({ calendar, event }) => (
                <EventCell key={event.id} calendar={calendar} event={event} />
              ))}{" "}
            </div>
          ))
        : events.map(({ calendar, event }) => (
            <EventCell key={event.id} calendar={calendar} event={event} />
          ))}{" "}
    </div>
  );
};
