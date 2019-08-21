// @flow

import { observable } from "mobx";

import type Calendar from "./Calendar";

class Account {
  @observable
  calendars: Array<Calendar> = [];
  @observable
  greeting: string;
}

export default Account;
