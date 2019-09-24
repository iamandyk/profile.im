import Meta from "./meta";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { useLoggedInUser } from "../hooks/useLoggedInUser";

const Layout = ({ children }) => {
  const user = useLoggedInUser();

  return (
    <div>
      <Meta />

      <div className="header">
        <Link href="/">
          <a className="logo">Profile</a>
        </Link>

        {user ? (
          <Link href="/[username]" as={`/${user.username}`}>
            <a>
              <img
                className="profile-pic"
                src={user.picture}
                alt={user.username}
              />
            </a>
          </Link>
        ) : (
          <LoginButton />
        )}
      </div>

      <main className="main">{children}</main>

      <style jsx>
        {`
          .header {
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
          }
          .logo {
            text-decoration: none;
            color: black;
            font-size: 25px;
            font-weight: bold;
          }
          logo:visited: {
            color: black;
          }
          .profile-pic {
            height: 35px;
            width: 35px;
            border-radius: 50%;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
