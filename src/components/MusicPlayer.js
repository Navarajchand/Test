import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';

function MusicPlayer({ videoId }) {
   const [isPlaying, setIsPlaying] = useState(false);
   const [progress, setProgress] = useState(0);
   const playerRef = useRef(null);

   const onPlayPauseClick = () => {
      if (isPlaying) {
         playerRef.current.internalPlayer.pauseVideo();
      } else {
         playerRef.current.internalPlayer.playVideo();
      }
      setIsPlaying(!isPlaying);
   };

   const onProgressUpdate = () => {
      playerRef.current.internalPlayer.getCurrentTime().then((currentTime) => {
         playerRef.current.internalPlayer.getDuration().then((duration) => {
            setProgress((currentTime / duration) * 100);
         });
      });
   };

   return (
      <div className="music-player">
         <YouTube
            videoId={videoId}
            ref={playerRef}
            onStateChange={onProgressUpdate}
            opts={{
               height: '0',
               width: '0',
               playerVars: { autoplay: 1 },
            }}
         />
         <div className="controls">
            <button onClick={onPlayPauseClick}>
               {isPlaying ? 'Pause' : 'Play'}
            </button>
            <div className="progress-bar">
               <div
                  className="progress"
                  style={{ width: `${progress}%` }}
               ></div>
            </div>
         </div>
      </div>
   );
}

export default MusicPlayer;
