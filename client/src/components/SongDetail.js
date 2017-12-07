import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import fetchSong from "../queries/fetchSong";
import LyricCreate from "./LyricCreate";

class SongDetail extends Component {
    render() {
        const { song, loading } = this.props.data;
        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <div className="row">
                    <Link
                        to="/"
                        className="btn-floating btn-large waves-effect waves-light left"
                    >
                        <i className="material-icons">arrow_back</i>
                    </Link>
                </div>
                <h3>{song.title}</h3>
                <LyricCreate songId={this.props.match.params.id} />
            </div>
        );
    }
}

export default graphql(fetchSong, {
    options: props => {
        return { variables: { id: props.match.params.id } };
    }
})(SongDetail);
