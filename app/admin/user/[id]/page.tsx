interface DynamicProps {
  params: { id: string };
}
const Dynamic = async ({ params }: DynamicProps) => {
  const { id } = await params;
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default Dynamic;
