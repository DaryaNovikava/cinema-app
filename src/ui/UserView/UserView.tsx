import { FC } from 'react';
import './UserView.css';

interface UserViewProps {
  userName: string | undefined;
  userSurname: string | undefined;
}

export const UserView: FC<UserViewProps> = ({ userName, userSurname }) => {
  if (userName && userSurname) {
    return (
      <div className="user-view">
        <div className="user-view__logo">
          {`${userName.slice(0, 1).toUpperCase()}${userSurname.slice(0, 1).toUpperCase()}`}
        </div>
      </div>
    );
  }
};
