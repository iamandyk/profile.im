const express = require("express");
const helmet = require("helmet");
const app = express();
const json = require("body-parser").json;
const mongo = require("mongo");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const slugify = require("@sindresorhus/slugify");
const ObjectID = require("mongodb").ObjectID;
const sanitizeHtml = require("sanitize-html");
const got = require("got");
const urlRegex = require("url-regex");
const appendQuery = require("append-query");
const { extract } = require("oembed-parser");

// add some security-related headers to the response
app.use(helmet());
app.use(json());
app.use(cookieParser());

app.get("*", async (req, res) => {
  const db = await mongo();

  const user_id = req.params.user_id;

  const posts = await db
    .collection("posts")
    .find({ user_id: new ObjectID(user_id) });

  res.send(posts.ops[0]);
});

app.post(
  "*",
  (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      jwt.verify(token, process.env.JWT_SECRET, function(err, payload) {
        if (payload) {
          req.user = payload;
          next();
        } else {
          next();
        }
      });
    } catch (e) {
      next();
    }
  },
  async (req, res) => {
    const db = await mongo();

    const input = req.body;

    let content = input.content;
    let meta = null;
    let oembed = null;

    if (!!content.match(urlRegex())) {
      const firstUrl = content.match(urlRegex())[0];

      try {
        oembed = await extract(firstUrl);

        if (oembed) {
          oembed.url = firstUrl;
        }
      } catch (e) {
        console.log(e);
      }

      if (!oembed) {
        try {
          const { body: data } = await got(
            `${process.env.API_URL}/meta?url=${firstUrl}`,
            {
              json: true,
              headers: {
                "User-Agent": req.headers["user-agent"]
              }
            }
          );

          meta = data;

          if (meta.publisher === "Amazon") {
            meta.url = appendQuery(meta.url, { tag: "profiledotim-20" });
          }
        } catch (e) {
          console.log(e.message);
        }
      }
    }

    sanitizedAnswerContent = sanitizeHtml(content, {
      allowedTags: ["a"],
      allowedAttributes: {
        a: ["href"]
      }
    });

    let post;

    post = await db.collection("posts").insertOne({
      user_id: new ObjectID(req.user.user_id),
      title: input.title,
      description: input.description,
      slug: slugify(input.title),
      type: input.type,
      items: 1,
      content: input.content,
      created_at: new Date(),
      meta,
      oembed
    });

    res.send(post.ops[0]);
  }
);

module.exports = app;
