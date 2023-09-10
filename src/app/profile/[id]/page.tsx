export default function UserProfile({ params }: any) {
  return (
    <div>
      <h2>Profile </h2>
      <h1>UserName: {params.id}</h1>
    </div>
  );
}
