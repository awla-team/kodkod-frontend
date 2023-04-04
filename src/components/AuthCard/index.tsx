import { CardContent } from "@mui/material";
import { ForgotPasswordCard } from "routes/UserAuth/ForgotPassword/styled";

const AuthCard: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ForgotPasswordCard variant="outlined">
      <CardContent className="p-5">{children}</CardContent>
    </ForgotPasswordCard>
  );
};

export default AuthCard;
