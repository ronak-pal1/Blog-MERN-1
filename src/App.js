import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Layout from './Layout';
import HomePage from './HomePage';
import { UserContextProvider } from './UserContext';
import CreatePost from './CreatePost';
import SinglePostPage from './SinglePostPage';
import EditPost from './EditPost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={'/Login'} element={<Login />}/>
            <Route path={'/Register'} element={<Register />} />
            <Route path={'/create'} element={<CreatePost />} />
            <Route path={'/post/:id'} element={<SinglePostPage />} />
            <Route path={'/edit/:id'} element={<EditPost />} />
          </Route>
        </Routes>
    </UserContextProvider>
        
  );
}

export default App;
