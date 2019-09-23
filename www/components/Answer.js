import Link from "next/link";
import ProfileSong from "./ProfileSong";
import Quote from "./Quote";
import Instagram from "./Instagram";
import Twitter from "./Twitter";
import GitHub from "./GitHub";
import Facebook from "./Facebook";

const components = {
  profileSong: ProfileSong,
  quote: Quote,
  instagram: Instagram,
  twitter: Twitter,
  github: GitHub,
  facebook: Facebook
};

const Answer = ({ answer }) => {
  const ProfileComponent = components[answer.type];

  return (
    <div className="answer">
      <div className="question-header">
        <Link href="/answer/[id]" as={`/answer/${answer._id}`}>
          <a>{answer.title}</a>
        </Link>
      </div>

      <ProfileComponent item={answer} />

      <style jsx>
        {`
          .answer {
            margin-bottom: 18px;
          }
          .answer a {
            text-decoration: none;
          }
          .question-header {
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 10px;
          }
          .question-header a {
            color: #999;
          }
          .answer img {
            width: 80px;
            height: 80px;
            margin-right: 16px;
          }
          .card {
            display: flex;
          }
          .card box {
            display: flex;
          }
          .content {
            padding: 8px 8px 8px 0;
          }
          .content-title {
            margin-bottom: 6px;
          }
          .content-description {
            font-size: 12px;
          }
        `}
      </style>
    </div>
  );
};

export default Answer;
