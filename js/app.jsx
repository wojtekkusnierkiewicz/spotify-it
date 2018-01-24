import Spotify from 'spotify-web-api-js';
import React from 'react';
import ReactDOM from 'react-dom';
import SingleArtist from './components/artist.jsx';

require('../style/main.scss');
const token = 'BQBtq9mQoZMWOP8dX7HX9BgXXkkPnmhmShA9aYEaQn0zUetZ-ed8nY-821UF_dpSKXFbxQGTJmUY5_R1GWM3vf2ecnKmCiy8wX9oCWa8F8zGfnvgCKZMg7YhxZGNSuDOhbb3bmlY9vB5m38LzKfiB7wD2w';
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
      data: [],
      text: ''
    };
  }

  getData = () => {
    let ARTIST_URL = BASE_URL + 'q=' + this.state.text + '&type=artist';
    fetch(ARTIST_URL, options).then(response => {
      if (response && response.ok) {
        return response.json();
      } else {
        console.log('err');
      }
    }).then(data => {
      console.log(data.artists.items);
      this.setState({isData: true, data: data.artists.items})
    })
  }

  request = (event) => {
    event.preventDefault();
    this.getData();
  }

  textChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  }

  render() {
    let artists = this.state.data;
    return (
      <div>
        <form>
          <input type='text' id='searchInput' placeholder='just type and search' value={this.state.text} onChange={this.textChange}/>
          <button onClick={this.request}>Search</button>
        </form>
        <div>
          {
            artists.map((value, index) => {
              return(
                <SingleArtist data={value.images[0]}
                              key={value.id}
                              index={value.index}/>
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
