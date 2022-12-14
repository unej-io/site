import Collection from "./@Collection";

type UserType = {
  username: string;
};

const UserCollection = new Collection<UserType>("users", {
  converter: {
    fromFirestore(snapshot) {
      const data = snapshot.data();

      return {
        id: snapshot.id,
        username: data.username,
      };
    },
    toFirestore(doc) {
      return {
        username: doc.username,
      };
    },
  },
});

async function queryByUsername(username: string) {
  return await UserCollection.query((where) => [where("username", "==", username)]);
}

export { queryByUsername };
export default UserCollection;
