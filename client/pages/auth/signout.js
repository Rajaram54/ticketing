import {useEffect} from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';
export default () => {
    const {doRequest} = useRequest({
        url:'/api/user/signout',
        body: {},
        method: 'post',
        onSuccess: () => Router.push('/')
    });

    useEffect(()=>{
        doRequest();
    }, [])
    return <h1>Signing out...</h1>
}