import Link from "next/link";

const LinkButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link className="bg-primary p-3 text-white rounded-md" href={href}>
      {text}
    </Link>
  );
};

export default LinkButton;
