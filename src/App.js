import './App.css';
import Navbar from './components/UI/Navbar';
import UserProvider from './context/User';

function App( {children}) {
  return (
    <UserProvider url= "https://jsonplaceholder.typicode.com/users">
      <Navbar />
      {children}
    </UserProvider>
  );
}

export default App;
