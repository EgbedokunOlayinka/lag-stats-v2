import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const Header = () => {
  return (
    <Box as="header">
      <Flex align="center" justify="space-between">
        <Text fontWeight="600" fontSize={["1.25rem"]}>
          LAGSTATS
        </Text>
        <ColorModeSwitcher />
      </Flex>
    </Box>
  );
};

export default Header;
