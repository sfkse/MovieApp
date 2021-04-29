import React from 'react';

import SearchBar from './SearchBar';
import MovieList from './MovieList';
import axios from 'axios'

class App extends React.Component {

  state = {
    movies: [],

    searchQuery: ''
  }


  //harici kaynaklardan gelen verileri didMountla yapmak uygun

  //fetch versiyonu
  // async componentDidMount() {
  //   const baseURL = 'http://localhost:3000/movies';
  //   const response = await fetch(baseURL);
  //   //gelen veriyi jsona çevirmemiz gerek
  //   const data = await response.json();
  //   this.setState({ movies: data })
  // }

  // axios versiyonu

  async componentDidMount() {
    const response = await axios.get('http://localhost:3000/movies');
    // console.log(response)
    this.setState({ movies: response.data })
  }




  //Fetch api metodu
  // deleteMovie = async (movie) => {

  //   const baseURL = `http://localhost:3000/movies/${movie.id}`;
  //   await fetch(baseURL, {
  //     method: "DELETE"
  //   });
  //   const newMovieList = this.state.movies.filter(m => m.id !== movie.id);

  //   this.setState({
  //     movies: newMovieList
  //   })

  // }

  //axios versiyonu
  deleteMovie = async (movie) => {

    const baseURL = `http://localhost:3000/movies/${movie.id}`;
    await axios.delete(baseURL);
    const newMovieList = this.state.movies.filter(m => m.id !== movie.id);

    this.setState({
      movies: newMovieList
    })

  }




  //**search için propla fonksiyonu yolluyoruz. component her onChange çalıştırdığında buradaki searchMovie çalışıyor.searchQuery güncelleniyor her render metodu çalıştığında filtrelenmiş filmler propla gönderiliyor*/

  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value })
  }
  render() {

    let filteredMovies = this.state.movies.filter((movie) => {
      return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
    })
    return (


      <div className='container'>
        <div className="row">
          <div className="col-lg-12">

            <SearchBar searchMovieProp={this.searchMovie} />
          </div>
          <MovieList movies={filteredMovies}
            deleteMovieProp={this.deleteMovie}
          />
        </div>
      </div>

    )
  }

}

export default App;
