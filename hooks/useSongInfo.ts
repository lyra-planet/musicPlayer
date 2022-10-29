import { useRecoilState } from "recoil"
import useSpotify from "./useSpotify"
import { currentTrackIdState, currentTrackNameState } from '../atoms/songAtom';
import { useState, useEffect } from 'react';
const useSongInfo = () => {
    const spotifyAPI = useSpotify()
    const [currentTrackId,setCurrentTrackId]= useRecoilState(currentTrackIdState)
    const [currentTrackName,setCurrentTrackName]= useRecoilState(currentTrackNameState)
    const [songInfo,setSongInfo] = useState(null)
    const [songData,setSongData] = useState(null)
    useEffect(()=>{
    console.log(currentTrackId)
    const fetchSongInfo =async () => {
            if(currentTrackId&&currentTrackName){
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`,{
                    headers:{
                        Authorization:`Bearer ${spotifyAPI.getAccessToken()}`
                    }
                }).then(res=>res.json())
                const songList  = await fetch(`https://netease.magickai.cn/search?keywords=${currentTrackName}&realIP=116.25.146.177`).then(res=>res.json())
                if(!songList?.result.songs?.[0]){
                    alert("这首歌没在网易云中找到哦")
                    return
                }
                const song  = await fetch(`https://netease.magickai.cn/song/url?id=${songList.result.songs[0].id}&realIP=116.25.146.177`).then(res=>res.json())
                setSongData(song.data[0])
                setSongInfo(trackInfo)
            }
        }
    fetchSongInfo()
    
    },[currentTrackId,currentTrackName,spotifyAPI])
  return {
    songInfo:songInfo,
    songData:songData
  }
}

export default useSongInfo