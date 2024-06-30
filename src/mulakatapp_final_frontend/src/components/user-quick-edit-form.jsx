import * as Yup from "yup";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box } from '@mui/material';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormProvider, { RHFTextField } from "./hook-form";
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
import { Divider } from "@mui/material";
import { useBoolean } from "./hooks/use-boolean.js";
import { useAuth } from "./use-auth-client.jsx";

// ----------------------------------------------------------------------

export default function UserQuickEditForm({
    currentUser,
    open,
    onClose,
    principal,
    mutatuePanel,
}) {
    const { logout } = useAuth();
    const defaultAvatar = "./image2.png";
    const [imageData, setImageData] = useState(currentUser?.avatar);

    const confirm = useBoolean();

    const NewUserSchema = Yup.object().shape({
        name: Yup.string(),
        avatar: Yup.string(),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentUser?.name || "",
            avatar: currentUser?.avatar || "",
        }),
        [currentUser],
    );

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Data = reader.result; // Dosya verisini base64 formatına dönüştür
            setImageData(base64Data); // State'i güncelle
            setValue("avatar", base64Data); // Formdaki 'image' alanının değerini güncelle
        };

        if (file) {
            reader.readAsDataURL(file); // Dosyayı base64 formatına dönüştürmek için okuma işlemini başlat
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = { ...data, image: imageData };
            await mulakatapp_final_backend.updateUser(formData, principal);
            mutatuePanel();
            enqueueSnackbar("Your RoboNova Profile Update success!");
            onClose();
            console.info("DATA", data);
        } catch (error) {
            console.error(error);
        }
    });

    const onDeleteRow = async () => {
        const response = await mulakatapp_final_backend.deleteUser(principal);
        enqueueSnackbar("Your all info deleted. See you soon!");
        confirm.onFalse();
        console.log(response);
        logout();
    };

    useEffect(() => {
        if (currentUser) {
            setImageData(currentUser?.avatar);
            setValue("name", currentUser?.name || "");
            setValue("avatar", currentUser?.avatar || "");
        }
    }, [currentUser]);

    return (
        <Dialog
            fullWidth
            maxWidth={false}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { maxWidth: 350 },
            }}
        >
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <DialogTitle>Update Profile</DialogTitle>

                <DialogContent>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        pt={3}
                        pb={3}
                        gridTemplateColumns={{
                            xs: "repeat(1, 1fr)",
                            sm: "repeat(1, 1fr)",
                        }}
                    >
                        <RHFTextField name="name" label="User Name" />
                        <img
                            src={imageData ? imageData : defaultAvatar}
                            alt="internet"
                            height={100}
                            width={100}
                            style={{ borderRadius: "50px" }}
                        />
                        <input type="file" onChange={handleFileChange} accept="image/*" />{" "}
                    </Box>
                    <Button variant="outlined" color="error" onClick={confirm.onTrue}>
                        Delete my Account
                    </Button>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>

                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Update
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
}