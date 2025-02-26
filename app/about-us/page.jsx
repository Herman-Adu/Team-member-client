import { BlocksRenderer } from "@strapi/blocks-react-renderer";

// create a function to pull in the data
async function getContent() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/aboutpage"
  );
  const about = await res.json();

  return about.data.content;
}

export default async function Page() {
  const content = await getContent();

  return (
    <div className="prose max-w-none">
      <BlocksRenderer content={content} />
    </div>
  );
}
