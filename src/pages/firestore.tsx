import { useEffect, useState } from "react";

import UserCollection, { queryByUsername } from "~/libs/unej-io/firebase/firestore/UserCollection";

function firestore() {
  const [username] = useState("flamrdevs");

  useEffect(() => {
    queryByUsername(username)
      .then((snapshot) => {
        if (!snapshot.empty) {
          throw new Error("Username already exist");
        }

        return UserCollection.addDoc({ username });
      })
      .then(() => {
        console.log("Username added");
      })
      .catch((error) => {
        if (error instanceof Error) {
          const { message } = error;
          console.error(message);
        }
      });
  }, []);

  return (
    <>
      <div>UserCollection.addDoc({username})</div>
    </>
  );
}

export default firestore;
