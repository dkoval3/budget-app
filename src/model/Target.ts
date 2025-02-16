export enum TargetTimeframe {
    WEEKLY,
    MONTHLY,
    YEARLY,
}

export enum Weekday {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}
export enum TargetType {
    FILL_UP,
    HAVE_BALANCE,
    SET_ASIDE
}

export interface RecurringTarget {
    amount: number,
    type: TargetType,
    timeframe: TargetTimeframe
    due: Weekday | number | Date,
}

export interface CustomTarget {
    amount: number,
    type: TargetType,
    due?: Date,
}

export type Target = RecurringTarget | CustomTarget;