export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  /* await new Promise(resolve => setTimeout(resolve, 3000)); */
  return <div>Topic Page: {id}</div>;
}
