export const WEEKLY = 'WEEKLY';
export const MONTHLY = 'MONTHLY';
export const YEARLY = 'YEARLY';
export const TargetTimeframes = [WEEKLY, MONTHLY, YEARLY];
export type TargetTimeframe = 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export const SUNDAY = 'SUNDAY';
export const MONDAY = 'MONDAY';
export const TUESDAY = 'TUESDAY';
export const WEDNESDAY = 'WEDNESDAY';
export const THURSDAY = 'THURSDAY';
export const FRIDAY = 'FRIDAY';
export const SATURDAY = 'SATURDAY';

export type Weekday = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';
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