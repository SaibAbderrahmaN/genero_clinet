import { Link as RouterLink } from "react-router-dom";
// sections
import { Stack, Typography, Link } from "@mui/material";
import AuthSocial from "../../sections/auth/AuthSocial";
import Login from "../../sections/auth/LoginForm";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">{t('login')} </Typography>

      </Stack>
      {/* Form */}
      <Login />

      <AuthSocial />
    </>
  );
}
