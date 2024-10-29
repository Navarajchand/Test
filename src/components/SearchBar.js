import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setPlaylist }) {
   const [query, setQuery] = useState('');

   const search = async () => {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`;

      try {
         const response = await axios.get(url);
         const songs = response.data.items.map(item => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
         }));
         setPlaylist(songs);
      } catch (error) {
         console.error('Error fetching songs:', error);
      }
   };

   return (
      <div>
         <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a song"
         />
         <button onClick={search}>Search</button>
      </div>
   );
}

export default SearchBar;
