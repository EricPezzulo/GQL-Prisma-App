import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import SubmitForm from "../components/SubmitForm";
import UserComponent from "../components/UserComponent";

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

export default function UsersPage() {
  const { data, loading, error } = useQuery(FIND_ALL_USERS);
  if (loading) return <p>loading</p>;
  if (error) return <p> oh no .. {error.message}</p>;
  return (
    <div className="container mx-auto max-w-5xl my-20">
      <Head>
        <title>Users</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.findAllUsers.map((user: any) => {
          return (
            <li key={user.id}>
              <UserComponent
                image={user.image}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                id={user.id}
                role={user.role}
              />
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center my-2">
        <SubmitForm />
      </div>
    </div>
  );
}
