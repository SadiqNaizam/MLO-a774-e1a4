import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music2, MoreHorizontal } from 'lucide-react'; // Icons

interface SongListItemProps {
  songTitle: string;
  artistName: string;
  albumArtUrl?: string;
  duration?: string; // e.g., "3:45"
  isPlaying?: boolean;
  onPlayClick: () => void;
  onMoreClick?: () => void; // For context menu or other actions
  // Doraemon theme: props for custom hover effects, playing indicator style
}

const SongListItem: React.FC<SongListItemProps> = ({
  songTitle,
  artistName,
  albumArtUrl,
  duration,
  isPlaying = false,
  onPlayClick,
  onMoreClick,
}) => {
  console.log("Rendering SongListItem:", songTitle, "- Playing:", isPlaying);

  // Doraemon theme: Styles for text, icons, hover states, playing indicator
  const playingIndicatorColor = isPlaying ? 'text-blue-500' : 'text-gray-700';

  return (
    <div className="flex items-center p-2 hover:bg-gray-100 rounded-md w-full transition-colors">
      {albumArtUrl ? (
        <img
          src={albumArtUrl}
          alt={songTitle}
          className="w-10 h-10 rounded object-cover mr-3"
          onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails
        />
      ) : (
        <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center mr-3">
          <Music2 className="w-5 h-5 text-gray-400" />
        </div>
      )}
      <div className="flex-grow">
        <p className={`text-sm font-medium ${playingIndicatorColor} line-clamp-1`}>{songTitle}</p>
        <p className="text-xs text-gray-500 line-clamp-1">{artistName}</p>
      </div>
      {duration && <span className="text-xs text-gray-500 mx-3 hidden sm:inline">{duration}</span>}
      <Button variant="ghost" size="icon" onClick={onPlayClick} className="mr-1">
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </Button>
      {onMoreClick && (
        <Button variant="ghost" size="icon" onClick={onMoreClick}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default SongListItem;