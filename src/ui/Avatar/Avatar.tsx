import React from "react"
import "./Avatar.css"

interface AvatarProps {
  src: string;
}
const Avatar: React.FC<AvatarProps> =({ src }) => {
  return (
    <div className="profile">
      <img alt="profile" src={src}/>
    </div>
  )
}

export default Avatar
