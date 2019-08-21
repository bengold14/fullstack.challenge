// @flow

import React, { Component } from "react";
import { observable, computed } from "mobx";
import { observer, inject } from "mobx-react";

import type Account from "src/models/Account";

import List from "./List";
import EventCell from "./EventCell";

import style from "./style";

/**
 * Agenda component
 * Displays greeting (depending on time of day)
 * and list of calendar events
 */

type tProps = {
  account: Account
};

@inject("account")
@observer
class Agenda extends Component<tProps> {
  /**
   * Return events from all calendars, sorted by date-time.
   * Returned objects contain both Event and corresponding Calendar
   */
  @observable selectedEvents: Array = null;

  @computed
  get events(): Array<{ calendar: Calendar, event: Event }> {
    const events = this.props.account.calendars
      .map(calendar => calendar.events.map(event => ({ calendar, event })))
      .flat();

    // Sort events by date-time, ascending
    events.sort((a, b) => a.event.date.diff(b.event.date).valueOf());
    return events;
  }

  set events(selection: number) {
    let events = null;
    if (selection !== "show all") {
      const calendar = this.props.account.calendars.filter(
        calendar => calendar.id === selection
      )[0];
      events = calendar.events.map(event => {
        if (event) {
          return { calendar, event };
        }
      });
      // Sort events by date-time, ascending
      events.sort((a, b) => a.event.date.diff(b.event.date).valueOf());
    }
    this.selectedEvents = events;
  }

  render() {
    return (
      <div className={style.outer}>
        <div className={style.container}>
          <div className={style.header}>
            <span className={style.title}>{this.props.account.greeting}</span>
          </div>
          <select
            onChange={e => {
              this.events = e.target.value;
            }}
          >
            {this.props.account.calendars.map((calendar, index) => {
              return (
                <option value={calendar.id} key={index}>
                  {calendar.color}
                </option>
              );
            })}
            <option value={"show all"}>show all</option>
          </select>
          <List>
            {(this.selectedEvents ? this.selectedEvents : this.events).map(
              ({ calendar, event }) => (
                <EventCell key={event.id} calendar={calendar} event={event} />
              )
            )}
          </List>
        </div>
      </div>
    );
  }
}

export default Agenda;
