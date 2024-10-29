import React from 'react';

function SongList({ playlist, setCurrentSong }) {
   return (
      <div className="song-list">
         {playlist.map((song, index) => (
            <div key={index} onClick={() => setCurrentSong(song)}>
               {song.title}
            </div>
         ))}
      </div>
   );
}

export default SongList;
