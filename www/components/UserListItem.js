import Link from "next/link";

export default ({ user }) => (
  <Link href={`/${user.username}`} key={user._id}>
    <div className="user-list-item">
      <div className="profile-picture-box">
        <img
          className="profile-picture"
          src={user.picture}
          alt={user.username}
        />
      </div>

      <div className="box">
        <div className="username-box">
          <Link href={`/${user.username}`}>
            <a className="username">{user.username}</a>
          </Link>
        </div>

        <div>{user.bio}</div>
      </div>

      <style jsx>
        {`
          .user-list-item {
            display: flex;
            padding: 12px;
            text-decoration: none;
            cursor: pointer;
            border-radius: 5px;
          }
          .user-list-item:hover {
            background: #f8f8f8;
          }
          .box {
            flex: 0 0 auto;
          }
          .profile-picture-box {
            margin-right: 22px;
          }
          .profile-picture {
            height: 80px;
            border-radius: 50%;
          }
          .username-box {
            margin-bottom: 8px;
          }
          .username {
            text-decoration: none;
            font-size: 22px;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  </Link>
);
