import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout } from './components/Index.js'
import AllPosts from './pages/AllPosts.jsx'
import Addpost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Login from "./pages/Login.jsx"
import Signup  from './pages/Signup.jsx'
import ChangePassword from './pages/ChangePassword.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<AuthLayout authentication={false}> <Login /> </AuthLayout>} />
      <Route path='/signup' element={<AuthLayout authentication={false}> <Signup /> </AuthLayout>} />
      <Route path='/change-password' element={<AuthLayout authentication={false}><ChangePassword /></AuthLayout>} />
      <Route path='/all-posts' element={<AuthLayout authentication>{" "}<AllPosts /></AuthLayout>} />
      <Route path='/add-post' element={<AuthLayout authentication>{" "}<Addpost /></AuthLayout>} />
      <Route path='/edit-post/:slug' element={<AuthLayout authentication>{" "}<EditPost /></AuthLayout>} />
      <Route path='/post/:slug' element={<AuthLayout authentication>{" "}<Post /></AuthLayout>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
