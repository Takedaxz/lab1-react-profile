import { useState, useEffect } from 'react';
import ProfileCard from './components/ProfileCard';

function App() {
  const [githubData, setGithubData] = useState(null);
  const username = "takedaxz";

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => {
        setGithubData(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>My First React App</h1>
      {githubData ? (
        <ProfileCard
          name={githubData.name || githubData.login}
          role="GitHub User"
          bio={githubData.bio || "No bio available"}
        />
      ) : (
        <p>Loading data from GitHub...</p>
      )}
    </div>
  );
}

export default App;