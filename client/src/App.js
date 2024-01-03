
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';
import TheatresForMovie from './pages/TheatresForMovie';
import BookShow from './pages/BookShow';


function App() {

  const loading = useSelector((state)=>state.loaders.loading);

  return (
    <>{loading && <Loader/>}
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<ProtectedRoute><Home/></ProtectedRoute> }/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/register' element = {<Register/>}/>
          <Route path='/profile' element = {<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path='/admin' element = {<ProtectedRoute><Admin/></ProtectedRoute> }/>
          <Route path='/movie/:id' element = {<ProtectedRoute><TheatresForMovie/></ProtectedRoute> }/>
          <Route path='/book-show/:id' element = {<ProtectedRoute><BookShow/></ProtectedRoute> }/>
   
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
