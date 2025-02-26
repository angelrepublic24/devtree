import React from 'react'
import { UserName } from '../types'

type Props = {
    user: UserName
}
export default function UserNameData({user}: Props) {

    const links = JSON.parse(user.links).filter((link) => link.enabled);
    console.log(links)
    
  return (
    <div className='space-y-6 text-white'>
        <p className='text-5xl text-center font-semibold'>{user.username}</p>
        {user.image && <img src={`${user.image}`}  className='max-w-[250px] mx-auto'/>}
        <p className='text-lg text-center '>{user.description}</p>


      
    </div>
  )
}
