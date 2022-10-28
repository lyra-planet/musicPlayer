import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  SwitchHorizontalIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  isPlayingState,
  currentTrackIdState,
  currentTrackNameState,
} from "../atoms/songAtom";
import { useState, useEffect, useRef } from "react";
import useSongInfo from "../hooks/useSongInfo";

const Player = () => {
    const ref = useRef<HTMLAudioElement>()
  const spotifyAPI = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [currentTrackName, setCurrentTrackName] = useRecoilState(
    currentTrackNameState
  );
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const [duration,setDuration] = useState(0)
  const song = useSongInfo();
  const handlePlayPause= ()=>{
    const audio = ref.current
    if(audio){
        if(audio.paused){
            setIsPlaying(true)
            audio.play()
        }else{
            setIsPlaying(false)
            audio.pause()
        }
    }
  }
  useEffect(() => {
    if (spotifyAPI.getAccessToken() && currentTrackId && currentTrackName) {
      setIsPlaying(true);
      setVolume(50);
    }
    console.log(ref.current)
    const audio = ref.current
    if(audio){
        audio.addEventListener('loadeddata', () => {
            let duration = audio.duration;
            setDuration(duration)
          })
          audio.addEventListener("canplaythrough",() => {
            audio.play();
        });
    }
  }, [currentTrackId, spotifyAPI, currentTrackName]);
  useEffect(()=>{
    const audio = ref.current
    if(audio){
        audio.volume = volume/100
    }
  },[volume])
  return (
    <div className="grid grid-cols-3 text-white h-24 bg-gradient-to-b from-black to-gray-900 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <div>
          <img
            className="hidden sm:inline h-10 w-10"
            src={song.songInfo?.album.images?.[0]?.url}
            alt=""
          />
        </div>
        <div>
          <h3>{song?.songInfo?.name}</h3>
          <p>{song?.songInfo?.artists?.[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="w-5 h-5 hover:scale-125 transform duration-100 ease-out" />
        <RewindIcon className="w-5 h-5 hover:scale-125 transform duration-100 ease-out" />
        {isPlaying?(
            <PauseIcon onClick={handlePlayPause} className="w-10 h-10 hover:scale-125 transform duration-100 ease-out"/>
        ):(<PlayIcon onClick={handlePlayPause} className="w-10 h-10 hover:scale-125 transform duration-100 ease-out"/>)}

        <FastForwardIcon className="w-5 h-5 hover:scale-125 transform duration-100 ease-out"/>
        <ReplyIcon className="w-5 h-5 hover:scale-125 transform duration-100 ease-out"/>
      </div>
            <div className="flex items-center space-x-3 md:space-x-4 justify-end">
            <VolumeDownIcon className="w-5 h-5 "/>
            <input value={volume} 
            onChange={e=>setVolume(parseInt(e.target.value))}  className="w-14 md:w-28" type="range" min={0} max={100}/>
            <VolumeUpIcon className="w-5 h-5 "/>
            </div>
      <audio 
      ref={ref} 
      src={song?.songData?.url} />
    </div>
  );
};

export default Player;
