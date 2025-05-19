import {ChangeEvent, MouseEventHandler, useRef, useState} from "react";

export function BudgetTypeahead(
    {
        className,
        bgColor = 'bg-sidebarBackground',
        options,
        width,
        onChange = () => {},
        onSelect = () => {},
        onMouseDown = () => {},
        defaultValue = '',
    }: BudgetTypeaheadProps) {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showOptions, setShowOptions] = useState(false);
    const [typeaheadValue, setTypeaheadValue] = useState(defaultValue);
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
                className={`${width} ${bgColor} p-1`}
                type='text'
                ref={ref}
                value={typeaheadValue}
                onFocus={() => setShowOptions(true)}
                onBlur={() => setShowOptions(false)}
                onMouseDown={onMouseDown}
                onChange={internalOnChange}
            />
            <ul className='flex flex-col z-50 items-start absolute max-h-44 w-full overflow-y-scroll bg-sidebarBackground'>
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
    bgColor?: string,
    width?: string
    onMouseDown?: MouseEventHandler,
    defaultValue?: string,
    onSelect?: (v: string, i: number) => void,
    onChange?: () => void,
    options: string[],
}
