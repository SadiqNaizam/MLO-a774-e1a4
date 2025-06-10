import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Maximize2, Volume2, Heart } from 'lucide-react'; // Example icons

interface InteractiveMusicPlayerBarProps {
  songTitle?: string;
  artistName?: string;
  albumArtUrl?: string;
  isPlaying?: boolean;
  progress?: number; // 0-100
  duration?: number; // total seconds
  currentTime?: number; // current seconds
  onPlayPauseClick?: () => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  onSeek?: (value: number[]) => void; // Slider gives array e.g. [50]
  onBarClick?: () => void; // To open full screen player
  // Doraemon theme: props for specific styles, animations
}

const formatTime = (seconds: number = 0): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const InteractiveMusicPlayerBar: React.FC<InteractiveMusicPlayerBarProps> = ({
  songTitle = "No song playing",
  artistName,
  albumArtUrl,
  isPlaying = false,
  progress = 0,
  duration = 0,
  currentTime = 0,
  onPlayPauseClick,
  onNextClick,
  onPrevClick,
  onSeek,
  onBarClick,
}) => {
  console.log("Rendering InteractiveMusicPlayerBar:", songTitle, "- Playing:", isPlaying, "Progress:", progress);

  // Doraemon theme: Bar background, text colors, slider theme, button styles
  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 shadow-lg z-40 flex items-center space-x-2 md:bottom-0"> {/* Adjust bottom for NavigationMenu */}
      {/* Song Info & Album Art */}
      <div
        className={`flex items-center flex-shrink-0 ${onBarClick ? 'cursor-pointer' : ''} w-1/4 md:w-1/5 lg:w-1/6`}
        onClick={onBarClick}
      >
        {albumArtUrl ? (
          <img src={albumArtUrl} alt={songTitle} className="w-10 h-10 rounded object-cover mr-2" />
        ) : (
          <div className="w-10 h-10 rounded bg-gray-200 mr-2 flex-shrink-0"></div>
        )}
        <div className="overflow-hidden hidden md:block">
          <p className="text-xs font-medium truncate">{songTitle}</p>
          {artistName && <p className="text-xs text-gray-500 truncate">{artistName}</p>}
        </div>
      </div>

      {/* Playback Controls & Progress Bar (Centered) */}
      <div className="flex flex-col items-center flex-grow mx-2 w-1/2 md:w-3/5 lg:w-2/3">
        <div className="flex items-center space-x-1 md:space-x-2 mb-1">
          <Button variant="ghost" size="icon" onClick={onPrevClick} disabled={!onPrevClick}>
            <SkipBack className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onPlayPauseClick} disabled={!onPlayPauseClick} className="w-8 h-8 md:w-10 md:h-10">
            {isPlaying ? <Pause className="h-5 w-5 md:h-6 md:w-6" /> : <Play className="h-5 w-5 md:h-6 md:w-6" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNextClick} disabled={!onNextClick}>
            <SkipForward className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
        <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-gray-500 w-8 text-right">{formatTime(currentTime)}</span>
            <Slider
                defaultValue={[0]}
                value={[progress]}
                max={100}
                step={1}
                onValueChange={onSeek} // Use onValueChange for immediate feedback while sliding
                // onValueCommit={onSeek} // Use onValueCommit if you only want update on release
                className="flex-grow"
                disabled={!onSeek}
            />
            <span className="text-xs text-gray-500 w-8 text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Other controls (e.g., Volume, Like, Maximize) - Right aligned */}
      <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0 w-1/4 md:w-1/5 lg:w-1/6 justify-end">
        {/* Placeholder for volume, like, etc. */}
        {/* <Button variant="ghost" size="icon"><Volume2 className="h-4 w-4" /></Button> */}
        {/* <Button variant="ghost" size="icon"><Heart className="h-4 w-4" /></Button> */}
        {onBarClick && (
           <Button variant="ghost" size="icon" onClick={onBarClick} className="hidden md:inline-flex">
             <Maximize2 className="h-4 w-4" />
           </Button>
        )}
      </div>
    </div>
  );
};

export default InteractiveMusicPlayerBar;