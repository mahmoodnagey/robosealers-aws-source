import { useDispatch } from "react-redux";
import { openModal } from "../../design-system/components/ConfirmModal/ConfirmModal";
import {
  createUser,
  deleteUserById,
  getUser,
  updateUser,
} from "../slice/thunk";
import toast from "react-simple-toasts";
import { closeEditUserModal } from "../slice/user-slice";

export const useUsersActions = () => {
  const dispatch: any = useDispatch();

  const removeUser = (userId: string) => {
    openModal({
      text: `Are you sure you remove this user? `,
      onConfirm: () => {
        dispatch(deleteUserById(userId));
      },
    });
  };
  const addUser = (user: any, resetForm: any) => {
    dispatch(createUser(user)).then((resultAction: any) => {
      if (createUser.fulfilled.match(resultAction)) {
        toast(
          <>
            <div
              style={{
                backgroundColor: "#00AFAF",
                padding: "1rem",
                color: "white",
                border: "none",
                borderRadius: ".5rem",
              }}
            >
              User Account Added Successfully
            </div>
          </>,
          {
            position: "top-right",
          }
        );
        resetForm();
      } else if (createUser.rejected.match(resultAction)) {
        toast(
          <>
            <div
              style={{
                backgroundColor: "#00AFAF",
                padding: "1rem",
                color: "white",
                border: "none",
                borderRadius: ".5rem",
              }}
            >
              {resultAction.error.message}
            </div>
          </>,
          {
            position: "top-right",
          }
        );
      }
    });
  };
  const editUser = (user: any, userId: any, resetForm: any) => {
    dispatch(updateUser({ user, userId })).then((resultAction: any) => {
      if (updateUser.fulfilled.match(resultAction)) {
        toast(
          <>
            <div
              style={{
                backgroundColor: "#00AFAF",
                padding: "1rem",
                color: "white",
                border: "none",
                borderRadius: ".5rem",
              }}
            >
              User Account Updated Successfully
            </div>
          </>,
          {
            position: "top-right",
          }
        );
        dispatch(closeEditUserModal());
        resetForm();
      } else if (updateUser.rejected.match(resultAction)) {
        toast(
          <>
            <div
              style={{
                backgroundColor: "#00AFAF",
                padding: "1rem",
                color: "white",
                border: "none",
                borderRadius: ".5rem",
              }}
            >
              {resultAction.error.message}
            </div>
          </>,
          {
            position: "top-right",
          }
        );
      }
    });
  };
  const getUserInfo = (userId: string) => {
    dispatch(getUser(userId));
  };

  return { removeUser, addUser, editUser, getUserInfo };
};
