import "isomorphic-unfetch";
import Layout from "../components/layout";
import AddToProfile from "../components/AddToProfile";
import { useFetch } from "tipple";

const Users = ({ user, answers }) => {
  return (
    <Layout>
      <div className="user-profile">
        <div className="profile-top">
          <img className="profile-pic" src={user.picture} alt={user.name} />
          <div>
            <div className="username">{user.username}</div>
            <div className="views">{user.profile_views} views</div>
            <div className="bio">{user.bio}</div>
          </div>
        </div>

        <AddToProfile />

        {answers.map(answer => (
          <div className="answer" key={answer._id}>
            <div className="title">{answer.title}</div>
            <div className="card">
              <div className="image box">
                <img src={answer.meta.image} alt={answer.meta.title} />
              </div>
              <div className="box">{answer.meta.title}</div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: answer.answer }} />
          </div>
        ))}

        <style jsx>
          {`
            .user-profile {
              max-width: 800px;
              margin: 0 auto;
            }
            .profile-top {
              display: flex;
              margin: 18px 0;
            }
            .profile-pic {
              height: 100px;
              border-radius: 50%;
              margin-right: 40px;
            }
            .username {
              font-size: 22px;
              font-weight: bold;
            }
            .views {
              font-size: 14px;
            }
            .bio {
              margin: 14px 0;
              font-size: 14px;
            }
            .answer {
              margin-bottom: 18px;
              border: 1px solid #fafafa;
              padding: 10px;
            }
            .answer img {
              width: 120px;
              margin-right: 16px;
            }
            .title {
              font-size: 12px;
              font-weight: bold;
              margin-bottom: 4px;
            }
            .card {
              display: flex;
            }
            .card box {
              display: flex;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

Users.getInitialProps = async ({ query: { username } }) => {
  const res = await fetch(`${process.env.API_URL}/user_profile/${username}`);
  const json = await res.json();

  return { user: json.user, answers: json.answers };
};

export default Users;
