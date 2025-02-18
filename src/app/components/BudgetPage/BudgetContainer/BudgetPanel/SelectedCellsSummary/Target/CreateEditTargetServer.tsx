import {
    AmountInputProps, CreateCustomTargetProps,
    CreateRecurringTargetProps,
    DateInputProps,
    OptionsInputProps
} from "@/model/CreateEditTargetProps";
import {TargetTypes} from "@/model/Target";
import {formatAsDollarAmount, nextMonthMessage} from "@/common/Formatter";
import {ChangeEvent} from "react";

export const OptionsInput = ({ label, options }: OptionsInputProps) => {
    return(
        <div className='flex flex-col p-2'>
            <label>{label}</label>
            <select className='bg-sidebarBackground border-[0.5px] rounded'>
                { options.map((option, i) => <option key={i}>{option}</option>) }
            </select>
        </div>
    );
}

export const DateInput = ({ label }: DateInputProps) => {
    return(
        <div className='flex flex-col px-2 py-1'>
            <label>{label}</label>
            <input className='bg-sidebarBackground border-[0.5px] rounded' type='date' />
        </div>
    );
}

export const AmountInput = ({ label, setAmount, amount }: AmountInputProps) => {
    const onClick = (e: ChangeEvent<HTMLInputElement>) => {
        const amount = e.target.value === '' ? 0 : parseFloat(e.target.value);
        setAmount(amount);
    }
    return(
        <div className='flex flex-col px-2 py-1'>
            <label>{label}</label>
            <input className='bg-sidebarBackground border-[0.5px] rounded' type='text' onChange={(e) => onClick(e)} defaultValue={amount}/>
        </div>
    );
}

export const CreateRecurringTarget = ({ labels, options, useDateSelector = false, setters, values }: CreateRecurringTargetProps) => {
    return(
        <div>
            <AmountInput label={labels[0]} setAmount={setters.setAmount} amount={values.amount} />
            { useDateSelector ? <DateInput label={labels[1]} /> : <OptionsInput label={labels[1]} options={options[0]} /> }
            <OptionsInput label={labels[2]} options={options[1].map((type) => `${nextMonthMessage(type)} ${formatAsDollarAmount(values.amount)}`)} />
        </div>
    );
}

export const CreateCustomTarget = ({ setters, values }: CreateCustomTargetProps) => {
    return(
        <div>
            <AmountInput label={'Amount'} setAmount={setters.setAmount} amount={values.amount} />
            <OptionsInput label='I want to' options={TargetTypes.map((type) => `${nextMonthMessage(type)} ${formatAsDollarAmount(values.amount)}`)} />
            <DateInput label='Due on' />
        </div>
    );
};