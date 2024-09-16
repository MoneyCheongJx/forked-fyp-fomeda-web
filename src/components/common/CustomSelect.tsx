import {Divider, Input, Row, Tag, TreeSelect, TreeSelectProps} from "antd";
import {useEffect, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";

interface CustomSelectProps extends TreeSelectProps {
    options: Array<{
        title: string;
        value: string;
        key: string;
        children?: { title: string; value: string; key: string; }
    }>;
    placeholder?: string;
    optionsPlaceholder?: string;
    showSearch?: boolean;
    onChange?: (value: string[]) => void;
    values?: any[];
}

const CustomSelect = ({
                          options,
                          placeholder,
                          optionsPlaceholder,
                          onChange,
                          values,
                          showSearch = false,
                          ...restProps
                      }: CustomSelectProps) => {
    const [filteredOptions, setFilteredOptions] = useState<any[]>([]);

    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);


    const highlightSearchTerm = (text: string, searchTerm: string) => {
        if (!searchTerm) return text;
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ?
                <span key={index} className={"text-blue-700 font-bold"}>{part}</span>
                : part
        );
    };

    const handleSearch = (value: any) => {
        const trimmedValue = value.trim().toLowerCase();
        const filtered = options.map((option: any) => {
            const includesParent = option.title.toLowerCase().includes(trimmedValue)
            const filteredChildren = option.children?.filter((child: any) =>
                child.title.toLowerCase().includes(trimmedValue)
            ) || [];

            if (includesParent || filteredChildren.length > 0) {
                return {
                    ...option,
                    title: includesParent
                        ? highlightSearchTerm(option.title, trimmedValue) // Highlight parent title
                        : option.title,
                    children: filteredChildren.length > 0
                        ? filteredChildren.map((child: any) => ({
                            ...child,
                            title: highlightSearchTerm(child.title, trimmedValue), // Highlight child title
                        }))
                        : option.children,
                }
            }
            return null;
        }).filter(option => option !== null);
        setFilteredOptions(filtered);
    };

    const dropdownRender = (menu: any) => (
        <>
            {showSearch &&
                <>
                    <Input onChange={(e) => handleSearch(e.target.value)}
                           placeholder={optionsPlaceholder ?? "Search..."}
                           variant={"borderless"}
                           prefix={<SearchOutlined/>}
                           onKeyDown={(e) => e.stopPropagation()}/>
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
        <TreeSelect className={"custom-select"}
                    treeData={filteredOptions}
                    placeholder={placeholder}
                    dropdownRender={dropdownRender}
                    tagRender={tagRender}
                    onChange={onChange}
                    maxTagCount={0}
                    showSearch={false}
                    maxTagPlaceholder={() => values?.length ? values.length : null}
                    treeCheckable={true}
                    {...restProps}
        />
    );
}

export default CustomSelect;