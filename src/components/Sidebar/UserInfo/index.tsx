import { useState } from "react";
import { UserInfoProps } from "./interfaces";
import { UserInfoContainer } from "./styled";

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  //   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /* const handleClick = (event: React.SyntheticEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null); */

  return user.id ? (
    <UserInfoContainer>
      <img src={user.avatar} alt="avatar" />
      <div className="d-flex flex-column justify-content-center">
        <span>{user.role}</span>
        <span className="text-center">{`${user.first_name} ${user.last_name}`}</span>
      </div>
    </UserInfoContainer>
  ) : null;
};

export default UserInfo;
