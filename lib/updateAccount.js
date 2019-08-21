// @flow

import faker from "faker";
import capitalize from "lodash/capitalize";
import { DateTime } from "luxon";

import flipACoin from "lib/flipACoin";
import pickRandomOne from "lib/pickRandomOne";
import greeting from "lib/greeting";

import type Account from "src/models/Account";

/**
 * Change title or date-time of one random event
 * from a random calendar of the passed account
 */

const updateAccount = (account: Account) => {
  const calendar = pickRandomOne(account.calendars);
  const event = pickRandomOne(calendar.events);

  account.greeting = greeting(DateTime.local().hour);

  if (flipACoin()) {
    event.title = capitalize(faker.company.bs());
  } else {
    event.date = event.date.plus({
      hour: flipACoin() ? -1 : 1
    });
  }
};

export default updateAccount;
