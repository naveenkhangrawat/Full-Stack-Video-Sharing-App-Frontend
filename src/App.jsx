
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import ChannelPage from './pages/channel/ChannelPage'
import ChannelVideosPage from './pages/channel/ChannelVideosPage'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ChangePassword from './components/ChangePassword'
import EditPersonalInfo from './components/EditPersonalInfo'
import DashboardPage from './pages/DashboardPage'
import HistoryPage from './pages/HistoryPage'
import LikedVideosPage from './pages/LikedVideosPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import ChannelPlaylistPage from './pages/channel/ChannelPlaylistPage'
import EditChannelPage from "./pages/channel/EditChannelPage";
import { Toaster } from 'react-hot-toast'
import ChannelTweetsPage from './pages/channel/ChannelTweetsPage'
import ChannelSubscribersPage from './pages/channel/ChannelSubscribersPage'
import VideoDetailPage from './pages/VideoDetailPage'
import AuthLayout from './components/AuthLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCurrentUser, getUserChannelProfile, refreshingAccessToken } from './utils/fetchData/user'
import { login, logout } from './reduxTK/userSlice'
import { isLoadingFalse, isLoadingTrue } from './reduxTK/configSlice'
import SearchVideosPage from './pages/SearchVideosPage'
import PlaylistVideosPage from './pages/PlaylistVideosPage'
import { emptyChannelInfo, setChannelInfo } from './reduxTK/channelSlice'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>

        <Route path='/' element={<Layout />}>
          <Route path='' element={<HomePage />}/>
          <Route path='/search/:query' element={(
            <AuthLayout authentication={true}>
              <SearchVideosPage />
            </AuthLayout>
          )} />
          <Route path='/channel/:username' element={(
            <AuthLayout authentication={true}>
              <ChannelPage />
            </AuthLayout>
          )}>
            <Route path='videos' element={(
              <AuthLayout authentication={true}>
                <ChannelVideosPage />
              </AuthLayout>
            )} />

            <Route path='playlists' element={(
              <AuthLayout authentication={true}>
                <ChannelPlaylistPage />
              </AuthLayout>
            )} />

            <Route path='tweets' element={(
              <AuthLayout authentication={true}>
                <ChannelTweetsPage />
              </AuthLayout>
            )}/>

            <Route path='subscribers' element={(
              <AuthLayout authentication={true}>
                <ChannelSubscribersPage />
              </AuthLayout>
            )} />
          </Route>

          <Route path='/playlist/:playlistName' element={(
            <AuthLayout authentication={true}>
              <PlaylistVideosPage />
            </AuthLayout>
          )} />

          <Route path='/channel/edit' element={(
            <AuthLayout authentication={true}>
              <EditChannelPage />
            </AuthLayout>
          )}>
            <Route path='personal-info' element={(
              <AuthLayout authentication={true}>
                <EditPersonalInfo />
              </AuthLayout>
            )} />

            <Route path='password' element={(
              <AuthLayout authentication={true}>
                <ChangePassword />
              </AuthLayout>
            )} />
          </Route>

          <Route path='/history' element={(
            <AuthLayout authentication={true}>
              <HistoryPage />
            </AuthLayout>
          )} />

          <Route path='/liked-videos' element={(
            <AuthLayout authentication={true}>
              <LikedVideosPage />
            </AuthLayout>
          )} />

          <Route path='/subscriptions' element={(
            <AuthLayout authentication={true}>
              <SubscriptionsPage />
            </AuthLayout>
          )}/>
        </Route>

        <Route path='/signup' element={(
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )}/>

        <Route path='/login' element={(
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )} />

        <Route path='/collections' element={(
          <AuthLayout authentication={true}>
            <DashboardPage />
          </AuthLayout>
        )} />

        <Route path='/watch/:videoId' element={(
          <AuthLayout authentication={true}>
            <VideoDetailPage />
          </AuthLayout>
        )} />
      </Route>
    )
  )

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  async function fetchCurrentUser(){
    
    try {
      
      const response = await getCurrentUser();
      if(response?.success){
        dispatch(login(response?.data?.userData));

        getUserChannelProfile(response?.data?.userData?.username).then((response) => {
          dispatch(setChannelInfo(response?.data?.channelData))
        }).catch((error) => {console.log(error)});
      }

    } catch (error) {
      if(error?.message === "jwt expired"){
        try {
          const response = await refreshingAccessToken();
          if(response?.success){
            const response = await getCurrentUser();
            if(response?.success){
              dispatch(login(response?.data?.userData));

              getUserChannelProfile(response?.data?.userData?.username).then((response) => {
                dispatch(setChannelInfo(response?.data?.channelData))
              }).catch((error) => {console.log(error)});
            }
          }
        } catch (error) {
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      } 
    }

    setLoading(true);
  }

  useEffect(() => {
    fetchCurrentUser();

    return () => {
      setLoading(false);
      dispatch(logout());
      dispatch(emptyChannelInfo());
    }
  },[])

  return (
    <>
      {loading && (
        <>
        <RouterProvider router={router} />
        <Toaster 
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            success: {
              style: {color: "green"}
            },
            error: {
              style: {color: "red"}
            }
          }}
        />
        </>
      )} 
    </>
  )
}

export default App;
