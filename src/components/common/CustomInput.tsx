import {Input, InputProps} from "antd";
import {RegexConstant} from "@/constants/regex.constant";

interface CustomInputProps extends InputProps {
    value?: string,
    type?: "numeric" | "alphanumeric" | "alphabet",
    onChange?: (value: any) => void,
}

const CustomInput = ({value, type = "alphanumeric", onChange, ...props}: CustomInputProps) => {
    const handleChange = (e: any) => {
        const inputValue = e.target.value
        let isValidValue;
        switch (type) {
            case "numeric":
                isValidValue = RegexConstant.REGEX_NUMERIC.test(inputValue);
                break;
            case"alphabet":
                isValidValue = RegexConstant.REGEX_ALPHABET.test(inputValue);
                break;
            case"alphanumeric":
                isValidValue = RegexConstant.REGEX_ALPHANUMERIC.test(inputValue);
                break;
            default:
                isValidValue = true;
        }

        if(onChange && isValidValue) onChange(inputValue);
    }

    return <Input value={value} onChange={handleChange} {...props} />
}

export default CustomInput;