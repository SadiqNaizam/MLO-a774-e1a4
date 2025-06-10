import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface MediaGridCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  // Doraemon theme: consider props for special badges or accents
  // accentColor?: string;
}

const MediaGridCard: React.FC<MediaGridCardProps> = ({
  imageUrl,
  title,
  subtitle,
  onClick,
}) => {
  console.log("Rendering MediaGridCard:", title);

  // Doraemon theme: Card background, border, shadow, text colors
  return (
    <Card
      className={`w-full overflow-hidden transition-shadow hover:shadow-lg ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <img
            src={imageUrl || '/placeholder.svg'} // Use a generic placeholder
            alt={title}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle className="text-sm font-semibold line-clamp-1">{title}</CardTitle>
        {subtitle && (
          <CardDescription className="text-xs text-gray-500 line-clamp-1 mt-1">
            {subtitle}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaGridCard;