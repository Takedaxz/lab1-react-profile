function ProfileCard({ name, role, bio }) {

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', margin: '10px' }}>
      <h2>{name}</h2>
      <p><strong>Role:</strong> {role}</p>
      <p>{bio}</p>
    </div>
  );
}

export default ProfileCard;