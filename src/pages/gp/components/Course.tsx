import { CloseIcon } from "@chakra-ui/icons";
import { Center, Grid, IconButton, useColorModeValue } from "@chakra-ui/react";
import CustomInput from "../../../components/CustomInput";

type Props = {
  code: string;
  id: string;
  unit: number | null | undefined;
  grade: number | null | undefined;
  removeCourse: (id: string) => void;
  courseChangeHandler: (id: string, key: string, val: string | number) => void;
};

const Course = ({
  code,
  unit,
  grade,
  removeCourse,
  id,
  courseChangeHandler,
}: Props) => {
  const textColor = useColorModeValue("darkOne", "lightOne");
  const hoverTextColor = useColorModeValue("lightOne", "darkOne");

  return (
    <Grid templateColumns={["1fr", "1fr 1fr"]} gridGap={[2, 6]}>
      <CustomInput
        id="code"
        inputProps={{
          placeholder: "Course .e.g ZLY333",
          value: code,
          onChange: (e) => courseChangeHandler(id, "code", e.target.value),
        }}
        isRequired
      />
      <Grid templateColumns={["1fr 1fr 35px"]} gridGap={[2, 6]}>
        <CustomInput
          id="unit"
          select
          selectProps={{
            placeholder: "Course units",
            value: unit,
            onChange: (e) => courseChangeHandler(id, "unit", e.target.value),
          }}
          selectOptions={[
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
            { label: "5", value: 5 },
            { label: "6", value: 6 },
            { label: "7", value: 7 },
            { label: "8", value: 8 },
            { label: "9", value: 9 },
            { label: "10", value: 10 },
          ]}
          isRequired
        />
        <CustomInput
          id="grade"
          select
          selectProps={{
            placeholder: "Grade",
            value: grade,
            onChange: (e) => courseChangeHandler(id, "grade", e.target.value),
          }}
          selectOptions={[
            { label: "A", value: 5 },
            { label: "B", value: 4 },
            { label: "C", value: 3 },
            { label: "D", value: 2 },
            { label: "E", value: 1 },
            { label: "F", value: 0 },
          ]}
          isRequired
        />
        <Center>
          <IconButton
            aria-label="delete course"
            icon={<CloseIcon fontSize={["0.5rem", "0.65rem"]} />}
            borderRadius="full"
            bg="transparent"
            color={textColor}
            borderWidth="1.5px"
            borderColor={textColor}
            size="sm"
            _hover={{
              backgroundColor: textColor,
              color: hoverTextColor,
            }}
            onClick={() => removeCourse(id)}
          />
        </Center>
      </Grid>
    </Grid>
  );
};

export default Course;
