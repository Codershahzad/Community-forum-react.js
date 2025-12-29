import { auth } from "../firebase";

export default function Profile() {
  const user = auth.currentUser;

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <p>User ID: {user.uid}</p>
    </div>
  );
}
