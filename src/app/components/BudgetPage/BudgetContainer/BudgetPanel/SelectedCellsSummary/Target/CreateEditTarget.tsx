import {
    isRecurringTarget,
    MONTHLY,
    SET_ASIDE,
    TargetTimeframe,
    TargetType,
    WEEKLY,
    YEARLY
} from "@/model/Target";
import {useState} from "react";
import {CreateEditTargetProps} from "@/model/CreateEditTargetProps";
import {
    CreateCustomTarget, CreateMonthlyTarget,
    CreateWeeklyTarget, CreateYearlyTarget
} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/Target/CreateEditTargetServer";
import Button1 from "@/app/components/Button/Button1";
import UseBudget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";

export default function CreateEditTarget({ setIsEditing }: CreateEditTargetProps) {
    const { subBudget, addTarget, target } = UseBudget();
    let passedTimeframe: TargetTimeframe | undefined = WEEKLY;

    if (!!target) {
        if (isRecurringTarget(target)) {
            passedTimeframe = target.timeframe;
        } else {
            passedTimeframe = undefined;
        }
    }

    const [timeframe, setTimeframe] = useState<TargetTimeframe | undefined>(passedTimeframe);
    const [amount, setAmount] = useState<number>(!!target ? target.amount : 0);
    const [due, setDue] = useState<Date | undefined>(target?.due);
    const [type, setType] = useState<TargetType>(!!target ? target.type : SET_ASIDE);

    const setters = {setTimeframe, setAmount, setDue, setType};
    const values = {timeframe, amount, due, type};

    const onSaveTarget = () => {
        addTarget(subBudget[0].index.i, subBudget[0].index.j, values);
        setIsEditing(false);
    }

    const className = 'text-sm rounded hover:bg-sidebarBackground transition-colors';

    const onClick = (timeframe: TargetTimeframe | undefined) => {
        setTimeframe(timeframe);
        setAmount(0);
        setDue(undefined);
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
            timeframe === WEEKLY ?
                <CreateWeeklyTarget setters={setters} values={values}/> :
                timeframe === MONTHLY ?
                    <CreateMonthlyTarget setters={setters} values={values}/> :
                    timeframe === YEARLY ?
                        <CreateYearlyTarget setters={setters} values={values}/>
                        :
                        <CreateCustomTarget setters={setters} values={values}/>
        }
        <Button1 onClick={onSaveTarget} className='m-2' text='Save Target' />
    </div>;
}