import { useQuery } from '@tanstack/react-query';
import React from 'react'
import {Navigate, useParams} from 'react-router-dom'
import { getUsername } from '../api/DevTreeAPI';
import UserNameData from '../components/UserNameData';
export default function UserView() {
  const params = useParams();
  const username = params.username!;

  const {data, error, isLoading} = useQuery({
    queryFn: () => getUsername(username),
    queryKey: ['username', username],
  })

  if(isLoading) return <p className='text-center text-white'>Loading...</p>
  if(error) return <Navigate to={'/404'} />

if (data) return <UserNameData user={data} />
}
