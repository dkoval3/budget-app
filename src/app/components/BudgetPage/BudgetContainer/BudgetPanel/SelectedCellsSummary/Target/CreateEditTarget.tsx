'use client'

import {
    FILL_UP, MONTHLY, SET_ASIDE, SUNDAY, TargetTimeframe, TargetType, Weekday, Weekdays, WEEKLY, YEARLY
} from "@/model/Target";
import {useState} from "react";
import {numToDay, toRegularCase} from "@/common/Formatter";

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

  return <div className='border-t-[0.5px] border-gray-700'>
      <div className='flex justify-between p-1 mt-1 bg-gray-600 rounded-lg'>
          {/*<Button1 text='Weekly' onClick={() => setRecurrence(WEEKLY)} />*/}
          {/*<Button1 text='Monthly' onClick={() => setRecurrence(MONTHLY)} />*/}
          {/*<Button1 text='Yearly' onClick={() => setRecurrence(YEARLY)} />*/}
          {/*<Button1 text='Custom' onClick={() => setRecurrence(undefined)} />*/}
          <button className='text-sm rounded hover:bg-sidebarBackground transition-colors' onClick={() => setRecurrence(WEEKLY)}>Weekly</button>
          <button className='text-sm rounded hover:bg-sidebarBackground transition-colors' onClick={() => setRecurrence(MONTHLY)}>Monthly</button>
          <button className='text-sm rounded hover:bg-sidebarBackground transition-colors' onClick={() => setRecurrence(YEARLY)}>Yearly</button>
          <button className='text-sm rounded hover:bg-sidebarBackground transition-colors' onClick={() => setRecurrence(undefined)}>Custom</button>
      </div>
      {
          recurrence === WEEKLY ? <CreateRecurringTarget labels={weeklyLabels} options={weeklyOptions} /> :
              recurrence === MONTHLY ? <CreateRecurringTarget labels={monthlyLabels} options={monthlyOptions} /> :
                  recurrence === YEARLY ? <CreateRecurringTarget labels={yearlyLabels} options={yearlyOptions} useDateSelector={true} /> : null
      }
  </div>;
}

const CreateRecurringTarget = ({ labels, options, useDateSelector = false }: CreateTargetProps) => {
    const OptionsInput = () => {
        return(
            <div className='flex flex-col p-2'>
                <label>{labels[1]}</label>
                <select className='bg-sidebarBackground border-[0.5px] rounded'>
                    { options[0].map((day, i) => <option key={i}>{day}</option>) }
                </select>
            </div>
        );
    }

    const DateInput = () => {
        return(
            <div className='flex flex-col px-2 py-1'>
                <label>{labels[1]}</label>
                <input className='bg-sidebarBackground border-[0.5px] rounded' type='date' />
            </div>
        );
    }

    return(
        <div>
            <div className='flex flex-col px-2 py-1'>
                <label>{labels[0]}</label>
                <input className='bg-sidebarBackground border-[0.5px] rounded' type='text' />
            </div>
            <div>
                { useDateSelector ? <DateInput /> : <OptionsInput /> }
                <div className='flex flex-col px-2 py-1'>
                    <label>{labels[2]}</label>
                    <select className='bg-sidebarBackground border-[0.5px] rounded'>
                        { options[1]
                            .map((type, i) =>
                                <option key={i}>{nextMonthMessage(type)} $0.00</option>
                            )
                        }
                    </select>
                </div>
            </div>
        </div>
    );
}

const nextMonthMessage = (type: string) => {
    if (type === FILL_UP) return 'Refill up to ';
    if (type === SET_ASIDE) return 'Set aside another ';
    else throw new Error('Invalid target type');
}

interface CreateEditTargetProps {
    className?: string
    context: 'create' | 'edit',
}

interface CreateTargetProps {
    className?: string,
    labels: [string, string, string],
    options: [string[], string[]]
    useDateSelector?: boolean,
}