import {ChangeEvent, useRef, useState} from "react";

export function BudgetTypeahead(
    {
        className,
        options,
        width,
        onChange = () => {},
        onSelect = () => {},
    }: BudgetTypeaheadProps) {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showOptions, setShowOptions] = useState(false);
    const [typeaheadValue, setTypeaheadValue] = useState('');
    const ref = useRef<HTMLInputElement | null>(null);

    const filterOptions = (value: string) => options.filter(item => item.toLowerCase().includes(value.toLowerCase()));

    const internalOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTypeaheadValue(e.target.value);
        setFilteredOptions(filterOptions(e.target.value));
        onChange();
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
                onChange={internalOnChange}
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
                                    onSelect(item, idx);
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
    onSelect?: (v: string, i: number) => void,
    onChange?: () => void,
    options: string[],
}
