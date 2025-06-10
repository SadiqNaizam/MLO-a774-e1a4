import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SongListItem from '@/components/SongListItem';
import MediaGridCard from '@/components/MediaGridCard';
import InteractiveMusicPlayerBar from '@/components/InteractiveMusicPlayerBar';
import { Search as SearchIcon } from 'lucide-react';

// Placeholder data
const songs = [
  { id: 's1', title: 'Doraemon\'s Bell', artist: 'Giant', albumArtUrl: 'https://placehold.co/100x100/ffc107/000000?text=Bell', duration: '2:30' },
  { id: 's2', title: 'Shizuka\'s Serenade', artist: 'Shizuka Minamoto', albumArtUrl: 'https://placehold.co/100x100/e83e8c/ffffff?text=Serenade', duration: '3:10' },
];
const albums = [
  { id: 'a1', title: 'Nobita\'s Adventure Mix', artist: 'Nobita Nobi', imageUrl: 'https://placehold.co/300x300/6610f2/ffffff?text=Adventure' },
  { id: 'a2', title: 'Suneo\'s Smooth Jazz', artist: 'Suneo Honekawa', imageUrl: 'https://placehold.co/300x300/20c997/ffffff?text=Jazz' },
];
const artists = [
  { id: 'ar1', name: 'Doraemon', type: 'Robot Cat', imageUrl: 'https://placehold.co/300x300/007bff/ffffff?text=Doraemon' },
  { id: 'ar2', name: 'The Dorayakis', type: 'Band', imageUrl: 'https://placehold.co/300x300/fd7e14/ffffff?text=Dorayakis' },
];

const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSong, setCurrentSong] = React.useState<string | null>(null);

  const handlePlaySong = (songId: string) => {
    setCurrentSong(songId);
    // Add actual play logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-32 md:pb-16 pt-4 px-4">
        <div className="relative mb-6">
          <Input
            type="search"
            placeholder="Search for your favorite gadget songs..."
            className="pl-10 pr-4 py-3 text-base rounded-full border-2 border-blue-300 focus:border-yellow-400 focus:ring-yellow-400 bg-white shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {searchTerm ? (
          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 mb-4 bg-blue-100 rounded-lg">
              <TabsTrigger value="songs" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Songs</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Albums</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Artists</TabsTrigger>
              {/* <TabsTrigger value="playlists">Playlists</TabsTrigger> */}
            </TabsList>
            <TabsContent value="songs">
              <div className="space-y-2">
                {songs.map(song => (
                  <SongListItem
                    key={song.id}
                    songTitle={song.title}
                    artistName={song.artist}
                    albumArtUrl={song.albumArtUrl}
                    duration={song.duration}
                    isPlaying={currentSong === song.id}
                    onPlayClick={() => handlePlaySong(song.id)}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {albums.map(album => (
                  <MediaGridCard key={album.id} title={album.title} subtitle={album.artist} imageUrl={album.imageUrl} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="artists">
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {artists.map(artist => (
                  <MediaGridCard key={artist.id} title={artist.name} subtitle={artist.type} imageUrl={artist.imageUrl} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-10">
            <SearchIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">Find your favorite Doraemon tunes!</p>
            <p className="text-sm text-gray-400">Search for songs, artists, or albums.</p>
          </div>
        )}
      </main>

      <InteractiveMusicPlayerBar 
        songTitle={currentSong ? songs.find(s => s.id === currentSong)?.title : "Search Results FM"}
        artistName={currentSong ? songs.find(s => s.id === currentSong)?.artist : "Dora-Discovery"}
        albumArtUrl={currentSong ? songs.find(s => s.id === currentSong)?.albumArtUrl : 'https://placehold.co/100x100/17a2b8/ffffff?text=SRCH'}
        isPlaying={!!currentSong}
        onPlayPauseClick={() => currentSong && handlePlaySong(currentSong)}
      />
      <NavigationMenu />
    </div>
  );
};

export default SearchPage;