import './styles/App.css';
import Navigation from './components/Navigation.js';
import Login from './components/Login';
import { useState } from 'react';
import { Navigate, Routes, Route } from 'react-router';
import axios from 'axios';
import MePage from './components/pages-components/MePage';
const { REACT_APP_BACKEND_URL } = process.env;

function App() {
    const [user, setUser] = useState(null);

    const handler = async (e) => {
        e.preventDefault();
        const { username, password } = e.target;
        const formData = new URLSearchParams();
        formData.append('username', username.value);
        formData.append('password', password.value);

        //Connect to DB and check credentials
        let res = await axios
            .post(`${REACT_APP_BACKEND_URL}/api/login`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .catch((err) => console.log(err.message));
        if (res && res.status === 200) {
            setUser(username.value);
        }
    };
    return (
        <div className='App'>
            <Navigation></Navigation>

            <Routes>
                <Route
                    path='/'
                    element={
                        user === null ? (
                            <Login handleSubmit={handler}></Login>
                        ) : (
                            <Navigate to='/me'></Navigate>
                        )
                    }
                ></Route>
                <Route path='/movies'></Route>
                <Route path='/shows'></Route>
                <Route path='/calendar'></Route>
                <Route path='/me' element={<MePage></MePage>}></Route>
            </Routes>
        </div>
    );
}

export default App;
