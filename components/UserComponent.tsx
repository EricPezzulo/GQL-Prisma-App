import Image from "next/image";
import { ArrowRight } from "@styled-icons/bootstrap/ArrowRight";
import { useRouter } from "next/router";
const UserComponent = ({ image, firstName, lastName, email, id, role }) => {
  const router = useRouter();
  return (
    <div className="max-w-md shadow rounded-b-md bg-gradient-to-tr from-orange-300 via-red-300 to-pink-300">
      <Image
        src={image}
        alt={`${firstName}'s avatar picture`}
        width={450}
        height={400}
        className="object-contain"
      />

      <div className="group flex p-3 relative bg-white rounded-b-md">
        <div className="flex flex-col">
          <p className="font-medium text-base text-blue-500">{role}</p>
          <p className="text-lg font-medium">
            {firstName} {lastName}
          </p>
          <p>{email}</p>
          <em>{id}</em>
        </div>
        <button
          onClick={() => router.push(`/people/${id}`)}
          className="opacity-0 group-hover:opacity-100 hover:shadow absolute bottom-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 hover:cursor-pointer duration-200 ease-in-out"
        >
          <ArrowRight className="h-8 w-8 text-gray-500 hover:text-white duration-200" />
        </button>
      </div>
    </div>
  );
};

export default UserComponent;
