import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import Main from './components/Main.jsx';

export default function App() {
  return (
    <body>
      <header>
        <Header />
      </header>
    
      <main>
        <SearchBar />
        <Main />
      </main>
    </body>
  );
}
