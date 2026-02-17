export function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <span aria-label={`Rating: ${rating} out of 5`} className="inline-flex text-amber-500">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden="true">
          {index < fullStars ? '★' : '☆'}
        </span>
      ))}
    </span>
  );
}
