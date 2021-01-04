import axios from 'axios';
import baseClient from '../api/base-client';
const LandingPage = ({ currentUser }) => {
    return currentUser ? <h1> You are logged in </h1> : <h1> You are logged out</h1>
};

LandingPage.getInitialProps = async (context) => {
    const { data } = await baseClient(context).get('/api/user/currentuser');

    return data;
};


export default LandingPage;