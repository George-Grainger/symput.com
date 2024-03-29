import { useState, useContext } from 'react';
import { UserContext } from '@/lib/context';
import Image from 'next/image';
import UserControls from './UserControls';

export default function LoggedIn() {
  const { user, username } = useContext(UserContext);
  const [dropDownVisible, setDropDownVisible] = useState(false);

  return (
    <li
      className="link-standard flex p-1 md:mx-3"
      onBlur={(e) =>
        !e.currentTarget.matches(':focus-within') && setDropDownVisible(false)
      }
    >
      <button
        tabIndex="0"
        className="rounded-full user-icon h-10 w-10 focus:outline-none"
        onClick={() => setDropDownVisible(!dropDownVisible)}
      >
        <Image
          alt={`${username} avatar`}
          height="40px"
          width="40px"
          src={user?.photoURL || '/images/hacker.png'}
          className="rounded-full h-12 w-12"
        />
      </button>
      <UserControls username={username} visible={dropDownVisible} />
    </li>
  );
}
