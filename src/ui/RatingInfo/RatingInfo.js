import { jsx as _jsx } from "react/jsx-runtime";
import './RatingInfo.css';
export const RatingInfo = ({ rating, size }) => {
    const getGrade = () => {
        if (rating > 8.5)
            return 'Excellent';
        if (rating > 7)
            return 'Good';
        if (rating >= 5)
            return 'Poor';
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
    return (_jsx("div", { className: `${badgeClass} rating`, style: { backgroundColor: getBackgroundColor() }, children: rating.toFixed(1) }));
};
export default RatingInfo;
