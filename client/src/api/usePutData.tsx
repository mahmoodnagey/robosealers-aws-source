// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { showMSG } from "../utils/utilsFunctions";
// import { setAuth } from "../redux/reducerSlices/Auth/authSlice";
// import { PutService } from "./services/requests-service";
// import { useToast } from "@chakra-ui/react";

// const usePutData = () => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const [errors, setErrors] = useState<null | boolean | any>(null);
//   const dispatch = useDispatch();
//   const toast = useToast();

//   // ====handle Logout====
//   const handleLogout = () => {
//     dispatch(setAuth({ token: null, authInfo: {}, authData: {} }));
//   };

//   //=== put data and handle loading,data and error state
//   const putData = async ({
//     route,
//     data,
//     params,
//     formData,
//   }: {
//     route: string;
//     data: any;
//     params?:{};
//     formData?: boolean;
//   }) => {
//     try {
//       setLoading(true);
//       const res: any = await PutService({ route, body: data ,params});
//       console.log({ res });
//       setData(res.data);
//       setLoading(false);
//       return res.data;
//     } catch (error: any) {
//       setErrors(error.response.data.error);
//       setLoading(false);
//       const status = error?.response?.status;
//       if (status === 401 || status === 403) {
//         setErrors({ error: error?.response?.data?.error });
//         showMSG(toast, "error", error?.response?.data?.error);
//         handleLogout();
//       } else {
//         showMSG(toast, "error", error?.response?.data?.error);
//         setErrors({ error: error?.response?.data?.error });
//       }
//       return { error: error.response.data.error };
//     }
//   };

//   return {
//     loading: loading,
//     res: data,
//     errors: errors,
//     putData: putData,
//   };
// };

// export default usePutData;
