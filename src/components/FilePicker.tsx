import { Center, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

type Props = {
  doc: File | undefined | null;
  selectDoc: (val: File) => void;
};

const FilePicker = ({ selectDoc, doc }: Props) => {
  const textColor = useColorModeValue("darkOne", "lightOne");
  const bgColor = useColorModeValue("lightTwo", "darkTwo");

  const onDrop = useCallback((acceptedFiles: File[], fileRejections) => {
    if (fileRejections) {
      selectDoc(undefined);
    }
    selectDoc(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: ".pdf",
    maxFiles: 1,
  });

  return (
    <>
      <Center
        flexDirection="column"
        bg={bgColor}
        h={["300px", "400px"]}
        w={["300px", "400px"]}
        mt={[4]}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Icon as={MdOutlinePictureAsPdf} color={textColor} fontSize="8rem" />
        {doc ? (
          <Text fontSize={["0.75rem", "0.875rem"]} color="green.500" mt="2" fontWeight="600">
            {doc.name}
          </Text>
        ) : (
          <></>
        )}
      </Center>
      {fileRejections.length > 0 ? (
        <Text fontSize={["0.75rem", "0.875rem"]} color="red.500" mt="2">
          {fileRejections[0].errors[0].message}
        </Text>
      ) : (
        <></>
      )}
      <Text color={textColor} mt="2" textAlign="center" fontWeight="500">
        DRAG AND DROP FILE OR CLICK BOX ABOVE TO SELECT FILE
      </Text>
    </>
  );
};

export default FilePicker;
