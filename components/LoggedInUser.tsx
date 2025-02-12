import Image from "next/image";

type LoggedInUserProps = {
  name?: string;
  avatar?: string;
};

export default async function LoggedInUser(props: LoggedInUserProps) {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-md bg-gray-50">
      {props.avatar ? (
        <Image
          src={props.avatar}
          alt="User Avatar"
          className="h-8 w-8 rounded-full"
          width={32}
          height={32}
          unoptimized
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-gray-300 font-extrabold text-5xl flex items-center justify-center overflow-hidden">
          <span className="opacity-20">X</span>
        </div>
      )}
      <span className="text-sm font-medium">{props.name || "Test user"}</span>
    </div>
  );
}
