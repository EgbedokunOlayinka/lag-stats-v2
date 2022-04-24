import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";
import { uid } from "uid";
import CustomBtn from "../../components/CustomBtn";
import Layout from "../../components/Layout";
import Course from "./components/Course";
import useMediaQuery from "../../hooks/useMediaQuery";
import Result from "./components/Result";

type CourseType = {
  code: string;
  unit: number | undefined | null;
  grade: number | undefined | null;
  id: string;
};

const GP: NextPage = () => {
  const textColor = useColorModeValue("darkOne", "lightOne");
  const hoverTextColor = useColorModeValue("lightOne", "darkOne");

  const isLargerThan480 = useMediaQuery("(min-width: 481px)");

  const [done, setDone] = useState<boolean>(false);
  const [gp, setGp] = useState<string>("");
  const [courses, setCourses] = useState<CourseType[]>([
    { code: "", unit: undefined, grade: undefined, id: uid() },
  ]);

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { code: "", unit: undefined, grade: undefined, id: uid() },
    ]);
  };

  const removeCourse = (id: string) => {
    setCourses((prev) => [...prev].filter((course) => course.id !== id));
  };

  const courseChangeHandler = (
    id: string,
    key: string,
    val: string | number
  ) => {
    setCourses((prev) => [
      ...prev.map((course) =>
        course.id === id
          ? {
              ...course,
              [key]: val,
            }
          : course
      ),
    ]);
  };

  const reset = () => {
    setCourses([{ code: "", unit: undefined, grade: undefined, id: uid() }]);
    setGp("");
    setDone(false);
  };

  const calculateGp = (e) => {
    e.preventDefault();

    const totalUnits = courses
      .map((course) => +course.unit)
      .reduce((a, b) => a + b, 0);

    const totalPoints = courses
      .map((course) => +course.unit * +course.grade)
      .reduce((a, b) => a + b, 0);

    setGp((totalPoints / totalUnits).toFixed(2));
    setDone(true);
  };

  return (
    <Layout>
      {!done ? (
        <Box as="form" my={[12, 16]} w="full" h="full" onSubmit={calculateGp}>
          <VStack spacing={[4, 6]}>
            {courses.map(({ code, grade, unit, id }) => (
              <Course
                key={id}
                code={code}
                grade={grade}
                unit={unit}
                id={id}
                removeCourse={removeCourse}
                courseChangeHandler={courseChangeHandler}
              />
            ))}
          </VStack>
          <Flex justify="flex-end" mt={[8]}>
            <IconButton
              aria-label="add course"
              icon={<AddIcon />}
              borderRadius="full"
              bg="transparent"
              color={textColor}
              borderWidth="1.5px"
              borderColor={textColor}
              _hover={{
                backgroundColor: textColor,
                color: hoverTextColor,
              }}
              onClick={addCourse}
            />
          </Flex>
          <Center mt={[4, 6]}>
            <CustomBtn small isFullWidth={!isLargerThan480} type="submit">
              SUBMIT
            </CustomBtn>
          </Center>
        </Box>
      ) : (
        <Result gp={gp} reset={reset} />
      )}
    </Layout>
  );
};

export default GP;
