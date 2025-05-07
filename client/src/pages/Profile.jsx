import { useAuth } from "../context/authContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
    </div>
  );
}