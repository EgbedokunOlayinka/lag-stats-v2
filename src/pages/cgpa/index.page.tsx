import { Box, Center, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import axios from "axios";
import useSWR from "swr";
import CustomBtn from "../../components/CustomBtn";
import FilePicker from "../../components/FilePicker";
import { useState } from "react";

const fetcher = (url) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log(err));

const downloader = (url) =>
  axios
    .post(url)
    .then((res) => res.data)
    .catch((err) => console.log(err));

const CGPA: NextPage = () => {
  const [doc, setDoc] = useState<File | undefined | null>();

  const { data: downloadData, error: downloadError } = useSWR("/api/download");
  // const { data, error } = useSWR("/api/parse", fetcher);
  const textColor = useColorModeValue("darkOne", "lightOne");
  const bgColor = useColorModeValue("lightTwo", "darkTwo");

  console.log(downloadData ?? "data");
  console.log(downloadError ?? "err");

  return (
    <Layout>
      <Box my={[12, 16]} w="full" h="full">
        <Center flexDirection="column">
          <Text color={textColor} textTransform="uppercase" textAlign="center">
            Upload <b>academic profile document</b> showing your <b>current course registration</b>
          </Text>

          <Center mt={[4]}>
            <CustomBtn small>DOWNLOAD EXAMPLE FILE</CustomBtn>
          </Center>

          <FilePicker doc={doc} selectDoc={(val) => setDoc(val)} />
        </Center>
      </Box>
    </Layout>
  );
};

export default CGPA;
