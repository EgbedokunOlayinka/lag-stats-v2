import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";

interface CustomBtnProps extends ButtonProps {
  small?: boolean;
}

const CustomBtn = ({ children, small, ...rest }: CustomBtnProps) => {
  const textColor = useColorModeValue("darkOne", "lightOne");
  const hoverTextColor = useColorModeValue("lightOne", "darkOne");

  return (
    <Button
      minW="250"
      bg="transparent"
      color={textColor}
      borderWidth="1.5px"
      borderColor={textColor}
      borderRadius="0"
      py={small ? "6" : "8"}
      transition="all 0.2s ease-in-out"
      fontWeight="600"
      _hover={{
        backgroundColor: textColor,
        color: hoverTextColor,
      }}
      isFullWidth
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomBtn;
