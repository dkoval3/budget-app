import {
    AmountInputProps,
    CreateCustomTargetProps,
    CreateRecurringTargetProps,
    DateInputProps,
    OptionsInputProps
} from "@/model/CreateEditTargetProps";
import {FILL_UP, SET_ASIDE, TargetType, TargetTypes, Weekday, Weekdays,} from "@/model/Target";
import {formatAsDollarAmount, nextMonthMessage, numToDay, toRegularCase} from "@/common/Formatter";
import {ChangeEvent} from "react";
import {monthDayToDate, weekdayToDate} from "@/common/DateUtil";

const recurringTargetTypes: TargetType[] = [SET_ASIDE, FILL_UP];

const weeklyLabels: [string, string, string] = ['I need', 'Every', 'Next week, I want to'];
const weeklyDisplayOptions: string[] = Weekdays.map(day => toRegularCase(day));

const monthlyLabels: [string, string, string] = ['I need', 'By', 'Next month, I want to'];
const monthlyOptions = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
const monthlyDisplayOptions: string[] = monthlyOptions.map(i => numToDay(i));

const yearlyLabels: [string, string, string] = ['I need', 'By', 'Next year, I want to'];

export const OptionsInput = ({ label, optionsToDisplay, onChange }: OptionsInputProps) => {
    return(
        <div className='flex flex-col p-2'>
            <label>{label}</label>
            <select
                className='bg-sidebarBackground border-[0.5px] rounded'
                onChange={(e) => onChange(e.target.selectedIndex)}
            >
                { optionsToDisplay.map((option, i) =>
                    <option
                        key={i}>
                        {option}
                    </option>)
                }
            </select>
        </div>
    );
}

export const DateInput = ({ label, setDate }: DateInputProps) => {
    return(
        <div className='flex flex-col px-2 py-1'>
            <label>{label}</label>
            <input className='bg-sidebarBackground border-[0.5px] rounded' type='date' onChange={(e) => setDate(e.target.valueAsDate as Date)} />
        </div>
    );
}

export const AmountInput = ({ label, setAmount, amount }: AmountInputProps) => {
    const updateAmount = (e: ChangeEvent<HTMLInputElement>) => {
        const amount = e.target.value === '' ? 0 : parseFloat(e.target.value);
        setAmount(amount);
    }

    return(
        <div className='flex flex-col px-2 py-1'>
            <label>{label}</label>
            <input className='bg-sidebarBackground border-[0.5px] rounded' type='text' onChange={(e) => updateAmount(e)} defaultValue={amount}/>
        </div>
    );
}

export const CreateWeeklyTarget = ({ setters, values }: CreateRecurringTargetProps) => {
    return(
        <div>
            <AmountInput
                label={weeklyLabels[0]}
                setAmount={setters.setAmount}
                amount={values.amount}
            />
            <OptionsInput
                onChange={(idx) => setters.setDue(weekdayToDate(Weekdays[idx] as Weekday))}
                label={weeklyLabels[1]}
                optionsToDisplay={weeklyDisplayOptions}
            />
            <OptionsInput
                onChange={(idx) => setters.setType(recurringTargetTypes[idx] as TargetType)}
                label={weeklyLabels[2]}
                optionsToDisplay={recurringTargetTypes.map((type) => `${nextMonthMessage(type)} ${formatAsDollarAmount(values.amount)}`)}
            />
        </div>
    );
};

export const CreateMonthlyTarget = ({ setters, values }: CreateRecurringTargetProps) => {
    return(
        <div>
            <AmountInput
                label={monthlyLabels[0]}
                setAmount={setters.setAmount}
                amount={values.amount}
            />
            <OptionsInput
                onChange={(idx) => setters.setDue(monthDayToDate(parseInt(monthlyOptions[idx])))}
                label={monthlyLabels[1]}
                optionsToDisplay={monthlyDisplayOptions}
            />
            <OptionsInput
                onChange={(idx) => setters.setType(recurringTargetTypes[idx] as TargetType)}
                label={monthlyLabels[2]}
                optionsToDisplay={recurringTargetTypes.map((type) => `${nextMonthMessage(type)} ${formatAsDollarAmount(values.amount)}`)}
            />
        </div>
    );
};

export const CreateYearlyTarget = ({ setters, values }: CreateRecurringTargetProps) => {
    return(
        <div>
            <AmountInput
                label={yearlyLabels[0]}
                setAmount={setters.setAmount}
                amount={values.amount}
            />
            <DateInput
                setDate={setters.setDue}
                label={yearlyLabels[1]}
            />
            <OptionsInput
                onChange={(idx) => setters.setType(recurringTargetTypes[idx] as TargetType)}
                label={yearlyLabels[2]}
                optionsToDisplay={recurringTargetTypes.map((type) => `${nextMonthMessage(type)} ${formatAsDollarAmount(values.amount)}`)}
            />
        </div>
    );
};

export const CreateCustomTarget = ({ setters, values }: CreateCustomTargetProps) => {
    return(
        <div>
            <AmountInput label={'Amount'} setAmount={setters.setAmount} amount={values.amount} />
            <OptionsInput
                optionsToDisplay={TargetTypes.map((type) => `${nextMonthMessage(type as TargetType)} ${formatAsDollarAmount(values.amount)}`)}
                onChange={(idx) => setters.setType(TargetTypes[idx] as TargetType)}
                label='I want to'
            />
            <DateInput label='Due on' setDate={setters.setDue} />
        </div>
    );
};