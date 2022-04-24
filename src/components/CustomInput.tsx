import {
  FormControl,
  Input,
  InputProps,
  Select,
  SelectProps,
  useColorModeValue,
  FormControlProps,
} from "@chakra-ui/react";

type SelectOptionType = {
  label: string;
  value: string | number;
};

interface CustomInputProps extends FormControlProps {
  inputProps?: InputProps;
  id?: string;
  select?: boolean;
  selectOptions?: SelectOptionType[];
  selectProps?: SelectProps;
}

const CustomInput = ({
  inputProps,
  id,
  select,
  selectOptions,
  selectProps,
  ...rest
}: CustomInputProps) => {
  const borderColor = useColorModeValue("darkOne", "lightOne");

  return (
    <FormControl {...rest}>
      {select ? (
        <Select
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="0"
          color={borderColor}
          w="full"
          fontSize={["0.875rem", "1rem"]}
          size="lg"
          id={id}
          bg="transparent"
          _placeholder={{
            color: borderColor,
            opacity: "0.5",
          }}
          {...selectProps}
        >
          {selectOptions?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="0"
          px="4"
          color={borderColor}
          w="full"
          fontSize={["0.875rem", "1rem"]}
          size="lg"
          id={id}
          bg="transparent"
          _placeholder={{
            color: borderColor,
            opacity: "0.5",
          }}
          {...inputProps}
        />
      )}
    </FormControl>
  );
};

export default CustomInput;
