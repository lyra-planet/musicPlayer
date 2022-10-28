import { useRecoilValue } from 'recoil';
import { playListAtomState } from '../atoms/playListAtom';
import Song from './Song';

const Songs = () => {
    const playList = useRecoilValue<any>(playListAtomState)
  return (
        <div className='text-white px-8 flex flex-col space-y-1 pb-28'>
            {
                playList?.tracks.items.map((track:any,index:any)=>(
                <Song key={track.track.id+index} track={track} order={index}/>))
            }
        </div>
  )
}

export default Songs