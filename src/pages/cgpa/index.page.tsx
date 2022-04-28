import { Box, Center, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import axios from "axios";
import CustomBtn from "../../components/CustomBtn";
import FilePicker from "../../components/FilePicker";
import { useState } from "react";
import { useMutation } from "react-query";
import useMediaQuery from "../../hooks/useMediaQuery";
// import FormData from "form-data";

type ReqType = {
  data: {
    download_url: string;
  };
};

const downloadReq = (): Promise<ReqType> => axios.post("/api/download");

const CGPA: NextPage = () => {
  const [doc, setDoc] = useState<File | undefined | null>();

  const isMobile = useMediaQuery("(max-width: 480px)");

  const textColor = useColorModeValue("darkOne", "lightOne");
  const bgColor = useColorModeValue("lightTwo", "darkTwo");

  const { mutate: downloadFile, isLoading: isDownloadLoading } = useMutation(downloadReq, {
    onSuccess: (data) => {
      window.open(data.data.download_url, "_blank");
    },
  });

  const { mutate: uploadMutation, isLoading: isUploadLoading } = useMutation(
    (form: FormData) => {
      return fetch("/api/upload", { body: form, method: "POST" });
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const uploadFile = (file: File) => {
    const form = new FormData();

    form.append("file", file);

    uploadMutation(form);
  };

  return (
    <Layout>
      <Box my={[12, 16]} w="full" h="full">
        <Center flexDirection="column">
          <Text color={textColor} textTransform="uppercase" textAlign="center">
            Upload <b>academic profile document</b> showing your <b>current course registration</b>
          </Text>

          <Center mt={[6]}>
            <CustomBtn
              onClick={() => downloadFile()}
              isLoading={isDownloadLoading}
              small={isMobile}
            >
              DOWNLOAD EXAMPLE FILE
            </CustomBtn>
          </Center>

          <FilePicker doc={doc} selectDoc={(val) => setDoc(val)} />

          <Center mt={[6]}>
            <CustomBtn
              small={isMobile}
              isDisabled={!doc}
              onClick={() => uploadFile(doc)}
              isLoading={isUploadLoading}
            >
              SUBMIT
            </CustomBtn>
          </Center>
        </Center>
      </Box>
    </Layout>
  );
};

export default CGPA;
