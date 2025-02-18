import {TargetTimeframe, TargetType, Weekday} from "@/model/Target";

export interface CreateEditTargetProps {
    className?: string
    context: 'create' | 'edit',
}

export interface CreateRecurringTargetProps {
    className?: string,
    labels: [string, string, string],
    options: [string[], string[]]
    useDateSelector?: boolean,
    setters: Setters,
    values: Values,
}

export interface CreateCustomTargetProps {
    setters: Setters,
    values: Values,
}

export interface OptionsInputProps {
    label: string,
    options: string[],
}

export interface DateInputProps {
    label: string
}

export interface AmountInputProps {
    label: string,
    setAmount: (amount: number) => void,
    amount?: number,
}

export interface Setters {
    setRecurrence: (recurrence: TargetTimeframe | undefined) => void,
    setAmount: (amount: number) => void,
    setBy: (dueDate: Weekday | number | Date) => void,
    setType: (type: TargetType) => void,
}

export interface Values {
    recurrence: TargetTimeframe | undefined,
    amount: number,
    by: Weekday | number | Date,
    type: TargetType,
}