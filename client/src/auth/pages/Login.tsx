import LoginHeader from "../components/LoginHeader";
import robotImg from "../../../shared/images/robot.jpg";
import { Box, Flex } from "@mantine/core";
import { Helmet } from "react-helmet";
import useIsMobile from "../../design-system/hooks/use-is-mobile";
export default function Login() {
  const mobile = useIsMobile();

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box mx="auto" w={mobile ? "95%" : "88%"}>
        <Flex
          justify="space-between"
          direction={mobile ? "column" : "row"}
          gap="md"
        >
          <LoginHeader />
          <Box w={mobile ? "100%" : "48%"}>
            <img src={robotImg} alt="robot-img" width="100%" height="100%" />
          </Box>
        </Flex>
      </Box>
    </>
  );
}
