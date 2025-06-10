import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Input } from '@/components/ui/input';
import Carousel from '@/components/Carousel';
import MediaGridCard from '@/components/MediaGridCard';
import SongListItem from '@/components/SongListItem';
import InteractiveMusicPlayerBar from '@/components/InteractiveMusicPlayerBar';
import { Search } from 'lucide-react';

// Placeholder data for HomePage
const newReleases = [
  { id: 'nr1', title: 'Doraemon\'s Hit Mix', artist: 'Various Artists', imageUrl: 'https://placehold.co/300x300/007bff/ffffff?text=Doraemon+Mix' },
  { id: 'nr2', title: 'Future Tunes', artist: 'Gadget Grooves', imageUrl: 'https://placehold.co/300x300/17a2b8/ffffff?text=Future+Tunes' },
  { id: 'nr3', title: 'Anywhere Door Beats', artist: 'Nobita & The Gang', imageUrl: 'https://placehold.co/300x300/28a745/ffffff?text=Anywhere+Door' },
];

const featuredPlaylists = [
  { id: 'fp1', title: 'Time Travel Anthems', subtitle: 'Music for every era', imageUrl: 'https://placehold.co/300x300/ffc107/000000?text=Time+Travel' },
  { id: 'fp2', title: 'Pocket Full of Jams', subtitle: 'Your favorite gadgets, in song!', imageUrl: 'https://placehold.co/300x300/dc3545/ffffff?text=Pocket+Jams' },
];

const recentlyPlayed = [
  { id: 'rp1', title: 'Doraemon no Uta', artist: 'Kumiko Osugi', albumArtUrl: 'https://placehold.co/100x100/6f42c1/ffffff?text=Doraemon+Song', duration: '3:15' },
  { id: 'rp2', title: 'Yume o Kanaete Doraemon', artist: 'MAO', albumArtUrl: 'https://placehold.co/100x100/fd7e14/ffffff?text=Yume+Kanaete', duration: '4:05' },
];

const HomePage = () => {
  console.log('HomePage loaded');
  const [currentSong, setCurrentSong] = React.useState<string | null>(null);

  const handlePlaySong = (songId: string) => {
    setCurrentSong(songId);
    console.log('Playing song:', songId);
    // Add actual play logic here
  };

  const carouselSlides = newReleases.map(item => (
    <MediaGridCard
      key={item.id}
      title={item.title}
      subtitle={item.artist}
      imageUrl={item.imageUrl}
      onClick={() => console.log('Navigate to album/playlist:', item.title)}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100">
      {/* Main content area with padding for fixed bars */}
      <main className="pb-32 md:pb-16 pt-4 px-4">
        {/* Search Bar - Doraemon style! */}
        <div className="relative mb-6">
          <Input
            type="search"
            placeholder="Search for songs, gadgets, or friends..."
            className="pl-10 pr-4 py-3 text-base rounded-full border-2 border-blue-400 focus:border-yellow-400 focus:ring-yellow-400 bg-white shadow-md"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* New Releases Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">New Releases</h2>
          <Carousel slides={carouselSlides} containerClassName="rounded-lg overflow-hidden" />
        </section>

        {/* Featured Playlists Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">Featured Playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featuredPlaylists.map(playlist => (
              <MediaGridCard
                key={playlist.id}
                title={playlist.title}
                subtitle={playlist.subtitle}
                imageUrl={playlist.imageUrl}
                onClick={() => console.log('Navigate to playlist:', playlist.title)}
              />
            ))}
          </div>
        </section>

        {/* Recently Played Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">Recently Played</h2>
          <div className="space-y-2">
            {recentlyPlayed.map(song => (
              <SongListItem
                key={song.id}
                songTitle={song.title}
                artistName={song.artist}
                albumArtUrl={song.albumArtUrl}
                duration={song.duration}
                isPlaying={currentSong === song.id}
                onPlayClick={() => handlePlaySong(song.id)}
                onMoreClick={() => console.log('More options for:', song.title)}
              />
            ))}
          </div>
        </section>
      </main>

      <InteractiveMusicPlayerBar
        songTitle={currentSong ? recentlyPlayed.find(s => s.id === currentSong)?.title : "Doraemon Radio"}
        artistName={currentSong ? recentlyPlayed.find(s => s.id === currentSong)?.artist : "Future FM"}
        albumArtUrl={currentSong ? recentlyPlayed.find(s => s.id === currentSong)?.albumArtUrl : 'https://placehold.co/100x100/007bff/ffffff?text=DR'}
        isPlaying={!!currentSong}
        onPlayPauseClick={() => currentSong ? handlePlaySong(currentSong) : console.log("Play default")} // Toggle play/pause
        onNextClick={() => console.log('Next song')}
        onPrevClick={() => console.log('Previous song')}
        onSeek={(value) => console.log('Seek to', value)}
        onBarClick={() => console.log('Open full screen player')}
      />
      <NavigationMenu />
    </div>
  );
};

export default HomePage;