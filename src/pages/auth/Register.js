import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Typography, Link } from '@mui/material';

import RegisterForm from "../../sections/auth/RegisterForm";
import AuthSocial from '../../sections/auth/AuthSocial';
import { useTranslation } from "react-i18next";


// ----------------------------------------------------------------------

export default function Register() {

  const { t } = useTranslation();

  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">{t('registerUser')} </Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> {t('alreadyHaveAccount')} </Typography>

          <Link component={RouterLink} to={"/auth/login"} variant="subtitle2">
            {t('signIn')}
          </Link>
        </Stack>
      </Stack>
      {/* Form */}
      <RegisterForm  />

      <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {t("signup.agreeText")} {t("signup.agreeMessage")}
        <Link underline="always" color="text.primary">
        {t('signup.termsLink')}
        </Link>
        {t('and')}
        <Link underline="always" color="text.primary">
          {t('signup.privacyLink')}
        </Link>
        .
      </Typography>

     <AuthSocial />
      </>
  );
}
