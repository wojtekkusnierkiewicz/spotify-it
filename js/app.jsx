import Spotify from 'spotify-web-api-js';
import React from 'react';
import ReactDOM from 'react-dom';
import SingleArtist from './components/artist.jsx';
import SingleAlbum from './components/albums.jsx';

require('../style/main.scss');
const token = 'QWoasukhaoqLIasfasiojQASjlljahsuashfkasaawoijOJNFALOmlijliSFILjljAUIQMLfJIQMolfJLNQIFlkfjKJALJAFSNKSJLKJFAASFKLASJHFLAlkhKKknflkjiFNiojq9asfasfiqic3jasfw7';
const BASE_URL = 'https://api.spotify.com/v1/search?';
const options = {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  },
  mode: 'cors',
  cache: 'default'
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isData: false,
      artists: [],
      text: 'niemagotu',
      id:'',
      albums:[],
      tracks:[]
    };
  }

  getArtists = () => {
    let ARTIST_URL = BASE_URL + 'q=' + this.state.text + '&type=artist&limit=5 ';
    fetch(ARTIST_URL, options).then(response => {
      if (response && response.ok) {
        return response.json();
      } else {
        console.log('err');
      }
    }).then(data => {
      this.setState({isData: true, artists: data.artists.items})
      // this.state.artists.map(value=>{this.state.ids.push(value.id)})
      // // this.state.ids.map(value=>{this.getAlbums(value)});
    })
  }
  // getAlbums = (artist) => {
  //   let ALBUMS = ALBUMS_URL + artist + '/albums';
  //   fetch(ALBUMS, options).then(response => {
  //     if (response && response.ok) {
  //       return response.json();
  //     } else {
  //       console.log('err');
  //     }
  //   }).then(data => {
  //     data.items.map(value=>{this.state.albums.push(value.id)})
  //     this.state.albums.map(value=>{this.getTracks(value)});
  //   })
  // }
  //
  // getTracks = (album) => {
  //   let TRACKS = TRACKS_URL + album + '/tracks';
  //   fetch(TRACKS, options).then(response => {
  //     if (response && response.ok) {
  //       return response.json();
  //     } else {
  //       console.log('err');
  //     }
  //   }).then(data => {
  //     data.items.map(value=>{this.state.tracks.push(value.id)})
  //     // this.setState({true, tracks: data.artists.items})
  //   })
  // }

  request = (event) => {
    event.preventDefault();
    this.getArtists();
  }

  textChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  }


  render() {
    return (
      <div>
        <form>
          <input type='text' id='searchInput' placeholder='just type and search' value={this.state.text} onChange={this.textChange}/>
          <button onClick={this.request}>Search</button>
        </form>
        <div>
          {
            this.state.artists.map((value, index) => {
              return(
                <SingleArtist artist={value}
                              key={value.id}
                              index={value.index}
                              token={token}
                              options={options}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App/>, document.getElementById('app'));
});
