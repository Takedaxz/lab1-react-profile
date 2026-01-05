import { useState, useEffect } from 'react';
import ProfileCard from './components/ProfileCard';

function App() {
  const [githubData, setGithubData] = useState(null);
  const username = "takedaxz";
  const [skills, setSkills] = useState(['React', 'JavaScript']);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.style.backgroundColor = theme === 'dark' ? '#282c34' : '#ffffff';
    document.body.style.color = theme === 'dark' ? '#ffffff' : '#000000';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const addSkill = () => {
    if (newSkill.trim() !== '') {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const deleteSkill = (indexToDelete) => {
    const updatedSkills = skills.filter((_, index) => index !== indexToDelete);
    setSkills(updatedSkills);
  };

  const filteredSkills = skills
    .map((skill, index) => ({ name: skill, originalIndex: index }))
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.github.com/users/${username}`)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('User not found');
          }
          throw new Error('An error occurred');
        }
        return res.json();
      })
      .then(data => {
        setGithubData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const appStyle = {
    textAlign: 'center',
    padding: '20px',
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={appStyle}>
      <button
        onClick={toggleTheme}
        style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px 20px', cursor: 'pointer', borderRadius: '8px', border: 'none', backgroundColor: theme === 'dark' ? '#ffffff' : '#282c34', color: theme === 'dark' ? '#282c34' : '#ffffff' }}
      >
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      <h1>My First React App</h1>
      {loading ? (
        <p>🌀 Loading...</p>
      ) : error ? (
        <p>❌ {error}</p>
      ) : githubData ? (
        <ProfileCard
          name={githubData.name || githubData.login}
          role="GitHub User"
          bio={githubData.bio || "No bio available"}
        />
      ) : null}
      <div style={{ marginTop: '20px' }}>
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add new skill"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px' }}
        />
        <button
          onClick={addSkill}
          style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
        >
          Add Skill
        </button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search skill..."
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0, marginTop: '20px', listStyle: 'none' }}>
        {filteredSkills.map((item) => (
          <li key={item.originalIndex} style={{
            padding: '5px 0',
            fontWeight: item.name.includes('React') ? 'bold' : 'normal',
            color: item.name.includes('React') ? '#61dafb' : 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {item.name}
            <button
              onClick={() => deleteSkill(item.originalIndex)}
              style={{
                padding: '2px 8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#ff4d4d',
                color: 'white',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;