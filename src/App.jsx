import ProfileCard from './components/ProfileCard';

function App() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>My Team Portfolio</h1>
      <ProfileCard
          name="Pattaradanai Thanomsittikul"
          role="Student @CEDT"
          bio="Cool"
        />

        <ProfileCard
          name="Jason Dohoe"
          role="Student @CEDT"
          bio="Warm"
        />

    </div>
  );
}

export default App;