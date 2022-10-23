import { Link, useLocation } from "react-router-dom";
import { SidebarLinkProps } from "./interfaces";
import { SidebarLinkContainer } from "./styled";

const SidebarLink: React.FC<SidebarLinkProps> = ({ route }) => {
  const location = useLocation();

  return (
    <SidebarLinkContainer
      className={location.pathname === route.path ? "active" : ""}
    >
      <Link
        to={route.path}
        className="d-flex flex-column align-items-center justify-content-center position-relative"
      >
        <div className="text-center">
          <span>{route.title}</span>
        </div>
      </Link>
    </SidebarLinkContainer>
  );
};

export default SidebarLink;
