import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/times';
import { useRecoilState } from 'recoil';
import { currentTrackIdState,currentTrackNameState, isPlayingState } from '../atoms/songAtom';

const Song = ({order,track}:any) => {
    const spotifyApi = useSpotify()
    const [currentTrackId,setCurrentTrackId]= useRecoilState(currentTrackIdState)
    const [currentTrackName,setCurrentTrackName]= useRecoilState(currentTrackNameState)
    const [isPlaying,setIsPlaying]= useRecoilState(isPlayingState)
    const playSong = () => {
        setCurrentTrackId(track.track.id)
        setCurrentTrackName(track.track.name)
        setIsPlaying(true)
    }
    return (
    <div 
    onClick={playSong}
    className='grid grid-cols-2 rounded-lg hover:bg-gray-900'>
        <div className='flex items-center space-x-4'>
            <p className='w-9 text-center'>{order+1}</p>
            <img className='h-10 w-10' src={track.track.album.images[0].url} alt="" />
            <div>
                <p className='w-36 lg:w-64 truncate'>{track.track.name}</p>
                <p className='w-40 truncate'>{track.track.artists[0].name}</p>
            </div>
        </div>
        <div className='flex items-center justify-between
         ml-auto md:ml-0 pr-2'>
            <p className=' hidden md:inline'>{track.track.album.name}</p>
            <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
        </div>
    </div>
  )
}

export default Song