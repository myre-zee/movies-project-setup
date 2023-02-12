import React, {Component} from "react";
import {getMovies} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import {paginate} from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from 'lodash';


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: {path: 'title', order: 'asc'}
    }; 

    componentDidMount() {
        const genres = [{_id: "", name: "All Genre"}, ...getGenres()];
        this.setState({movies: getMovies(), genres});
    }

    handlePageChange = page => {
        this.setState({currentPage: page});
    };


    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };
    handelGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1});
    };
    handleSort = sortColumn => {


        this.setState({sortColumn});
    };

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn} = this.state

        if (count === 0)
            return <p> THERE IS NO MOVIE IN DATABASE!!!!</p>

        const filtered = selectedGenre
            && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate( sorted, filtered, currentPage, pageSize);

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handelGenreSelect}
                    />
                </div>
                <div className="col">
                    <p>THERE ARE {filtered.length} MOVIES IN DATABASE</p>
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>


            </div>
        );

    }
}

export default Movies;