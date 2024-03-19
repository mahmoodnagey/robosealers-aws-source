import { useDispatch } from "react-redux";
import { openModal } from "../../design-system/components/ConfirmModal/ConfirmModal";
import {
  createRobot,
  deleteRobotById,
  getRobot,
  updateRobot,
} from "../slice/thunk";
import toast from "react-simple-toasts";
import { closeEditRobotModal } from "../slice/robot-slice";

export const useRobotsActions = () => {
  const dispatch: any = useDispatch();

  const removeRobot = (robotId: string) => {
    openModal({
      text: `Are you sure you remove this robot? `,
      onConfirm: () => {
        dispatch(deleteRobotById(robotId));
      },
    });
  };
  const addRobot = (robot: any, resetForm: any) => {
    dispatch(createRobot(robot)).then((resultAction: any) => {
      if (createRobot.fulfilled.match(resultAction)) {
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
              Robot Added Successfully
            </div>
          </>,
          {
            position: "top-right",
          }
        );
        resetForm();
      } else if (createRobot.rejected.match(resultAction)) {
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
  const editRobot = (robot: any, robotId: any, resetForm: any) => {
    dispatch(updateRobot({ robot, robotId })).then((resultAction: any) => {
      if (updateRobot.fulfilled.match(resultAction)) {
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
              Robot Updated Successfully
            </div>
          </>,
          {
            position: "top-right",
          }
        );
        dispatch(closeEditRobotModal());
        resetForm();
      } else if (updateRobot.rejected.match(resultAction)) {
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
  const getRobotInfo = (robotId: string) => {
    dispatch(getRobot(robotId));
  };

  return { removeRobot, addRobot, editRobot, getRobotInfo };
};
