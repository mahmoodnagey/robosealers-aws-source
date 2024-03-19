import { useDispatch } from "react-redux";
import { openModal } from "../../design-system/components/ConfirmModal/ConfirmModal";
import { createOrg, deleteOrgById, getOrg, updateOrg } from "../slice/thunk";
import { OrgFormType } from "../types";
import toast from "react-simple-toasts";
import { closeEditOrgModal } from "../slice/org-slice";

export const useOrgsActions = () => {
  const dispatch: any = useDispatch();

  const removeOrg = (orgId: string) => {
    openModal({
      text: `Are you sure you remove this organization? `,
      onConfirm: () => {
        dispatch(deleteOrgById(orgId));
      },
    });
  };
  const addOrg = (org: OrgFormType, resetForm: any) => {
    dispatch(createOrg(org)).then((resultAction: any) => {
      if (createOrg.fulfilled.match(resultAction)) {
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
              Organization Account Added Successfully
            </div>
          </>,
          {
            position: "top-right",
          }
        );
        resetForm();
      } else if (createOrg.rejected.match(resultAction)) {
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
  const editOrg = (org: OrgFormType, orgId: string, resetForm: any) => {
    dispatch(updateOrg({ org, orgId })).then((resultAction: any) => {
      if (updateOrg.fulfilled.match(resultAction)) {
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
              Organization Account Updated Successfully
            </div>
          </>,
          {
            position: "top-right",
          }
        );
        dispatch(closeEditOrgModal());
        resetForm();
      } else if (updateOrg.rejected.match(resultAction)) {
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
  const getOrganization = (orgId: string) => {
    dispatch(getOrg(orgId));
  };

  return { removeOrg, addOrg, editOrg, getOrganization };
};
