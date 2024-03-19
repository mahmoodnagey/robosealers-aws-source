// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "./../redux/store";
// import { useTranslation } from "react-i18next";
// import { console_log, paramsValidate, showMSG } from "../utils/utilsFunctions";
// import { setAuth } from "../redux/reducerSlices/Auth/authSlice";
// import { GetService } from "./services/requests-service";
// import { useToast } from "@chakra-ui/react";
// import { Dispatch } from "@reduxjs/toolkit";

// const useGetData = ({
//   route,
//   notLoadData,
//   onSuccess,
//   params,
// }: {
//   params?: any;
//   route: string;
//   notLoadData?: boolean;
//   onSuccess?: (res: any,setData:React.Dispatch<any>) => void;
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [loadingMoreData, setLoadingMoreData] = useState(false);
//   const [onRefreshLoading, setOnRefreshLoading] = useState(false);

//   const [data, setData] = useState<any>();
//   const [errors, setErrors] = useState<any>(null);

//   const isPagination = route.includes("/list");
//   const [pagination, setPagination] = useState<any>(
//     isPagination ? { page: 1, limit: 8, pageNo: 1 } : {}
//   );

//   const token = useSelector<RootState>((state) => state?.auth?.token);
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const toast = useToast();

//   // ====handle Logout====
//   const handleLogout = () => {
//     dispatch(setAuth({ token: null, authInfo: {}, authData: {} }));
//   };

//   //====fetch data and handle loading and data state
//   const fetchData = async ({
//     route,
//     type,
//     params,
//   }: {
//     params?: any;
//     route: string;
//     type?: "Refresh";
//   }) => {
//     // if (!netInfo.isInternetReachable) {
//     //     console_log(netInfo.isInternetReachable, "netInfo.isInternetReachable")
//     //     return;
//     // }

//     try {
//       const apiParams = paramsValidate(params);
//       type === "Refresh" ? setOnRefreshLoading(true) : setLoading(true);
//       const res = await GetService({ route, params: apiParams });

//       if (res?.data?.count > 0) {
//         const pageNo = Math.ceil(res?.data?.count / pagination?.limit);
//         setPagination((prev: any) => ({ ...prev, pageNo }));
//       }

//       setData(res.data);
//       type === "Refresh" ? setOnRefreshLoading(false) : setLoading(false);
//       if (onSuccess) {
//         onSuccess(res,setData);
//       }
//       setErrors(false);

//       return res;
//     } catch (error: any) {
//       setLoading(false);

//       setErrors(error.response.data.error);
//       const status = error?.response?.status;
//       console_log(error);
//       if (status === 401 || status === 403) {
//         setErrors({ error: error?.response?.data?.error });
//         showMSG(toast, "error", t("your session has expired"));
//         handleLogout();
//       } else {
//         showMSG(toast, "error", error?.response?.data?.error || error?.message);
//         setErrors({ error: error?.response?.data?.error });
//       }

//       return { error: error.response.data.error };
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       if (!(notLoadData === true)) {
//         const filterParams = !params
//           ? pagination
//           : { ...pagination, ...params };
//         fetchData({ route, params: isPagination ? filterParams : params });
//       }
//     }
//   }, [token]);

//   //=====================
//   //loading more Data
//   //====================
//   const loadMoreData = async () => {
//     if (
//       pagination?.pageNo > 1 &&
//       pagination?.page <= pagination?.pageNo &&
//       !loadingMoreData
//     ) {
//       setLoadingMoreData(true);
//       try {
//         const filterParams = !params
//           ? pagination
//           : { page: pagination?.page + 1, limit: pagination?.limit, ...params };
//         const apiParams = paramsValidate(filterParams);
//         const res = await GetService({ route, params: apiParams });
//         setPagination((prev: any) => ({ ...prev, page: prev?.page + 1 }));
//         setData((prev: any) => ({
//           ...prev,
//           result: [...prev?.result, ...res?.data?.result],
//         }));
//       } catch (error) {
//         console_log({ error });
//       }
//       setLoadingMoreData(false);
//     }
//   };

//   //=====================
//   //Reload data
//   //====================
//   const onRefresh = () => {
//     const defaultPagination = {
//       ...pagination,
//       page: 1,
//     };
//     setPagination(defaultPagination);
//     const filterParams = !params
//       ? defaultPagination
//       : { ...defaultPagination, ...params };
//     fetchData({
//       route,
//       type: "Refresh",
//       params: isPagination ? filterParams : params,
//     });
//   };

//   return {
//     loading: loading,
//     data: data,
//     errors: errors,
//     setData: setData,
//     getData: fetchData,
//     loadMoreData: loadMoreData,
//     loadingMoreData:
//       pagination?.pageNo > 1 &&
//       pagination?.page <= pagination?.pageNo &&
//       !loading,
//     onRefresh: onRefresh,
//     onRefreshLoading: onRefreshLoading,
//   };
// };

// export default useGetData;
