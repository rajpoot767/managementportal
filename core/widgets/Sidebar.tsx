"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../icons/Icon";

const Sidebar: React.FC = () => {
  const pathName = usePathname();

  const navItems = [
    {
      title: "Templates",
      links: [
        {
          href: "/dashboard/templates",
          label: "Templates",
          icon: "templateIcon",
          active: pathName.startsWith("/dashboard/templates"),
        },
      ],
    },
    {
      title: "Matches",
      links: [
        {
          href: "/dashboard/matches/",
          label: "Active Matches",
          icon: "matchIcon",
          active:
            pathName === "/dashboard/matches" ||
            pathName.startsWith("/dashboard/matches/add") ||
            pathName.startsWith("/dashboard/matches/edit"),
        },
        {
          href: "/dashboard/matches/closeMatches",
          label: "Close Matches",
          icon: "closeMatchIcon",
          active: pathName.startsWith("/dashboard/matches/closeMatches"),
        },
      ],
    },
    {
      title: "Leads",
      links: [
        {
          href: "/dashboard/leads",
          label: "Active Leads",
          icon: "leadIcon",
          active:
            pathName === "/dashboard/leads" ||
            pathName.startsWith("/dashboard/leads/edit"),
        },
        {
          href: "/dashboard/leads/closeLeads",
          label: "Close Leads",
          icon: "closeLeadIcon",
          active: pathName.startsWith("/dashboard/leads/closeLeads"),
        },
      ],
    },
  ];

  return (
    <aside className="h-screen w-48 sm:w-56 md:w-64 lg:w-72 bg-gradient-to-r from-primary-950 via-primary-900 to-primary-900 shadow-xl flex flex-col transition-all duration-300 border-r border-gray-700">
      <div className="h-screen overflow-y-auto px-6 py-4">
        {navItems.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-base font-semibold text-primary-200 border-b-2 pb-2 border-primary-400 uppercase tracking-wide">
              {section.title}
            </h3>
            <nav className="mt-3 space-y-3">
              {section.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link.href}
                  className={`py-2 flex items-center gap-3 px-4 text-base rounded-md transition-all duration-300 ease-in-out shadow-md 
                    ${link.active ? "bg-primary-600 text-primary-50 shadow-inner" : "text-primary-200 hover:bg-primary-500 hover:text-primary-50"}`}
                >
                  <Icon name={link.icon} className="size-6 mr-3 fill-white stroke-white" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
