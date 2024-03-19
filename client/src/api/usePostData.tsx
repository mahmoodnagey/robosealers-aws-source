// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import {  showMSG } from '../utils/utilsFunctions';
// import { setAuth } from '../redux/reducerSlices/Auth/authSlice';
// import { PostService } from './services/requests-service';
// import { useTranslation } from 'react-i18next';
// import { useToast } from '@chakra-ui/react';

// const usePostData = () => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState< any>();
//   const [errors, setErrors] = useState<null | boolean | any>(null);
//   const dispatch = useDispatch()
//   const {t} = useTranslation()
//   const toast = useToast();

//   // ====handle Logout====
//   const handleLogout = () => {
//     dispatch(setAuth({ token: null, authInfo: {}, authData:{} }))
//   }

//   // === post data and update loading,error and data state
//   const postData = async ({ route, data,params, successMsg }: { route: string; data?: any;params?:{}, successMsg?:string }) => {
//     try {
//       setLoading(true)
//       const res: any = await PostService({ route, body:data,params  });
//       setLoading(false);
//       setErrors(null);
//       setData(res.data);
//       successMsg && showMSG(toast, 'success', successMsg)
//       return res.data;
//     } catch (error: any) {
//       setLoading(false);
//       setErrors(error.response.data.error);
//       const status = error?.response?.status;

//       if (status === 401 || status === 403) {
//         setErrors({ error: error?.response?.data?.error });
//         showMSG(toast, 'error',t('your session has expired'))
//         handleLogout()
//       } else {
//         showMSG(toast, 'error',error?.response?.data?.error);
//         setErrors({ error: error?.response?.data?.error });
//       }

//       return { error: error.response.data.error };
//     }
//   };

//   return {
//     loading: loading,
//     data: data,
//     errors: errors,
//     postData: postData,
//     setData: setData,
//     setErrors,
//   };
// };

// export default usePostData;
