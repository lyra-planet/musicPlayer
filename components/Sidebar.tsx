import React, { useEffect, useState } from 'react'
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    HeartIcon,
    RssIcon,
    PlusCircleIcon
}from '@heroicons/react/outline'
import {signOut, useSession} from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playListIdState } from '../atoms/playListAtom'



const Sidebar = () => {
    const spotifyApi = useSpotify()
    const {data:session, status} = useSession()
    const [playLists,setPlayLists]= useState([])
    const [playListId,setPlayListId] = useRecoilState(playListIdState)
    useEffect(()=>{
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data)=>{
                //@ts-ignore
                setPlayLists(data.body.items)
            })
        }

    },[session,spotifyApi])
    return (
    <div className='
    text-gray-500 p-5 
    text-xs border-r 
    border-gray-900 
    overflow-y-scroll 
    
    h-screen scrollbar-hide
    lg:text-sm
    sm:max-w-[12rem]
    md:min-w-[13rem]
    lg:max-w-[15rem]
    hidden
    md:inline-flex
    pb-36
    '>
       <div className='space-y-4'>

        <button className='flex items-center space-x-2 hover:text-white '>
            <HomeIcon className='h-5 w-5'/>
            <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white '>
            <SearchIcon className='h-5 w-5'/>
            <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white '>
            <LibraryIcon className='h-5 w-5'/>
            <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900'/>
        <button className='flex items-center space-x-2 hover:text-white '>
            <PlusCircleIcon className='h-5 w-5'/>
            <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white '>
            <HeartIcon className='h-5 w-5'/>
            <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white '>
            <RssIcon className='h-5 w-5'/>
            <p>Your episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900'/>

        {
            playLists.map((playList:any)=>{
                return(        
                <p             
                key={playList.id}
                onClick={() => setPlayListId(playList.id)}
                className="cursor-pointer hover:text-white">
                {playList.name}
                </p>)
            })
        }


       </div>
    </div>
  )
}

export default Sidebar