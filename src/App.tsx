import Login from './routes/login'
import { userStore, setUser } from '../stores/userStore'
import { useStore } from '@tanstack/react-store'

function App() {
  const user = useStore(userStore, (state) => state.user)
  console.log('Current user:', user)

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('access_token')
  }

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <div className="text-left">
          <h1>Current Features:</h1>
          <div>
            <ul style={{ textAlign: 'left' }}>
              <li>Basic app hosting</li>
              <li>SSO with google</li>
              <li>User data is being saved on login to the database</li>
            </ul>
          </div>
        </div>
        
        {user ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            {user.picture && (
              <img 
                src={user.picture} 
                alt={user.displayName || user.email}
                style={{ borderRadius: '50%', width: '80px', height: '80px' }}
              />
            )}
            <div>
              <h2 style={{ margin: '0.5rem 0' }}>
                {user.displayName || `${user.given_name} ${user.family_name}`}
              </h2>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
                {user.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#61dafb',
                color: '#282c34',
                fontWeight: 'bold'
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Login />
        )}
      </header>
    </div>
  )
}

export default App
