import {BudgetTypeahead} from "@/app/components/Common/BudgetTypeahead";
import {CASH, CREDIT} from "@/Constants";
import Button1 from "@/app/components/Button/Button1";

export default function CreateAccountForm ({ className }: CreateAccountFormProps) {
    return (
        <div className={`${className}`}>
            <div>
                <i className="bi bi-chevron-left"></i>
                <h1>Add New Account</h1>
                <i className="bi bi-x"></i>
            </div>
            <div>
            <input type='text' placeholder='Account Name' />
            </div>
            <div>
                <BudgetTypeahead options={[CASH, CREDIT]} />
            </div>
            <div>
                <input type='number' placeholder='Initial Balance' />
            </div>
            <div>
                <Button1 text='Submit' />
            </div>
        </div>
    );
};

interface CreateAccountFormProps {
    className?: string
}