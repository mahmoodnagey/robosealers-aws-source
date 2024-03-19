import { useEffect, useState } from "react";
import {
  GetService,
  PostService,
} from "../../../api/services/requests-service";
import ApiRoutes from "../../../api/services/api-routes";
import {
  Button,
  Checkbox,
  Group,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import { usePrimaryColorHex } from "../../../design-system/hooks/use-primary-color";
import toast from "react-simple-toasts";
import { addRole } from "../../slice/rolesListSlice";
import { useDispatch } from "react-redux";

export default function AddAdminRoles() {
  const [adminPermissionList, setAdminPermissionList] = useState<any>([]);
  const color = usePrimaryColorHex();
  const [groupValue, setGroupValue] = useState<string[]>([]);
  const [roleNameValue, setRoleNameValue] = useState<string>("");
  const dispatch: any = useDispatch();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const result: any = {};

    groupValue.forEach((path) => {
      const parts = path.split("/").filter((element) => element !== "");

      if (parts.length >= 3) {
        // If there are at least 3 parts (including the empty string before the first '/', i.e., ''), it means there are at least two '/'
        const key = parts[1]; // Get the second part after the first '/'
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(path);
      } else if (parts.length === 2) {
        // If there are exactly 2 parts, set key to 'admins'
        const key = "admins";
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(path);
      }
    });

    PostService({
      route: ApiRoutes.createRoles,
      body: {
        name: roleNameValue,
        permissions: result,
        type: "admin",
      },
    })
      .then((res) => {
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
            Role Added Successfully
          </div>,
          {
            position: "top-right",
          }
        );
        setRoleNameValue("");
        setGroupValue([]);
        dispatch(addRole(res.data.result));
      })
      .catch((error) => {
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
            {error.response.data.error}
          </div>,
          {
            position: "top-right",
          }
        );
      });
  };

  useEffect(() => {
    GetService({
      route: ApiRoutes.listAdminPermissions,
    }).then((res) => {
      setAdminPermissionList(res.data.result);
    });
  }, []);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          placeholder="Enter Role Name"
          value={roleNameValue}
          onChange={(e) => setRoleNameValue(e.target.value)}
          required
          my="md"
        />
        {Object.entries(adminPermissionList).map(
          ([key, value]) =>
            (value as []).length > 0 && (
              <Paper shadow="sm" radius="md" p="md" mb="xl" key={key}>
                <Checkbox.Group
                  value={groupValue}
                  onChange={setGroupValue}
                  label={
                    <Title c={color} order={4}>
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, function (str) {
                          return str.toUpperCase();
                        })}
                    </Title>
                  }
                >
                  <Group mt="lg">
                    {(value as []).map((item: string, index) => (
                      <Checkbox
                        mx="lg"
                        key={index}
                        value={item}
                        label={item
                          .split("/")
                          .pop()
                          ?.replace(/([A-Z])/g, " $1")
                          .replace(/^./, function (str) {
                            return str.toUpperCase();
                          })}
                      />
                    ))}
                  </Group>
                </Checkbox.Group>
              </Paper>
            )
        )}
        <Button
          disabled={roleNameValue === "" || groupValue.length === 0}
          type="submit"
        >
          Save Role
        </Button>
      </form>
    </>
  );
}
