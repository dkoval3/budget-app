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
        value = '',
    }: BudgetTypeaheadProps) {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showOptions, setShowOptions] = useState(false);
    const ref = useRef<HTMLInputElement>({} as HTMLInputElement);

    const filterOptions = (value: string) => options.filter(item => item.toLowerCase().includes(value.toLowerCase()));

    const internalOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilteredOptions(filterOptions(e.target.value));
        onChange(e.target.value);
    }

    return (
        <div className={`relative ${className}`}>
            <input
                className={`${width} ${bgColor} p-1`}
                type='text'
                ref={ref}
                value={value}
                onFocus={() => setShowOptions(true)}
                onBlur={() => setShowOptions(false)}
                onMouseDown={onMouseDown}
                onChange={internalOnChange}
            />
            <ul className='flex flex-col z-50 items-start absolute max-h-44 w-full overflow-y-scroll bg-sidebarBackground'>
                {
                    showOptions
                        ? options.map((item, idx) => (
                            <>
                                {
                                    filteredOptions.includes(item) ?
                                        <button
                                            className='mx-3 py-1'
                                            key={crypto.randomUUID().toString()}
                                            onClick={e => {
                                                onSelect(item, idx);
                                                setFilteredOptions(filterOptions(item));
                                                ref.current.blur();
                                                e.preventDefault();
                                            }}
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            {item}
                                        </button> : null
                                }
                            </>))
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
    value?: string,
    onSelect?: (v: string, i: number) => void,
    onChange?: (v: string) => void,
    options: string[],
}
