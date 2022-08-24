import React from 'react'
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Icon,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { Control, Controller, FieldValues } from 'react-hook-form';

interface SelectProps {
    name: string;
    control: Control<FieldValues>;
    rules: any;
    id?: string;
    label?: string;
    values?: string[];
    position?: string;
    disabled?: boolean;
    onChanges?: any;
    defaultValue?: string;
    error?: any;
}

const Select: React.FC<SelectProps> = ({
    id,
    label,
    values,
    name,
    control,
    rules,
    position,
    defaultValue,
    error,
    onChanges,
    disabled = false
}) => (
    <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormControl
                id={id}
                isInvalid={error}
                isDisabled={disabled}
                bg='white'
                borderBottomRadius={(position === "top" || position === "mid") ? "none" : "md"}
                borderTopRadius={(position === "bottom" || position === "mid") ? "none" : "md"}
            >
                <AutoComplete openOnFocus onChange={onChanges ? onChanges : onChange} onBlur={onBlur} value={value}>
                    {({ isOpen }: any) => (
                        <React.Fragment>
                            <InputGroup>
                                <AutoCompleteInput
                                    border='1px'
                                    height='12'
                                    borderBottomRadius={(position === "top" || position === "mid") ? "none" : "md"}
                                    borderTopRadius={(position === "bottom" || position === "mid") ? "none" : "md"}
                                    // _focus={{ boxShadow: 'outline', borderColor: 'gray.200' }}
                                    _placeholder={{ color: error ? 'red.500' : 'gray.400', opacity: 1 }}
                                    defaultValue={defaultValue}
                                    color={error ? 'red.500' : 'currentcolor'}
                                    placeholder={label}
                                    name={name}
                                    ref={ref}
                                    className='!border-purple-400'
                                />
                                <InputRightElement height='12'>
                                    <Icon as={isOpen ? FiChevronRight : FiChevronDown} />
                                </InputRightElement>
                            </InputGroup>
                            <AutoCompleteList className={error ? '!border-red-500' : '!border-purple-500'} border='2px'>
                                {values?.map((value, id) => (
                                    <AutoCompleteItem
                                        key={`option-${id}`}
                                        value={value}
                                        textTransform="capitalize"
                                        label={value}
                                        fixed
                                        color={error ? 'red.500' : 'currentcolor'}
                                    />
                                ))}
                            </AutoCompleteList>
                        </React.Fragment>
                    )}
                </AutoComplete>
                {/* <FormHelperText>{!error && "Select value from dropdown"}</FormHelperText>
        <FormErrorMessage>{error && error.message}</FormErrorMessage> */}
            </FormControl>
        )}
    />
)

export default Select