import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
const FETCH_USER = gql`
  query FetchUser($userId: String!) {
    findUser(id: $userId) {
      firstName
      lastName
      email
      id
      image
      role
    }
  }
`;

const index = () => {
  const router = useRouter();
  let userId = router.query.id;
  const { data, loading, error } = useQuery(FETCH_USER, {
    variables: { userId },
  });
  let user = data?.findUser[0];
  console.log(user);
  if (loading) return <p>loading</p>;
  if (error) return <p>oh no ... {error.message}</p>;
  return (
    <div>
      <Head>
        <title>{`${user.firstName} ${user.lastName}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex max-w-md">
        <img
          src={data?.findUser[0].image}
          alt={`${data?.findUser[0].name}'s avatar`}
        />
      </div>

      <p>Name: {data?.findUser[0].name}</p>
      <p>Email: {data?.findUser[0].email}</p>
      <p>ID: {data?.findUser[0].id}</p>
    </div>
  );
};

export default index;
