// @flow

import React, { Component } from "react";
import { observable, computed } from "mobx";
import { observer, inject } from "mobx-react";

import type Account from "src/models/Account";

import List from "./List";
import EventSelector from "./EventSelector";

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
  @observable showDepartments: Boolean = false;

  @computed
  get events(): Array<{ calendar: Calendar, event: Event }> {
    const events = this.props.account.calendars
      .map(calendar => calendar.events.map(event => ({ calendar, event })))
      .flat();

    // Sort events by date-time, ascending
    events.sort((a, b) => a.event.date.diff(b.event.date).valueOf());
    return events;
  }

  setSelectedEvents(selection: number) {
    let events = null;

    if (selection !== "show all") {
      //filter events by calendar id
      const calendar = this.props.account.calendars.filter(
        calendar => calendar.id === selection
      )[0];

      events = calendar.events.map(event => ({
        calendar,
        event
      }));

      // Sort events by date-time, ascending
      events.sort((a, b) => a.event.date.diff(b.event.date).valueOf());
    }

    this.selectedEvents = events;
  }

  toggleShowDepartments() {
    this.showDepartments = !this.showDepartments;
  }

  render() {
    return (
      <div className={style.outer}>
        <div className={style.container}>
          <div className={style.header}>
            <span className={style.title}>{this.props.account.greeting}</span>
          </div>
          <div className={style.selector}>
            <EventSelector
              calendars={this.props.account.calendars}
              setSelectedEvents={(e => {
                this.setSelectedEvents(e);
              }).bind(this)}
            />
            <button
              onClick={(() => {
                this.toggleShowDepartments();
              }).bind(this)}
              className={style.button}
            >
              toggle departments
            </button>
          </div>
          <List
            showDepartments={this.showDepartments}
            selectedEvents={this.selectedEvents}
            events={this.events}
          />
        </div>
      </div>
    );
  }
}

export default Agenda;
