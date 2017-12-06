import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { compose } from "recompose";

import query from "../queries/fetchSongs";

class SongList extends Component {
    onSongDelete = async id => {
        await this.props.mutate({ variables: { id } });
        this.props.data.refetch();
    };
    renderSongs() {
        return this.props.data.songs.map(({ id, title }) => {
            return (
                <li className="collection-item" key={id}>
                    <Link to={`songs/${id}`}>{title}</Link>
                    <i
                        className="material-icons"
                        onClick={() => this.onSongDelete(id)}
                    >
                        delete
                    </i>
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

const deleteSongMutation = gql`
    mutation DeleteSong($id: ID!) {
        deleteSong(id: $id) {
            id
        }
    }
`;

export default compose(graphql(query), graphql(deleteSongMutation))(SongList);
