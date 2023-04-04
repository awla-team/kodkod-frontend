import { Link, useParams } from "react-router-dom";
import { SidebarLinkProps } from "./interfaces";
import { SidebarLinkContainer } from "./styled";

const SidebarLink: React.FC<SidebarLinkProps> = ({
  linkId,
  linkTitle,
  linkRoute,
}) => {
  const { classId } = useParams();

  return (
    <SidebarLinkContainer className={`${linkId}` === classId ? "active" : ""}>
      <Link
        to={linkRoute}
        replace
        className="d-flex flex-column align-items-center justify-content-center position-relative"
      >
        <div className="text-center">
          <span>{linkTitle}</span>
        </div>
      </Link>
    </SidebarLinkContainer>
  );
};

export default SidebarLink;
