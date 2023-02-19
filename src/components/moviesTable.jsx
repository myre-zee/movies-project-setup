import React, {Component} from "react";

class MoviesTable extends Component{
    raiseSort = path => {
        const sortColumn = {...this.props.sortColumn};
        if (sortColumn.path === path)
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn);
    };
    render() {
        const {movies, onDelete} = this.props;
        return (
            <table className="table table-info table-striped">

                <thead>
                <tr className="table-dark">
                    <th onClick={()=> this.raiseSort('title')}>Title</th>
                    <th onClick={()=> this.raiseSort('genre.name')}>Genre</th>
                    <th onClick={()=> this.raiseSort('numberInStock')}>Stock</th>
                    <th onClick={()=> this.raiseSort('dailyRentalRate')}>Rate</th>
                    <th/>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {movies.map(movie => (
                    <tr key={movie._id}>
                        <td className="table-danger">{movie.title}</td>
                        <td className="table-primary">{movie.genre.name}</td>
                        <td className="table-light">{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>

                        <td>
                            <button onClick={() => onDelete(movie)}
                                    className="btn btn-danger btn-sm">Delete
                            </button>
                        </td>

                    </tr>

                ))}

                </tbody>
            </table>
        );
    }
}


export default MoviesTable;