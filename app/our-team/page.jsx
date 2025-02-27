import { Button } from "@/components/ui/button";
import Link from "next/link";

// fetch data from strapi and return it
async function getAllTeamMembers() {
  const allTeamMembersPromise = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/team-members?populate=*"
  );
  const teamMembers = await allTeamMembersPromise.json();

  return teamMembers.data;
}

export default async function Page() {
  // use getAllTeamMembers function to get all user data from strapi
  const teamMembers = await getAllTeamMembers();
  //console.log("Team Members: ", teamMembers);
  return (
    <div className="">
      <h1 className="text-4xl mb-6 font-bold text-gray-700">
        Our Team Members
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 -z-10">
        {teamMembers.map((member) => {
          return (
            <Link
              className="group grid grid-cols-[140px_1fr] bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-orange-50"
              key={member.id}
              href={`/our-team/${member.slug}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.photo.formats.medium.url}
                  className="transition duration-300 absolute inset-0 h-full w-full object-cover group-hover:scale-125 group-hover:rotate-12"
                />
              </div>

              <div className="p-4">
                <p className="text-xl text-gray-500 font-bold group-hover:text-blue-500">
                  {member.name}
                </p>
                <p className="text-sm text-gray-500 leading-6">
                  {member.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
