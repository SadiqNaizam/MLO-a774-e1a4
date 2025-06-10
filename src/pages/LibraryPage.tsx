import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SongListItem from '@/components/SongListItem';
import MediaGridCard from '@/components/MediaGridCard';
import InteractiveMusicPlayerBar from '@/components/InteractiveMusicPlayerBar';
import { PlusCircle, ListMusic, Heart, DiscAlbum, Users } from 'lucide-react';

// Placeholder data
const myPlaylists = [
  { id: 'pl1', title: 'Doraemon\'s Secret Gadget Grooves', subtitle: '15 songs', imageUrl: 'https://placehold.co/300x300/007bff/ffffff?text=Gadget+Grooves' },
  { id: 'pl2', title: 'Nobita\'s Naptime Tunes', subtitle: '10 songs', imageUrl: 'https://placehold.co/300x300/28a745/ffffff?text=Naptime+Hits' },
];
const likedSongs = [
  { id: 'lk1', title: 'Take-copter Flight', artist: 'The Props', albumArtUrl: 'https://placehold.co/100x100/ffc107/000000?text=Takecopter', duration: '3:45' },
  { id: 'lk2', title: 'Dorayaki Dreams', artist: 'Sweet Beans', albumArtUrl: 'https://placehold.co/100x100/dc3545/ffffff?text=Dorayaki', duration: '2:50' },
];
const followedArtists = [
    { id: 'fa1', name: 'Doraemon', type: 'Robot Cat', imageUrl: 'https://placehold.co/300x300/007bff/ffffff?text=Doraemon' },
];
const savedAlbums = [
    { id: 'sa1', title: '22nd Century Hits', artist: 'Robo-Band', imageUrl: 'https://placehold.co/300x300/17a2b8/ffffff?text=22nd+Hits' },
];


const LibraryPage = () => {
  console.log('LibraryPage loaded');
  const [currentSong, setCurrentSong] = React.useState<string | null>(null);

  const handlePlaySong = (songId: string) => {
    setCurrentSong(songId);
    // Add actual play logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-32 md:pb-16 pt-4 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">My Dora-Library</h1>
          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600">
            <PlusCircle className="mr-2 h-5 w-5" /> Create Playlist
          </Button>
        </div>

        <Tabs defaultValue="playlists" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 bg-blue-100 rounded-lg">
            <TabsTrigger value="playlists" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><ListMusic className="mr-1 h-4 w-4 inline-block"/>Playlists</TabsTrigger>
            <TabsTrigger value="songs" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><Heart className="mr-1 h-4 w-4 inline-block"/>Liked Songs</TabsTrigger>
            <TabsTrigger value="albums" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><DiscAlbum className="mr-1 h-4 w-4 inline-block"/>Albums</TabsTrigger>
            <TabsTrigger value="artists" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><Users className="mr-1 h-4 w-4 inline-block"/>Artists</TabsTrigger>
          </TabsList>

          <TabsContent value="playlists">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {myPlaylists.map(playlist => (
                <MediaGridCard key={playlist.id} title={playlist.title} subtitle={playlist.subtitle} imageUrl={playlist.imageUrl} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="songs">
            <div className="space-y-2">
              {likedSongs.map(song => (
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
                {savedAlbums.map(album => (
                  <MediaGridCard key={album.id} title={album.title} subtitle={album.artist} imageUrl={album.imageUrl} />
                ))}
              </div>
          </TabsContent>
          <TabsContent value="artists">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {followedArtists.map(artist => (
                <MediaGridCard key={artist.id} title={artist.name} subtitle={artist.type} imageUrl={artist.imageUrl} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <InteractiveMusicPlayerBar
        songTitle={currentSong ? likedSongs.find(s => s.id === currentSong)?.title : "My Library Mix"}
        artistName={currentSong ? likedSongs.find(s => s.id === currentSong)?.artist : "DJ Nobita"}
        albumArtUrl={currentSong ? likedSongs.find(s => s.id === currentSong)?.albumArtUrl : 'https://placehold.co/100x100/28a745/ffffff?text=LIB'}
        isPlaying={!!currentSong}
        onPlayPauseClick={() => currentSong && handlePlaySong(currentSong)}
      />
      <NavigationMenu />
    </div>
  );
};

export default LibraryPage;