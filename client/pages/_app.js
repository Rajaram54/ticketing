import 'bootstrap/dist/css/bootstrap.css';
import baseClient from '../api/base-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return <><Header currentUser={currentUser}></Header><Component {...pageProps} /></>
};


AppComponent.getInitialProps = async (appContext) => {
    const { data } = await baseClient(appContext.ctx).get('/api/user/currentuser');

    let pageProps;
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
        pageProps,
        ...data
    };
}

export default AppComponent;