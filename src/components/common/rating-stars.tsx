
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  starSize?: number;
  className?: string;
}

const RatingStars = ({ rating, maxRating = 5, starSize = 16, className }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={`flex items-center ${className}`} aria-label={`Rating: ${rating} out of ${maxRating} stars`}>
      {Array(fullStars)
        .fill(null)
        .map((_, i) => (
          <Star key={`full-${i}`} fill="currentColor" className="text-yellow-400" style={{ width: starSize, height: starSize }} />
        ))}
      {halfStar && <StarHalf fill="currentColor" className="text-yellow-400" style={{ width: starSize, height: starSize }} />}
      {Array(emptyStars)
        .fill(null)
        .map((_, i) => (
          <Star key={`empty-${i}`} className="text-gray-300" style={{ width: starSize, height: starSize }} />
        ))}
    </div>
  );
};

export default RatingStars;
