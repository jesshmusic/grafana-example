import Link from "next/link";
import { IconType } from "react-icons";

type CardProps = {
  description: string;
  CardIcon: IconType;
  title: string;
  url: string;
};

const Card = ({ description, CardIcon, title, url }: CardProps) => {
  return (
    <Link
      href={url}
      className="
        mx-auto flex max-w-sm items-center gap-x-4 rounded-sm
        bg-white p-6 shadow-lg outline outline-black/5
        dark:bg-midnight-neon-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10

        /* transition + hover states */
        transition-colors duration-500 ease-in-out
        hover:bg-gray-100
        dark:hover:bg-midnight-neon-700
      "
    >
      <CardIcon className="size-12" />

      <div>
        <div className="text-xl font-medium text-black dark:text-white">
          {title}
        </div>
        <p className="text-gray-500 dark:text-gray-200">{description}</p>
      </div>
    </Link>
  );
};

export default Card;
