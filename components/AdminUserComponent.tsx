import { useMutation } from "@apollo/client";
import { gql } from "apollo-server-micro";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { ThreeDotsVertical } from "styled-icons/bootstrap";
import {
  EditOutline,
  PersonDeleteOutline,
} from "styled-icons/evaicons-outline";
import { Cancel } from "styled-icons/material-outlined";
import { ArrowRight } from "styled-icons/bootstrap";
import ClickAwayListener from "react-click-away-listener";
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

const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      firstName
      lastName
      id
      email
      role
      image
    }
  }
`;

const AdminUserComponent = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteUserMutation] = useMutation(DELETE_USER);
  const deleteUser = () => {
    deleteUserMutation({
      variables: {
        id: user.id,
      },
      refetchQueries: [{ query: FIND_ALL_USERS }],
    });
  };
  const handleClickAway = () => {
    setMenuOpen(!menuOpen);
  };
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const router = useRouter();

  return (
    <div className="flex group justify-between items-center  hover:bg-gray-300 duration-150 border-gray-300 px-2 py-1  first:hover:rounded-t-md">
      <div className="flex-1 ">
        <Image
          src={user.image}
          alt={`${user.firstName}'s avatar`}
          width={50}
          height={50}
          className="object-contain hover:cursor-pointer"
          onClick={() => router.push(`/people/${user.id}`)}
        />
      </div>
      <p className="flex-1 ">
        NAME: {user.firstName} {user.lastName}
      </p>
      <p className="hidden md:flex md:flex-2 ">ID: {user.id}</p>
      <p className="flex-1 text-red-700 font-semibold text-right">
        ROLE:
        <span className="text-blue-400 font-normal"> {user.role}</span>
      </p>
      <div className="flex flex-1 justify-end relative">
        <button
          type="button"
          className="w-10 h-10 text-gray-400 opacity-100 duration-150 group-hover:opacity-100"
          onClick={handleMenu}
        >
          {!menuOpen ? (
            <ThreeDotsVertical
              title="User Options"
              className="hover:cursor-pointer hover:text-blue-500 duration-150"
            />
          ) : (
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="flex flex-col bg-gray-300 rounded-md border border-gray-500 w-36 absolute top-0 right-0 z-50 opacity-80">
                <ul>
                  <li
                    className="flex items-center justify-between px-2 border-b border-gray-400 py-1 text-black hover:text-red-500 hover:bg-gray-200 rounded-t-md duration-150"
                    onClick={() => router.push(`/people/${user.id}`)}
                  >
                    <div className="w-8">
                      <ArrowRight
                        title="Go to profile"
                        className="hover:cursor-pointer  duration-150"
                      />
                    </div>
                    Go To User
                  </li>
                  <li
                    className="flex items-center justify-between px-2 border-b border-gray-400 py-1 text-black hover:bg-gray-200 duration-150 hover:text-red-500 "
                    onClick={deleteUser}
                  >
                    <div className="w-8">
                      <PersonDeleteOutline
                        title="Delete User"
                        className="hover:cursor-pointer  duration-150"
                      />
                    </div>
                    Delete User
                  </li>

                  <li
                    className="flex items-center justify-between  px-2 py-1 text-black hover:bg-gray-200 rounded-b-md hover:text-red-500 duration-150"
                    onClick={() => router.push(`/people/${user.id}/edit`)}
                  >
                    <div className="w-8">
                      <EditOutline
                        title="Edit User"
                        className="hover:cursor-pointer  duration-150"
                      />
                    </div>
                    Edit User
                  </li>
                  <li
                    className="flex items-center justify-between px-1 border-gray-400 py-1 border-t text-black hover:bg-gray-200 duration-150 hover:text-red-500 rounded-b-md"
                    onClick={handleMenu}
                  >
                    <div className="flex w-8">
                      <Cancel
                        title="Cancel"
                        className="hover:cursor-pointer  duration-150"
                      />
                    </div>
                    <p>Close</p>
                  </li>
                </ul>
              </div>
            </ClickAwayListener>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminUserComponent;
