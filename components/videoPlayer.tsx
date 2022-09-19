import { Exercise } from '@prisma/client';
import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const Player = ({
    currentExercise, setArray
}: {
    currentExercise: Exercise,
    setArray: { reps: string, weight: string }[]
}) => {
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <div className='flex'>
            <div>
                <YouTube videoId={currentExercise.videoUrl} opts={opts} onReady={onPlayerReady} />
            </div>
            <div className='mx-10'>
                <p className='text-2xl font-black'>{currentExercise.name}</p>
                <p className='my-3'>{setArray.length} Sets X {setArray[0].reps} Reps</p>
                <p>{currentExercise.description}</p>
            </div>
        </div>
    );
}
export default Player