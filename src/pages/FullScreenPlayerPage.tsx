import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle'; // Using individual Toggles
import {
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Minimize2, Heart, ListPlus, Shuffle, Repeat, X, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FullScreenPlayerPage = () => {
  console.log('FullScreenPlayerPage loaded');
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(30); // Percentage

  const song = {
    title: "Doraemon's Pocket Symphony",
    artist: "The Gadgeteers",
    albumArtUrl: "https://placehold.co/600x600/007bff/ffffff?text=Pocket+Symphony",
    duration: 245, // seconds
  };

  const formatTime = (seconds: number = 0): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const currentTime = (song.duration * progress) / 100;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white p-4 md:p-8">
      {/* Header Controls */}
      <div className="flex justify-between items-center mb-4 md:mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-white/10">
          <ChevronDown className="h-7 w-7" />
        </Button>
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider">Playing from Album</p>
          <p className="font-semibold text-sm">{song.title.substring(0,25)}...</p>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-white/10">
          <ListPlus className="h-6 w-6" />
        </Button>
      </div>

      {/* Album Art */}
      <div className="flex-grow flex items-center justify-center my-4 md:my-8">
        <img
          src={song.albumArtUrl}
          alt={`${song.title} - ${song.artist}`}
          className="w-full max-w-md aspect-square rounded-lg shadow-2xl object-cover"
        />
      </div>

      {/* Song Info */}
      <div className="mb-4 md:mb-6 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold">{song.title}</h2>
        <p className="text-lg md:text-xl text-blue-200">{song.artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-3 md:mb-4">
        <Slider
          value={[progress]}
          max={100}
          step={1}
          onValueChange={(value) => setProgress(value[0])}
          className="[&>span:first-child]:h-2 [&>span:first-child>span]:bg-yellow-400 [&>span:first-child]:bg-white/30"
        />
        <div className="flex justify-between text-xs text-blue-100 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(song.duration)}</span>
        </div>
      </div>

      {/* Main Playback Controls */}
      <div className="flex justify-around items-center mb-4 md:mb-6">
        <Toggle pressed={isShuffle} onPressedChange={setIsShuffle} aria-label="Toggle shuffle">
          <Shuffle className={`h-6 w-6 ${isShuffle ? 'text-yellow-400' : 'text-blue-200 hover:text-white'}`} />
        </Toggle>
        <Button variant="ghost" size="icon" className="hover:bg-white/10 w-12 h-12">
          <SkipBack className="h-8 w-8 text-white" />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white text-blue-600 hover:bg-gray-200 w-16 h-16 rounded-full shadow-lg"
        >
          {isPlaying ? <Pause className="h-9 w-9" /> : <Play className="h-9 w-9" />}
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-white/10 w-12 h-12">
          <SkipForward className="h-8 w-8 text-white" />
        </Button>
        <Toggle pressed={isRepeat} onPressedChange={setIsRepeat} aria-label="Toggle repeat">
          <Repeat className={`h-6 w-6 ${isRepeat ? 'text-yellow-400' : 'text-blue-200 hover:text-white'}`} />
        </Toggle>
      </div>
      
      {/* Bottom Controls (Like, Volume, etc.) */}
      <div className="flex justify-between items-center text-blue-200">
         <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)} className="hover:bg-white/10">
          <Heart className={`h-6 w-6 ${isLiked ? 'text-red-500 fill-red-500' : 'hover:text-white'}`} />
        </Button>
        <div className="flex items-center space-x-2 w-1/3 max-w-xs">
            {volume === 0 ? <VolumeX className="h-5 w-5"/> : <Volume2 className="h-5 w-5"/>}
            <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
                className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-white [&>span:first-child]:bg-white/30"
            />
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-white/10">
          <Minimize2 className="h-5 w-5" /> {/* Placeholder, could be for lyrics or queue */}
        </Button>
      </div>
    </div>
  );
};

export default FullScreenPlayerPage;