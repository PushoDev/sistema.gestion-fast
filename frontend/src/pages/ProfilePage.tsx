import { useAuth } from "../hooks/useAuth";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <div className="space-y-2">
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>User ID:</strong> {user?.id}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
