// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import { DeleteService } from './services/requests-service';
// import { setAuth } from '../redux/reducerSlices/Auth/authSlice';
// import { showMSG } from '../utils/utilsFunctions';
// import { useToast } from '@chakra-ui/react';

// const useDeleteData = () => {
//     const [loading, setLoading] = useState(false)
//     const [data, setData] = useState(null)
//     const [errors, setErrors] = useState<any>(null)
//     const { t } = useTranslation()
//     const dispatch = useDispatch()
//     const toast = useToast();
//     // ====handle Logout====
//     const handleLogout = () => {
//         dispatch(setAuth({ token: null, authInfo: {}, authData:{} }))
//     }

//     const deleteData = async ({ route  , data}: { route: string , data?:any }) => {
//         console.log({route})
//         try {
//             setLoading(true)
//             const res = await DeleteService({ route })
//                 setData(res.data)
//                 setLoading(false)
//                 showMSG(toast, 'success',t('Deleted Successfully'))
//                 return res?.data
//         } catch (error: any) {
//             const status = error?.response?.status;
//             console.log({route, error})
//             if (status === 401 || status === 403  ) {
//                 setErrors({ error: error?.response?.data?.error });
//                 showMSG(toast, 'error',error?.response?.data?.error);
//                 handleLogout()
//               } else {
//                 showMSG(toast, 'error',error?.response?.data?.error);
//                 setErrors({ error: error?.response?.data?.error || error?.messag});
//               }
//               setLoading(false)
//               return { error: error.response.data.error };
//         }

//     }

//     return (
//         {
//             loading,
//             data,
//             errors,
//             deleteData
//         }
//     );
// }

// export default useDeleteData;
