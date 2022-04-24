import { Center, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import CustomBtn from "../components/CustomBtn";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Center w="full" h="80vh">
        <VStack spacing={4}>
          <CustomBtn onClick={() => router.push("/gp")}>CALCULATE GP</CustomBtn>
          <CustomBtn onClick={() => router.push("/cgpa")}>
            CALCULATE CGPA
          </CustomBtn>
        </VStack>
      </Center>
    </Layout>
  );
};

export default Home;
