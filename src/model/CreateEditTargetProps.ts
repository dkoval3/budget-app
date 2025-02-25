import {
    TargetTimeframe,
    TargetType,
    Weekday,
} from "@/model/Target";

export interface CreateEditTargetProps {
    className?: string
    setIsEditing: (isEditing: boolean) => void,
}

export interface CreateRecurringTargetProps {
    className?: string,
    setters: Setters,
    values: Values,
    optionsToDisplay?: string[],
}

export interface CreateCustomTargetProps {
    setters: Setters,
    values: Values,
}

export interface OptionsInputProps {
    label: string,
    onChange: (idx: number) => void,
    optionsToDisplay: string[],
}

export interface DateInputProps {
    label: string,
    setDate: (dueDate: Date | undefined) => void,
}

export interface AmountInputProps {
    label: string,
    setAmount: (amount: number) => void,
    amount?: number,
}

export interface Setters {
    setTimeframe: (timeframe: TargetTimeframe | undefined) => void,
    setAmount: (amount: number) => void,
    setDue: (dueDate: Date | undefined) => void,
    setType: (type: TargetType) => void,
}

export interface Values {
    timeframe: TargetTimeframe | undefined,
    amount: number,
    due: Date | undefined,
    type: TargetType,
}