import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";

import query from "../queries/fetchSongs";

class SongList extends Component {
    renderSongs() {
        return this.props.data.songs.map(song => {
            return (
                <li className="collection-item" key={song.id}>
                    {song.title}
                </li>
            );
        });
    }

    render() {
        if (this.props.data.loading) {
            return <div>Loading</div>;
        }
        return (
            <div>
                <ul className="collection">{this.renderSongs()}</ul>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large waves-effect waves-light right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

export default graphql(query)(SongList);
