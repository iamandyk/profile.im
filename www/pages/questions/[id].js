import Layout from "../../components/Layout";
import "isomorphic-unfetch";
import UserAnswer from "../../components/UserAnswer";
import Head from "next/head";
import AnswerQuestion from "../../components/AnswerQuestion";
import cookies from "next-cookies";

const QuestionPage = ({ question, loggedInUserAnswer }) => {
  return (
    <Layout>
      <Head>
        <title>{question.title}</title>

        <meta property="og:title" content={`${question.title}`} />

        <meta property="og:image" content={question.user.picture} />
      </Head>

      <div className="question-page">
        <h2>{question.title}</h2>
        {loggedInUserAnswer ? (
          <div>
            <h3>You answered:</h3>
            <UserAnswer answer={loggedInUserAnswer} />
          </div>
        ) : (
          <div>
            <AnswerQuestion questionId={question._id} />
          </div>
        )}
      </div>

      <style jsx>
        {`
          .question-page {
            padding-top: 32px;
            max-width: 600px;
            margin: 0 auto;
          }
          h2 {
            margin-bottom: 16px;
          }
        `}
      </style>
    </Layout>
  );
};
QuestionPage.getInitialProps = async ({ query: { id }, jwt }) => {
  const res = await fetch(`${process.env.API_URL}/question/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cache: "no-cache",
      cookie: `jwt=${jwt}`
    },
    credentials: "include"
  });

  const json = await res.json();

  return {
    question: json.question,
    loggedInUserAnswer: json.loggedInUserAnswer
  };
};

export default QuestionPage;
