import './RatingInfo.css';

interface RatingInfoProps {
  rating: number;
  size: 'Large' | 'Small';
}

export const RatingInfo: React.FC<RatingInfoProps> = ({ rating, size }) => {
  const getGrade = (): 'Excellent' | 'Good' | 'Poor' | 'Bullshit' => {
    if (rating > 8.5) return 'Excellent';
    if (rating > 7) return 'Good';
    if (rating >= 5) return 'Poor';
    return 'Bullshit';
  };

  const grade = getGrade();

  const getBackgroundColor = () => {
    switch (grade) {
      case 'Excellent':
        return '#A59400';
      case 'Good':
        return '#308E21';
      case 'Poor':
        return '#777';
      case 'Bullshit':
        return '#C82020';
      default:
        return '#777';
    }
  };

  const badgeClass = `rating-badge ${size.toLowerCase()}`;

  return (
    <div
      className={`${badgeClass} rating`}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {rating.toFixed(1)}
    </div>
  );
};

export default RatingInfo;
