import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-micro";
import AdminUserComponent from "../components/AdminUserComponent";
const FIND_ALL_USERS = gql`
  query {
    findAllUsers {
      id
      firstName
      lastName
      image
      email
      role
    }
  }
`;

const admin = () => {
  const { data, loading, error } = useQuery(FIND_ALL_USERS);

  if (loading)
    return (
      <div className="container flex flex-col mx-auto my-20">
        <h1 className="text-3xl font-semibold">Admin Portal</h1>
        <div className="bg-gray-100">
          <div className="flex">
            <p>loading users</p>
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="container flex flex-col mx-auto my-20">
        <h1 className="text-3xl font-semibold">Admin Portal</h1>
        <div className="bg-gray-100">
          <div className="flex flex-col">
            <p>Ooops theres been an error fetching users</p>
            <p>{error.message}</p>
          </div>
        </div>
      </div>
    );

  console.log(data);
  return (
    <div className="container flex flex-col mx-auto my-20">
      <h1 className="text-3xl font-semibold">Admin Portal</h1>

      <div className="bg-gray-100 border rounded-md border-gray-300">
        <ul className="first:rounded-t-md first:hover:rounded-t-md">
          {data &&
            data.findAllUsers.map((user: any) => (
              <li key={user.id}>
                <AdminUserComponent user={user} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default admin;
