// 1. creating the folder structure - [slug] under our-team folder

// 2. add a new page to the folder

import { BlocksRenderer } from "@strapi/blocks-react-renderer";

// 3. install and import the qs library
import qs from "qs";
import Spoiler from "@/components/Spoiler";
import Testimonial from "@/components/Testimonial";
import Link from "next/link";

// 6 create a query to fetech the data for this team member. to do that  will use qs query builder a popular npm package used for serializing JavaScript objects into query strings
async function fetchTeamMember(slug) {
  //  7. build out the query
  const getMemberQuery = qs.stringify({
    filters: {
      slug: slug,
    },
    // populate all components in dynamic zone
    populate: {
      photo: {
        populate: "*",
      },
      bodyContent: {
        on: {
          "features.rich-text": {
            populate: "*",
          },
          "features.spoiler": {
            populate: "*",
          },
          "features.testimonial": {
            populate: "*",
          },
        },
      },
    },
  });

  // 8. pass in the query to end of fetch
  const teamMemberPromise = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + `/api/team-members?${getMemberQuery}`
  );

  // 9.
  const teamMember = await teamMemberPromise.json();
  //console.log("Team Member: ", teamMember);

  // 10.
  return teamMember.data[0];
}

function BlockRenderer(item, index) {
  if (item.__component === "features.testimonial") {
    //return <p>This is a testimonial component</p>;
    return <Testimonial key={index} data={item} />;
  }

  if (item.__component === "features.spoiler") {
    /* return <p>This is a spoiler component</p>; */
    return <Spoiler key={index} data={item} />;
  }

  if (item.__component === "features.rich-text") {
    //return <p>This is a rich text component</p>;
    return <BlocksRenderer key={index} content={item.content} />;
  }
}

// 11. to deploy this as SSG we need to know all urls therefore param before depolyment, needed for the build
export async function generateStaticParams() {
  const membersPromise = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/team-members?populate=*"
  );

  const members = await membersPromise.json();

  return members.data.map((member) => {
    return {
      slug: member.slug,
    };
  });
}

// 4. Use the params object to get the part of the slug we pass we in for our sepecfic team member
export default async function Page({ params }) {
  // 11. you must await params in next 15 as
  const { slug } = await params;
  //console.log("PARAMS: ", slug);

  // 11.1. call the fetchTeamMember function and pass in the slug to get data for ruser
  const member = await fetchTeamMember(slug);
  //console.log(member);

  return (
    <div>
      {/* 5. test we get back the slug for individual user 
      <h4>{params.slug}</h4> */}

      {/* 12. instead of params.slug lets call the team member name - check browser */}
      {/* <h2>{member.name}</h2> */}

      {/* 13. add description */}
      {/* <h3>{member.description}</h3>
      <br /> */}

      {/* final stage create 2 divs the first one will be the banner div and second will be our content div with prose */}
      <div className="text-white relative bg-gray-700 px-14 py-16 -mx-8 -mt-7">
        <h2 className="text-3xl sm:text-6xl font-bold relative z-10">
          {member.name}
        </h2>
        <img
          className="object-cover absolute top-0 bottom-0 left-1/2 right-0 block w-1/2 h-full opacity-50 filter grayscale"
          src={member.photo.formats.medium.url}
        />
        <div className="absolute z-0 w-80 bg-gradient-to-r from-gray-700 to-transparent h-full top-0 bottom-0 left-1/2"></div>
      </div>

      <div className="transform -translate-y-1/2">
        <Link
          href="/our-team"
          className=" z-30 text-sm bg-blue-500 text-white hover:bg-gray-600 hover:text-white inline-block rounded-lg py-3 px-5"
        >
          &laquo; Back to all team members
        </Link>
      </div>

      <div className="prose max-w-none">
        {member.bodyContent.map((item, index) => BlockRenderer(item, index))}
      </div>
    </div>
  );
}
