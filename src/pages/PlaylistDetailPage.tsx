import React from 'react';
import { Button } from '@/components/ui/button';
import SongListItem from '@/components/SongListItem';
import InteractiveMusicPlayerBar from '@/components/InteractiveMusicPlayerBar';
import NavigationMenu from '@/components/layout/NavigationMenu'; // Added for consistency if needed, or remove if not part of this page's design
import { Play, Shuffle, Edit3, Share2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


// Placeholder data
const playlistDetails = {
  id: 'pl1',
  name: 'Doraemon\'s Secret Gadget Grooves',
  description: 'The ultimate collection of songs inspired by Doraemon\'s amazing gadgets! Perfect for any adventure.',
  creator: 'Doraemon',
  coverArtUrl: 'https://placehold.co/400x400/007bff/ffffff?text=Gadget+Grooves+Playlist',
  songs: [
    { id: 's1', title: 'Anywhere Door Warp', artist: 'Teleportones', albumArtUrl: 'https://placehold.co/100x100/17a2b8/ffffff?text=ADW', duration: '3:05' },
    { id: 's2', title: 'Time Kerchief Twist', artist: 'Chronos Crew', albumArtUrl: 'https://placehold.co/100x100/ffc107/000000?text=TKT', duration: '2:40' },
    { id: 's3', title: 'Small Light Anthem', artist: 'Mini Beats', albumArtUrl: 'https://placehold.co/100x100/28a745/ffffff?text=SLA', duration: '4:15' },
    { id: 's4', title: 'Big Light Boogie', artist: 'Giant Steps', albumArtUrl: 'https://placehold.co/100x100/dc3545/ffffff?text=BLB', duration: '3:30' },
  ]
};

const PlaylistDetailPage = () => {
  console.log('PlaylistDetailPage loaded');
  const navigate = useNavigate();
  const [currentSong, setCurrentSong] = React.useState<string | null>(null);
  const [isPlayingPlaylist, setIsPlayingPlaylist] = React.useState<boolean>(false);

  const handlePlaySong = (songId: string) => {
    setCurrentSong(songId);
    setIsPlayingPlaylist(true);
    // Add actual play logic for individual song
  };

  const handlePlayAll = () => {
    if (playlistDetails.songs.length > 0) {
      setCurrentSong(playlistDetails.songs[0].id);
      setIsPlayingPlaylist(true);
      // Add logic to play entire playlist
    }
  };

  const currentlyPlayingSong = playlistDetails.songs.find(s => s.id === currentSong);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-indigo-100">
      <main className="pb-32 md:pb-16"> {/* Padding for player and nav */}
        {/* Header Section */}
        <div className="relative h-64 md:h-80">
          <img
            src={playlistDetails.coverArtUrl}
            alt={playlistDetails.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
            <Button variant="ghost" size="icon" className="absolute top-4 left-4 text-white hover:bg-white/20" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{playlistDetails.name}</h1>
            <p className="text-sm text-gray-200 mb-1">By {playlistDetails.creator}</p>
            <p className="text-xs text-gray-300 line-clamp-2 mb-3">{playlistDetails.description}</p>
            <div className="flex space-x-2">
              <Button onClick={handlePlayAll} className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold">
                <Play className="mr-2 h-5 w-5" /> Play All
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                <Shuffle className="mr-2 h-5 w-5" /> Shuffle
              </Button>
            </div>
          </div>
        </div>

        {/* Song List */}
        <div className="p-4">
          <div className="flex justify-end space-x-2 mb-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
                <Edit3 className="h-5 w-5"/>
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
                <Share2 className="h-5 w-5"/>
            </Button>
          </div>
          <div className="space-y-1">
            {playlistDetails.songs.map((song, index) => (
              <SongListItem
                key={song.id}
                songTitle={`${index + 1}. ${song.title}`}
                artistName={song.artist}
                albumArtUrl={song.albumArtUrl}
                duration={song.duration}
                isPlaying={currentSong === song.id && isPlayingPlaylist}
                onPlayClick={() => handlePlaySong(song.id)}
              />
            ))}
          </div>
        </div>
      </main>

      <InteractiveMusicPlayerBar
        songTitle={isPlayingPlaylist && currentlyPlayingSong ? currentlyPlayingSong.title : playlistDetails.name}
        artistName={isPlayingPlaylist && currentlyPlayingSong ? currentlyPlayingSong.artist : playlistDetails.creator}
        albumArtUrl={isPlayingPlaylist && currentlyPlayingSong ? currentlyPlayingSong.albumArtUrl : playlistDetails.coverArtUrl}
        isPlaying={isPlayingPlaylist}
        progress={isPlayingPlaylist ? 30 : 0} // Example progress
        onPlayPauseClick={() => setIsPlayingPlaylist(!isPlayingPlaylist)}
        onBarClick={() => navigate('/player')}
      />
      {/* Assuming NavigationMenu is desired on this page too. Remove if not. */}
      <NavigationMenu />
    </div>
  );
};

export default PlaylistDetailPage;