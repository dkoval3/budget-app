import {FRIDAY, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESDAY, WEDNESDAY, Weekday} from "@/model/Target";

export function dayIdxToWeekday(num: number): Weekday {
    if (num < 0 || num > 6) { throw new Error('Invalid day index'); }
    switch (num) {
        case 0: return SUNDAY;
        case 1: return MONDAY;
        case 2: return TUESDAY;
        case 3: return WEDNESDAY;
        case 4: return THURSDAY;
        case 5: return FRIDAY;
        case 6: return SATURDAY;
    }
    return SUNDAY;
}

export function weekdayToDayIdx(weekday: Weekday): number {
    switch (weekday) {
        case SUNDAY: return 0;
        case MONDAY: return 1;
        case TUESDAY: return 2;
        case WEDNESDAY: return 3;
        case THURSDAY: return 4;
        case FRIDAY: return 5;
        case SATURDAY: return 6;
    }
}

export function weekdayNumToDate(selectedDay: number): Date {
    const today = new Date();
    const currDay = today.getDay();

    today.setDate(today.getDate() + (selectedDay - currDay));
    return today;
}

export function weekdayToDate(selectedDayNum: Weekday): Date {
    const selectedDay = weekdayToDayIdx(selectedDayNum);
    return weekdayNumToDate(selectedDay)
}

export function monthDayToDate(selectedDay: number): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), selectedDay);
}