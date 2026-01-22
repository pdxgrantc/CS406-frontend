import Login from './routes/login'

function App() {
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
        <Login />
      </header>
    </div>
  )
}

export default App
