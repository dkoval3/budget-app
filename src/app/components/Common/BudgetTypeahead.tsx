import {ChangeEvent, useRef, useState} from "react";

export function BudgetTypeahead({ className, setValue, options, width }: BudgetTypeaheadProps) {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showOptions, setShowOptions] = useState(false);
    const [typeaheadValue, setTypeaheadValue] = useState('');
    const ref = useRef<HTMLInputElement | null>(null);

    const filterOptions = (value: string) => options.filter(item => item.toLowerCase().includes(value.toLowerCase()));

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTypeaheadValue(e.target.value);
        setValue(e.target.value);
        setFilteredOptions(filterOptions(e.target.value));
    }

    return(
        <div className={`${className} relative`}>
            <input
                className={`${width} p-1 bg-sidebarBackground`}
                type='text'
                ref={ref}
                value={typeaheadValue}
                onFocus={() => setShowOptions(true)}
                onBlur={() => setShowOptions(false)}
                onChange={onChange}
            />
            <ul className='flex flex-col items-start absolute max-h-44 w-full overflow-y-scroll bg-sidebarBackground'>
                {
                    showOptions
                        ? filteredOptions.map((item, idx) => (
                            <button
                                className='mx-3 py-1'
                                key={idx}
                                onClick={() => {
                                    setTypeaheadValue(item);
                                    setValue(item);
                                    setFilteredOptions(filterOptions(item));
                                    ref.current?.blur();
                                }}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                {item}
                            </button>
                        ))
                        : null
                }
            </ul>
        </div>
    );
}

interface BudgetTypeaheadProps {
    className?: string,
    width?: string
    setValue: (value: string) => void,
    options: string[],
}
