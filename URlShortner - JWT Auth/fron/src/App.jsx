import './App.css';
import Header from './components/Header';
import Login from './components/Login';

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen mx-auto w-full">
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col justify-center items-center flex-grow">
        <section className="text-center text-4xl text-gray-500 mb-8">
          <h1>This is a URL Shortener Website</h1>
        </section>

        <section className="w-full max-w-md">
          <Login />
        </section>
      </main>

      {/* Footer Section */}
      <footer className="text-center text-sm text-gray-400 py-4">
        <p>© 2024 URL Shortener. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
