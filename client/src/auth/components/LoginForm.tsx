import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Flex, PasswordInput, Text, TextInput } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-simple-toasts";
import { PostService } from "../../api/services/requests-service";
import { setAuth } from "../slice/authSlice";
import { jwtDecode } from "jwt-decode";
import ApiRoutes from "../../api/services/api-routes";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.mixed().required("Required"),
    }),
    onSubmit: async (values: any) => {
      await PostService({
        route: ApiRoutes.login,
        body: values,
        // successMsg: "you successfully logged in",
      }).then((res) => {
        if (res?.data.error) {
        } else {
          const user = { ...res?.data.result, token: res?.data.token };
          if (user?.isActive) {
            localStorage.setItem("authInfo", JSON.stringify(res?.data.result));
            localStorage.setItem("token", res?.data.token);
            dispatch(
              setAuth({
                token: res?.data.token,
                authInfo: res?.data.result,
                authData: jwtDecode(res?.data.token),
                permissions: res?.data.result.permission?.permissions,
                role: res?.data.result.role,
              })
            );
          }
          if (!res?.data.error) {
            navigate("/home");
            toast(
              <div
                style={{
                  backgroundColor: "#00AFAF",
                  padding: "1rem",
                  color: "white",
                  border: "none",
                  borderRadius: ".5rem",
                }}
              >
                {`Hello ${values.email}.`}
              </div>,
              {
                position: "top-right",
              }
            );
          }
        }
      });
    },
  });

  // const formik = useFormik({
  //   initialValues: {
  //     username: "",
  //     password: "",
  //   },
  //   validationSchema: Yup.object({
  //     username: Yup.string().required("Required"),
  //     password: Yup.number().required("Required"),
  //   }),
  //   onSubmit: (values) => {
  //     dispatch(logIn());
  //     navigate("/home");
  //     toast(
  //       <div
  //         style={{
  //           backgroundColor: "#00AFAF",
  //           padding: "1rem",
  //           color: "white",
  //           border: "none",
  //           borderRadius: ".5rem",
  //         }}
  //       >
  //         {`Hello ${values.username}.`}
  //       </div>,
  //       {
  //         position: "top-right",
  //       }
  //     );

  //     console.log(values);
  //   },
  // });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column" gap="md" mt="md">
          <TextInput
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.email}
          />
          {/* {formik.touched.email && formik.errors.email ? (
            <Text c="red">{formik.errors.email}</Text>
          ) : null} */}
          <PasswordInput
            id="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.password}
          />
          {/* {formik.touched.password && formik.errors.password ? (
            <Text c="red">{formik.errors.password}</Text>
          ) : null} */}

          <Button w="fit-content" type="submit">
            <Flex align="center" gap=".4rem">
              <Text>Log in</Text>
              <IconLogout />
            </Flex>
          </Button>
        </Flex>
      </form>
    </>
  );
}
