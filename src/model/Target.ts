export const WEEKLY = 'WEEKLY';
export const MONTHLY = 'MONTHLY';
export const YEARLY = 'YEARLY';
export const TargetTimeframes = [WEEKLY, MONTHLY, YEARLY];
export type TargetTimeframe = 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export const SUNDAY = 'Sunday';
export const MONDAY = 'Monday';
export const TUESDAY = 'Tuesday';
export const WEDNESDAY = 'Wednesday';
export const THURSDAY = 'Thursday';
export const FRIDAY = 'Friday';
export const SATURDAY = 'Saturday';
export const Weekdays = [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY];
export type Weekday = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export function isWeekday(day: string): day is Weekday {
    return Weekdays.includes(day);
}

export const FILL_UP = 'FILL_UP';
export const SET_ASIDE = 'SET_ASIDE';
export const HAVE_BALANCE = 'HAVE_BALANCE';
export type TargetType = 'FILL_UP' | 'SET_ASIDE' | 'HAVE_BALANCE'
export const TargetTypes = [SET_ASIDE, FILL_UP, HAVE_BALANCE];

export interface CustomTarget {
    amount: number,
    type: TargetType,
    due?: Date
}

export interface RecurringTarget extends Omit<CustomTarget, 'due'> {
    timeframe: TargetTimeframe,
    due: Date
}

export type Target = RecurringTarget | CustomTarget;

export function isRecurringTarget(target: Target): target is RecurringTarget {
    return (target as RecurringTarget).timeframe !== undefined;
}

export const timeframeMessageMap = {
    [WEEKLY]: ['week', 'By'],
    [MONTHLY]: ['month', 'By the'],
    [YEARLY]: ['year', 'By'],
};