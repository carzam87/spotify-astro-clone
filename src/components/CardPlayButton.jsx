import {Play, Pause} from './Player'
import { usePlayerStore } from '@/stores/playerStore'
export function CardPlayButton({id}){

    const {isPlaying, setIsPlaying, currentMusic, setCurrentMusic} = usePlayerStore();
    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id

    const handleClick = async() => {
        if(isPlayingPlaylist){
            setIsPlaying(false)
            return
        }

        const res = await fetch(`/api/get-info-playlist.json?id=${id}`)
        const data = await res.json()
        console.log(data)
        const {songs, playlist} = data
        setIsPlaying(true)
        setCurrentMusic({
            songs,
            playlist,
            song: songs[0],
        })


        // .then(res => res.json())
        // .then(data => {
        //     const {songs, playlist} = data
        //     setIsPlaying(true)
        //     setCurrentMusic({
        //       songs,
        //         playlist,
        //         song: songs[0],
        //     })
        // })
    }



    return (
        <button onClick={handleClick} className="card-play-button rounded-full  bg-green-500 p-4">
            {
                isPlayingPlaylist ?
                <Pause/>
                :
                <Play/>
            }
                
        </button>
    )
}