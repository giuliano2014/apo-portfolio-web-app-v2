export default function Page({ params }: { params: { slug: string } }) {
  return <div>My project: {params.slug}</div>;
}
