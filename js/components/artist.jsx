import React, {Component} from 'react';
import SingleAlbum from './albums.jsx';

const ALBUMS_URL = 'https://api.spotify.com/v1/artists/';

class SingleArtist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist:this.props.artist,
      albums:[],
      show:false
    };
  }

  getAlbums = () => {
    let ALBUMS = ALBUMS_URL + this.state.artist.id + '/albums';
    fetch(ALBUMS, this.props.options).then(response => {
      if (response && response.ok) {
        return response.json();
      } else {
        console.log('err');
      }
    }).then(data => {
      this.setState({albums: data.items})
      this.state.albums.map(value=>{this.state.albums.push(value.id)})
    })
  }
  show =(e) => {
    e.preventDefault()
    this.setState({show:true})
    this.getAlbums();
  }

  hide =(e) => {
    e.preventDefault()
    this.setState({show:false})
  }

  render() {
    console.log(this.state.artist);
    return (
      <div>
        <h1>
          {this.state.artist.name}
          <button onClick={this.show}>show</button>
          <button onClick={this.hide}>hide</button>
        </h1>
          {this.state.show ?
            this.state.albums.map((value,index)=>{
              return (
                <SingleAlbum
                      album={value}
                      key={value.id}
                      options={this.props.options}
                     />
                   )
                 }) : null
          }

      </div>
    )
  }
}
export default SingleArtist;
