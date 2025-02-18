export const WEEKLY = 'WEEKLY';
export const MONTHLY = 'MONTHLY';
export const YEARLY = 'YEARLY';
export const TargetTimeframes = [WEEKLY, MONTHLY, YEARLY];
export type TargetTimeframe = 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export const SUNDAY = 'Sunday';
export const MONDAY = 'Monthday';
export const TUESDAY = 'Tuesday';
export const WEDNESDAY = 'Wednesday';
export const THURSDAY = 'Thursday';
export const FRIDAY = 'Friday';
export const SATURDAY = 'Saturday';

export type Weekday = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
export const Weekdays = [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY];

export const FILL_UP = 'FILL_UP';
export const SET_ASIDE = 'SET_ASIDE';
export const HAVE_BALANCE = 'HAVE_BALANCE';
export type TargetType = 'FILL_UP' | 'SET_ASIDE' | 'HAVE_BALANCE'
export const TargetTypes = [FILL_UP, SET_ASIDE, HAVE_BALANCE];

export interface CustomTarget {
    amount: number,
    type: TargetType,
    due?: Date | number | Weekday,
}

export interface RecurringTarget extends CustomTarget {
    timeframe: TargetTimeframe
}

export type Target = RecurringTarget | CustomTarget;

export const timeframeMessageMap = {
    [WEEKLY]: ['week', 'By'],
    [MONTHLY]: ['month', 'By the'],
    [YEARLY]: ['year', 'By'],
};