import React, { Component } from 'react';

const TRACKS_URL = 'https://api.spotify.com/v1/albums/';

class SingleAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album:this.props.album,
      tracks:[],
      show: false
    };

  }
  getSingleAlbum = () => {
    let TRACKS = TRACKS_URL + this.state.album.id + '/tracks';
    fetch(TRACKS, this.props.options).then(response => {
      if (response && response.ok) {
        return response.json();
      } else {
        console.log('err');
      }
    }).then(data => {
      // console.log(data.items);
      // data.items.map(value=>{this.state.tracks.push(value.name)})
      this.setState({tracks: data.items})
    })
  }
  show =(e) => {
    e.preventDefault()
    this.setState({show:true})
    this.getSingleAlbum();
  }

  hide =(e) => {
    e.preventDefault()
    this.setState({show:false})
  }
  render() {
    console.log(this.state.album);
    console.log(this.state.tracks);
    return (
      <div>
        <h1>
          {this.state.album.name}
          <button onClick={this.show}>show</button>
          <button onClick={this.hide}>hide</button>
        </h1>
        {this.state.show ?
          <ul>
            {
              this.state.tracks.map(value => {
                return (
                  <li key={value.id}>{value.name} <a href={value.preview_url} target='_blank'><button>preview</button></a></li>
                )
              })
            }
          </ul> : null
        }
      </div>
    )
  }
}

export default SingleAlbum;
