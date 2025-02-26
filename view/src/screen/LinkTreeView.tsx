import { useEffect, useState } from 'react'
import {social} from '../data/social'
import DevTreeInput from '../components/DevTreeInput';
import { isValidUrl } from '../utils';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../api/DevTreeAPI';
import { IUser, SocialNetwork } from '../types';

export default function LinkTreeView() {
  const [devLinks, setDevLinks ] = useState(social);
  const queryClient = useQueryClient();
  const user: IUser = queryClient.getQueryData(['user'])!;
  const {mutate} = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Updated!')
    }
  })

  useEffect(() => {
    const updatedData = devLinks.map(item => {
    const userLink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name);
    if(userLink) {
      return { ...item, url: userLink.url, enabled: userLink.enabled}
    }
    return item;
    })
    setDevLinks(updatedData)
  }, [])

  const handleUrlChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const updateLinks = devLinks.map(link => link.name === e.target.name ? {...link, url: e.target.value} : link)
    setDevLinks(updateLinks)
  }

  const links: SocialNetwork[] = JSON.parse(user.links);

  const handleEnableLink = (socialNetwork: string) => {
    const updateLinks = devLinks.map(link => {
      if(link.name === socialNetwork){
        if(isValidUrl(link.url)){
          return {...link, enabled: !link.enabled}
        } else{
          toast.error('Url is not valid')
        }
      }
     return link
      
    })
    setDevLinks(updateLinks)
    let updatedItem: SocialNetwork[] = []
    const selectedSocialNetwork = updateLinks.find(link => link.name === socialNetwork);
    if(selectedSocialNetwork?.enabled) {
      const id = links.filter(link => link.id).length + 1
      if(links.some(link => link.name === socialNetwork)){
        updatedItem = links.map(link => {
          if(link.name === socialNetwork){
            return {
              ...link,
              enabled: true,
              id
            }
          }else{
            return link
          }
        })
      }else{

        const newItem = {
          ...selectedSocialNetwork,
          id: links.length + 1,
        }
        updatedItem = [...links, newItem]
        console.log('enabled', selectedSocialNetwork)
      }
    }else{
      const indexToUpdates = links.findIndex(link => link.name !== socialNetwork)
      updatedItem = links.map(link => {
        if(link.name === socialNetwork){
          return {
            ...link,
            id: 0,
            enabled: false
          }
        } else if (link.id > indexToUpdates && (indexToUpdates !== 0 && link.id === 1)) {
          return {
            ...link,
            id: link.id - 1
          }
        }else {
          return link
        }
      })
      console.log(indexToUpdates)
    }

    // Save  database
    queryClient.setQueryData(['user'], (prevData: IUser) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItem)
      }
    })

    
  }
  return (
    <div className='space-y-5'>
      {devLinks.map(item => (
        <DevTreeInput key={item.name} item={item} handleUrlChange={handleUrlChange} handleEnableLink={handleEnableLink}/>
      ) )}
      <button className='bg-cyan-400 p-2 text-lg w-full text-slate-600 uppercase rounded-lg font-bold' onClick={() => mutate(queryClient.getQueryData(['user'])!)}>Save Changes</button>
    </div>
  )
}
