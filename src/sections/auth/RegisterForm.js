import { useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../redux/slices/auth";
import { useTranslation } from "react-i18next";
import { RxAvatar } from "react-icons/rx";

// ----------------------------------------------------------------------

export default function AuthRegisterForm() {
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { t } = useTranslation();
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  const LoginSchema = Yup.object().shape({
    firstname: Yup.string().required("First name required"),
    lastname: Yup.string().required("Last name required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "escrawme@contact.com",
    password: "demo1234",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;


  const onSubmit = async (data) => {
    const { firstname, lastname, email, PhoneNumber, Address, ZibCode, password } = data;
  
    const newForm = new FormData();
    newForm.append("firstname", firstname);
    newForm.append("lastname", lastname);
    newForm.append("email", email);
    newForm.append("PhoneNumber", PhoneNumber);
    newForm.append("Address", Address);
    newForm.append("ZibCode", ZibCode);
    newForm.append("password", password);
    newForm.append("file", avatar);
  
    try {
      // submit data to backend
      dispatch(RegisterUser(newForm));
    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };
  

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} mb={4}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="firstname" label={t('firstName')} />
          <RHFTextField name="lastname" label={t('lastName')}  />
        </Stack>
        <RHFTextField name="email" label={t('emailAddress')}/>
        <RHFTextField type="number" name="PhoneNumber" label={t('phoneNumber')} />
        <RHFTextField name="Address" label= {t('address')} />
        <RHFTextField name="ZibCode" label={t('zipCode')} />
        <RHFTextField
          name="password"
          label={t('password')}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
          <div>
          <label
            htmlFor="avatar"
            className="block text-sm font-medium "
          ></label>
          <div className="mt-2 flex items-center">
            <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="avatar"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <RxAvatar className="h-8 w-8" />
              )}
            </span>
            <label
              htmlFor="file-input"
              className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <span>{t('uploadFile')}</span>
              <input
                type="file"
                name="avatar"
                id="file-input"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileInputChange}
                className="sr-only"
              />
            </label>
          </div>
        </div>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
{t('submit')}      
</LoadingButton>
    </FormProvider>
  );
}
