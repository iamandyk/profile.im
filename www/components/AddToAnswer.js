import { useContext } from "react";
import { useState } from "react";
import { useFetch } from "react-async";
import { useLoggedInUser } from "../hooks/useLoggedInUser";

export default ({ answerID }) => {
  const user = useLoggedInUser();
  const [inputs, setState] = useState({ item: "" });
  const { data, error, isLoading, run } = useFetch(
    `${process.env.API_URL}/add_item`,
    {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ answer_id: answerID, item: inputs.item })
    }
  );

  const handleInputChange = e => {
    e.persist();
    setState(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    run();
  };

  if (!user) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>Add to answer</div>

      <div>
        <input
          onChange={handleInputChange}
          type="text"
          name="item"
          value={inputs.item}
        />
      </div>

      <input type="submit" value="Add" />
    </form>
  );
};
