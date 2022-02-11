import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
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

const edit = () => {
  const router = useRouter();
  let userId = router.query.id;
  const { data, loading, error } = useQuery(FETCH_USER, {
    variables: { userId },
  });
  let user = data?.findUser[0];
  if (loading) return <p>loading</p>;
  if (error) return <p>oh no ... {error.message}</p>;
  return (
    <div className="flex flex-col mx-auto items-center justify-center md:max-w-5xl md:container md:justify-start md:items-start my-20">
      <Head>
        <title>{`EDIT USER ${user.firstName} ${user.lastName}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <h1 className="text-3xl font-semibold">EDIT USER</h1>
      </div>
      <div className="flex items-center justify-center py-2 h-auto bg-gradient-to-tr from-orange-300 via-red-300 to-pink-300 max-w-sm rounded-lg">
        <Image
          src={user.image}
          alt={`${user.name}'s avatar`}
          width={450}
          height={400}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col ml-5 mt-5">
        <p className="text-lg font-light">
          <span className="text-blue-500 font-medium text-lg">Name: </span>
          {user.firstName} {user.lastName}
        </p>
        <p className="text-lg font-light">
          <span className="text-blue-500 font-medium text-lg">Email: </span>
          {user.email}
        </p>
        <p className="text-lg font-light">
          <span className="text-blue-500 font-medium text-lg">ID: </span>
          {user.id}
        </p>
        <p className="text-lg  font-medium text-green-500">
          <span className="text-red-700 font-medium text-lg">Role: </span>
          {user.role}
        </p>
      </div>
    </div>
  );
};

export default edit;
