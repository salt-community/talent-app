import Icon from "@/app/assets/icons/Icon";
import capitalize from "@/utils/capitalize";
import Link from "next/link";
const pages = ["users", "favorited", "visits", "search"] as const;
const icons = ["admin", "star", "eye", "search"] as const;
type Props = { page: (typeof pages)[number] };
const Navbar = ({ page }: Props) => {
  return (
    <nav>
      <ul className="flex w-full justify-evenly bg-pink/30 p-2 text-sm">
        {pages.map((p, i) => {
          const active = page === p;
          return (
            <li key={p} className="group">
              <Link className="flex flex-col items-center" href={`/admin/${p}`}>
                <Icon
                  icon={icons[i]!}
                  className={`h-10 group-hover:animate-spin ${
                    active && "fill-orange"
                  }`}
                />
                <p className={`${active && "font-bold"}`}>{capitalize(p)}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
