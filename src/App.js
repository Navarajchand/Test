import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MusicPlayer from './components/MusicPlayer';
import SongList from './components/SongList';

function App() {
   const [playlist, setPlaylist] = useState([]);
   const [currentSong, setCurrentSong] = useState(null);

   return (
      <div className="App">
         <h1>Spotify-Like App</h1>
         <SearchBar setPlaylist={setPlaylist} />
         <SongList playlist={playlist} setCurrentSong={setCurrentSong} />
         {currentSong && <MusicPlayer videoId={currentSong.videoId} />}
      </div>
   );
}

export default App;
