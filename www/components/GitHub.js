export default ({ item }) => (
  <div>
    <a href={`https://github.com/${item.handle}`} target="_blank">
      {item.handle}
    </a>

    <style jsx>
      {`
        a {
          text-decoration: none;
        }
      `}
    </style>
  </div>
);
