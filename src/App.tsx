import Login from './routes/login'

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <Login onSignedIn={(token) => {
          console.log('Signed in with token:', token);
        }} />
      </header>
    </div>
  )
}

export default App
