import { Stack, Button } from "@mui/material";
import FormProvider  from "../../components/hook-form";
import { Link } from "react-router-dom";

export default function VerifyForm() {
  return (
    <FormProvider  >
      <Stack spacing={3}>
       <Link to ="/">  
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
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
          buck to home page
        </Button>
          </Link>
      </Stack>
    </FormProvider>
  );
}
