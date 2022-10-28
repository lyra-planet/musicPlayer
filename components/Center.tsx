import { ChevronDownIcon } from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react"
import { useEffect,useState } from "react"
import {shuffle} from 'lodash'
import { useRecoilValue, useRecoilState } from 'recoil';
import { playListIdState, playListAtomState } from '../atoms/playListAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from "./Songs";
const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]



const Center = () => {
    const {data:session} = useSession()
    const [color,setColor] = useState('')
    const spotifyApi = useSpotify()
    const playListId = useRecoilValue(playListIdState)
    const [playList,setPlayList]= useRecoilState<any>(playListAtomState)
    useEffect(()=>{
        setColor(shuffle(colors).pop() as string)
    },[])
    useEffect(()=>{
        if(spotifyApi.getAccessToken()){
            spotifyApi.getPlaylist(playListId).then(data=>{
                setPlayList(data.body as any)
            }).catch(error=>console.log("some thing went wrong"+error))
        }

 },[spotifyApi,playListId])
  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
        <header className="absolute top-5 right-8">
            <div 
            onClick={()=>signOut()}
            className="flex items-center 
            bg-black opacity-90 space-x-3 hover:opacity-80 
            cursor-pointer rounded-full p-1 pr-2 text-white">
            <img className="rounded-full w-10 h-10" src={session?.user?.image as string} alt="" />
            <h2>{session?.user?.name}</h2>
            <ChevronDownIcon className="h-5 w-5"/>
            </div>
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}>
            <img className="w-44 h-44 shadow-2xl bg-black" src={playList?.images?.[0]?.url} alt="" />
            <div>
                <p>PLAYLIST</p>
                <p className="text-2xl md:text-3xl xl:text-5xl font-bold">{playList?.name}</p>
            </div>
        </section>
        <Songs/>
    </div>
  )
}

export default Center