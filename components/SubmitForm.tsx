import { useMutation, useQuery } from "@apollo/client";
import { gql } from "apollo-server-micro";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
  query FetchAllUsers {
    findAllUsers {
      id
      firstName
      lastName
      email
      image
      role
    }
  }
`;
const CREATE_NEW_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $image: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      image: $image
    ) {
      firstName
      lastName
      email
      image
    }
  }
`;

const SubmitForm = () => {
  //   const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const [mutateUsers] = useMutation(CREATE_NEW_USER);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });

  const createUser = (e: any) => {
    if (
      newUser.firstName.length === 0 &&
      newUser.email.length === 0 &&
      newUser.lastName.length === 0 &&
      newUser.image.length === 0
    ) {
      console.log("please fill out all fields");
      return null;
    }
    mutateUsers({
      variables: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        image: newUser.image,
      },
      refetchQueries: [{ query: QUERY_ALL_USERS }],
    });
    setNewUser({ firstName: "", lastName: "", email: "", image: "" });
  };

  return (
    <form className="flex max-w-md flex-col bg-gray-100 p-3 rounded">
      <div className="flex">
        <label htmlFor="firstNameInput" />
        <input
          type="text"
          placeholder="FIRST NAME"
          className="flex px-2 py-1 border-none outline-none m-1 rounded-full "
          value={newUser.firstName}
          onChange={(e) =>
            setNewUser({ ...newUser, firstName: e.target.value })
          }
        />
      </div>
      <label htmlFor="lastNameInput" />
      <div className="flex">
        <input
          type="text"
          placeholder="LAST NAME"
          className="flex px-2 py-1 border-0 outline-none m-1 rounded-full"
          value={newUser.lastName}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
        />
      </div>
      <label htmlFor="emailInput" />
      <div className="flex">
        <input
          type="text"
          placeholder="EMAIL"
          className="flex px-2 py-1 border-0 outline-none m-1 rounded-full"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="IMAGE URL"
          className="flex px-2 py-1 border-0 outline-none m-1 rounded-full"
          value={newUser.image}
          onChange={(e) => setNewUser({ ...newUser, image: e.target.value })}
        />
      </div>
      <button
        type="button"
        onClick={createUser}
        className="flex w-min self-center px-2 py-1 mt-2 rounded-lg bg-gray-300"
      >
        Create
      </button>
    </form>
  );
};

export default SubmitForm;
