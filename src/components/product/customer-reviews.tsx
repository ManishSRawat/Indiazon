
import type { Review } from '@/lib/types';
import RatingStars from '@/components/common/rating-stars';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CustomerReviewsProps {
  reviews?: Review[];
  productName: string;
}

const CustomerReviews = ({ reviews, productName }: CustomerReviewsProps) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 font-headline">Customer Reviews</h3>
        <p className="text-muted-foreground">No reviews yet for {productName}. Be the first to write one!</p>
      </div>
    );
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Customer Reviews for {productName}</CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <RatingStars rating={averageRating} />
          <span className="text-muted-foreground">({averageRating.toFixed(1)} average rating based on {reviews.length} reviews)</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={review.id}>
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={`https://placehold.co/40x40.png?text=${review.author.charAt(0)}`} alt={review.author} data-ai-hint="avatar user"/>
                  <AvatarFallback>{review.author.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold font-headline">{review.author}</h4>
                    <RatingStars rating={review.rating} starSize={14} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{new Date(review.date).toLocaleDateString()}</p>
                  <p className="text-sm">{review.comment}</p>
                </div>
              </div>
              {index < reviews.length - 1 && <Separator className="my-6" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerReviews;
