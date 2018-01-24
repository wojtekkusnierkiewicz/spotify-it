import React, {Component} from 'react';

const SingleArtist = (props) => {
  return (
    <div>
      <img src={(
        props.data !== undefined)
        ? props.data.url
        : 'https://www.w3schools.com/howto/img_fjords.jpg'}/>
    </div>
  )
}
export default SingleArtist;
