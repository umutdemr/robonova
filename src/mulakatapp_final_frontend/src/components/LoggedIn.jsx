import React, { useEffect } from "react";
import { useAuth } from "./use-auth-client";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useBoolean } from "./components/hooks/use-boolean.js";
import UserQuickEditForm from "./components/user-quick-edit-form.jsx";
import Button from "@mui/material/Button";


function LoggedIn({}) {
  const [result, setResult] = React.useState("");

  const defaultUser = "Paws Friend";

  const defaultAvatar = "./defaultAvatar.png";

  const [currentUser, setCurrentUser] = React.useState();

  const { whoamiActor, logout, principal } = useAuth();

  console.log("currentUser: ", currentUser);

  const quickEdit = useBoolean();



  const getUser = async () => {
    const user = await whoamiActor.getCurrentUser(principal);
    console.log("user returned backend", user);
    setCurrentUser(user[0]);
  };

  useEffect(() => {
    getUser();
    async function greetuser() {
      const whoami = await whoamiActor.greet();
      setResult(whoami.toString());
    }
    greetuser();
  }, []);

  const handleUpdateUser = () => {
    getUser(); // Re-fetch pets after a new pet is created
  };

  return (
    <>
      <Stack
        direction="column"
        p={2}
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption">{result}</Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <img
              src={currentUser?.avatar ? currentUser?.avatar : defaultAvatar}
              alt="internet"
              height={100}
              width={100}
              style={{ borderRadius: "50px" }}
            />
            <Typography>
              Hi {currentUser?.name ? currentUser?.name : defaultUser} !
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" gap={2}>
            <Stack
              direction="column"
              alignItems="left"
              justifyContent="center"
              gap={2}
            >
            </Stack>
            <Stack
              direction="column"
              alignItems="right"
              justifyContent="center"
              gap={2}
            >
              <Button variant="outlined" onClick={quickEdit.onTrue}>
                Update Profile
              </Button>
              <Button variant="outlined" onClick={logout}>
                Log Out
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <UserQuickEditForm
        currentUser={currentUser}
        onClose={quickEdit.onFalse}
        open={quickEdit.value}
        principal={principal}
        mutatuePanel={handleUpdateUser}
      />
    </>
  );
}

export default LoggedIn;