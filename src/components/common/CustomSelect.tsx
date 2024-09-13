import {Checkbox, Divider, Input, Row, Select, SelectProps, Tag} from "antd";
import {useEffect, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";

interface CustomSelectProps extends SelectProps {
    options: Array<{ label: string; title: string; options?: { label: string; value: string; } }>;
    placeholder?: string;
    optionsPlaceholder?: string;
    showSearch?: boolean;
    onChange?: (value: string[]) => void;
    values?: any[];
}

const CustomSelect = ({options, placeholder, optionsPlaceholder, onChange, values, showSearch = false, ...restProps}) => {
    const [filteredOptions, setFilteredOptions] = useState([]);

    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);


    const handleSearch = (value: any) => {
        const trimmedValue = value.trim().toLowerCase();
        const filtered = options.map((option: any) => {
            const includesParent = option.label.toLowerCase().includes(trimmedValue)
            const filteredChildren = option.options?.filter((child: any) =>
                child.label.toLowerCase().includes(trimmedValue)
            ) || [];

            if (includesParent || filteredChildren.length > 0) {
                return {
                    ...option,
                    options: filteredChildren.length > 0 ? filteredChildren : option.options,
                }
            }
            return null;
        }).filter(option => option !== null);
        setFilteredOptions(filtered);
    };

    //TODO: Options Render (Set to checkbox) and fix backspace bug

    // Handle Parent (Title) Checkbox Selection
    // const handleParentChange = (parentLabel) => {
    //     const parentOption = filteredOptions.find(option => option.label === parentLabel);
    //     const childValues = parentOption?.options?.map(child => child.value) || [];
    //     const newValues = values.includes(parentLabel)
    //         ? values.filter(value => !childValues.includes(value)) // Deselect all children
    //         : [...values, ...childValues.filter(value => !values.includes(value))]; // Select all children
    //     setSelectedValues(newValues);
    // };
    //
    // // Handle individual child selection
    // const handleChildChange = (childValue) => {
    //     setSelectedValues(prevValues =>
    //         prevValues.includes(childValue)
    //             ? prevValues.filter(value => value !== childValue) // Deselect child
    //             : [...prevValues, childValue] // Select child
    //     );
    // };
    //
    // const optionRender = (option) => {
    //     if (option.options) {
    //         return (
    //             <div key={option.label}>
    //                 <Checkbox
    //                     indeterminate={
    //                         option.options.some(child => selectedValues.includes(child.value)) &&
    //                         !option.options.every(child => selectedValues.includes(child.value))
    //                     }
    //                     checked={option.options.every(child => selectedValues.includes(child.value))}
    //                     onChange={() => handleParentChange(option.label)}
    //                 >
    //                     {option.label}
    //                 </Checkbox>
    //                 {option.options.map(child => (
    //                     <div key={child.value} style={{ paddingLeft: '20px' }}>
    //                         <Checkbox
    //                             checked={selectedValues.includes(child.value)}
    //                             onChange={() => handleChildChange(child.value)}
    //                         >
    //                             {child.label}
    //                         </Checkbox>
    //                     </div>
    //                 ))}
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <Checkbox
    //                 key={option.value}
    //                 checked={selectedValues.includes(option.value)}
    //                 onChange={() => handleChildChange(option.value)}
    //             >
    //                 {option.label}
    //             </Checkbox>
    //         );
    //     }
    // };

    const dropdownRender = (menu: any) => (
        <>
            {showSearch &&
                <>
                    <Input onChange={(e) => handleSearch(e.target.value)}
                           placeholder={optionsPlaceholder ?? "Search..."}
                           variant={"borderless"}
                           prefix={<SearchOutlined/>}/>
                    <Divider className={'mb-3 mt-0.5 border-gray-300'}/>
                </>
            }
            {menu}
        </>
    )

    const tagRender = (props: any) => {
        const {label} = props
        return (
            <Row>
                <Tag style={{backgroundColor: 'var(--ant-primary-color)', color: 'white', borderRadius: '20px'}}>
                    {label}
                </Tag>
                <div>{placeholder}</div>
            </Row>
        )
    }

    return (
        <Select className={"custom-select"}
                options={filteredOptions}
                placeholder={placeholder}
                dropdownRender={dropdownRender}
                tagRender={tagRender}
                // optionRender={optionRender}
                onChange={onChange}
                value={values}
                mode={"multiple"}
                maxTagCount={0}
                showSearch={false}
                maxTagPlaceholder={() => values.length ? values.length : null}
                {...restProps}
        />
    );
}

export default CustomSelect;