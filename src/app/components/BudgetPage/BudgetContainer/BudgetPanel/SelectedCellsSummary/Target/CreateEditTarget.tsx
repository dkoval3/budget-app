'use client'

import {
    FILL_UP,
    MONTHLY,
    SET_ASIDE,
    SUNDAY,
    TargetTimeframe,
    TargetType,
    Weekday,
    Weekdays,
    WEEKLY,
    YEARLY
} from "@/model/Target";
import {useState} from "react";
import {numToDay, toRegularCase} from "@/common/Formatter";
import {CreateEditTargetProps} from "@/model/CreateEditTargetProps";
import {CreateCustomTarget, CreateRecurringTarget} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/Target/CreateEditTargetServer";
import Button1 from "@/app/components/Button/Button1";

const weeklyLabels: [string, string, string] = ['I need', 'Every', 'Next week, I want to'];
const weeklyOptions: [string[], string[]] = [Weekdays.map(day => toRegularCase(day)), [FILL_UP, SET_ASIDE]];

const monthlyLabels: [string, string, string] = ['I need', 'By', 'Next month, I want to'];
const monthlyOptions: [string[], string[]] = [Array.from({ length: 31 }, (_, i) => numToDay(i + 1)), [FILL_UP, SET_ASIDE]];

const yearlyLabels: [string, string, string] = ['I need', 'By', 'Next year, I want to'];
const yearlyOptions: [string[], string[]] = [[], [FILL_UP, SET_ASIDE]];

export default function CreateEditTarget({ context }: CreateEditTargetProps) {
    const [recurrence, setRecurrence] = useState<TargetTimeframe | undefined>(WEEKLY);
    const [amount, setAmount] = useState<number>(0);
    const [by, setBy] = useState<Weekday | number | Date>(SUNDAY);
    const [type, setType] = useState<TargetType>(SET_ASIDE);

    const setters = {setRecurrence, setAmount, setBy, setType};
    const values = {recurrence, amount, by, type};


    const className = 'text-sm rounded hover:bg-sidebarBackground transition-colors';

    const onClick = (timeframe: TargetTimeframe | undefined) => {
        setRecurrence(timeframe);
        setAmount(0);
        setBy(SUNDAY);
        setType(SET_ASIDE);
    }

    return <div className='flex flex-col border-t-[0.5px] border-gray-700'>
        <div className='flex justify-between p-1 mt-1 bg-gray-600 rounded-lg'>
            <button className={className} onClick={() => onClick(WEEKLY)}>Weekly</button>
            <button className={className} onClick={() => onClick(MONTHLY)}>Monthly</button>
            <button className={className} onClick={() => onClick(YEARLY)}>Yearly</button>
            <button className={className} onClick={() => onClick(undefined)}>Custom</button>
        </div>
        {
            recurrence === WEEKLY ?
                <CreateRecurringTarget labels={weeklyLabels} options={weeklyOptions} setters={setters} values={values}/> :
                recurrence === MONTHLY ?
                    <CreateRecurringTarget labels={monthlyLabels} options={monthlyOptions} setters={setters} values={values}/> :
                    recurrence === YEARLY ?
                        <CreateRecurringTarget labels={yearlyLabels} options={yearlyOptions} useDateSelector={true}
                                               setters={setters} values={values}/> :
                        <CreateCustomTarget setters={setters} values={values}/>
        }
        <Button1 className='m-2' text='Save Target' />
    </div>;
}