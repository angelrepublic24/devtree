import React from 'react'
import { SocialNetwork, UserName } from '../types'

type Props = {
    user: UserName
}
export default function UserNameData({user}: Props) {

    const links: SocialNetwork[] = JSON.parse(user.links).filter((link: SocialNetwork) => link.enabled);
    
  return (
    <div className='space-y-6 text-white'>
        <p className='text-5xl text-center font-semibold'>{user.username}</p>
        {user.image && <img src={`${user.image}`}  className='max-w-[250px] mx-auto'/>}
        <p className='text-lg text-center '>{user.description}</p>
        <div className="mt-20 flex flex-col gap-6">
            {links.length 
            ? links.map(link => (
                <a 
                key={link.name}
                className='bg-white px-5 py-2 flex items-center gap-5 rounded lg'
                href={link.url}
                target='_blank'
                rel='noreferrer noopener'
                >
                    <img src={`/social/icon_${link.name}.svg`} alt={link.name} className='w-12' />
                    <p className='text-black capitalize font-semibold text-lg'>Visit my {link.name}</p>
                </a>
            ))
            : <p className='text-center'>There is not link to display on this profile</p>}
        </div>

      
    </div>
  )
}
