import {
  Center,
  CircularProgress,
  CircularProgressLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import CustomBtn from "../../../components/CustomBtn";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { gsap } from "gsap";
import { useEffect, useState } from "react";

type Props = {
  gp: string;
  reset: () => void;
};

const Result = ({ gp, reset }: Props) => {
  const bgColor = useColorModeValue("lightTwo", "darkTwo");
  const textColor = useColorModeValue("darkOne", "lightOne");

  const isLargerThan480 = useMediaQuery("(min-width: 481px)");

  const gpa = (+gp * 100) / 5;

  const [progress, setProgress] = useState({ value: 0 });

  useEffect(() => {
    const target = {
      value: progress.value,
    };

    gsap.to(target, {
      duration: 2.5,
      ease: "power3.out",
      value: gpa,
      onUpdate: () => setProgress({ value: target.value }),
    });
  }, []);

  return (
    <Center my={[16, 24]} w="full" h="full" flexDirection="column">
      <Center bg={bgColor} h={["300px", "500px"]} w={["300px", "500px"]}>
        <CircularProgress
          size={isLargerThan480 ? "300px" : "200px"}
          value={progress.value}
          capIsRound
        >
          <CircularProgressLabel color={textColor}>{gp}</CircularProgressLabel>
        </CircularProgress>
      </Center>
      <Center mt={8} minW="300">
        <CustomBtn onClick={reset} isFullWidth={!isLargerThan480}>
          RESET
        </CustomBtn>
      </Center>
    </Center>
  );
};

export default Result;
