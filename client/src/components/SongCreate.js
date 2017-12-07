import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import { compose } from "recompose";

import query from "../queries/fetchSongs";
import { submitSongCreate } from "../actions";

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = "A title is required";
    }
    return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
        <div className="input-field col s12">
            <input {...input} type={type} />
            <label htmlFor={input.name}>{label}</label>
        </div>
    );
};

class SongCreate extends Component {
    handleFormSubmit = async ({ title }) => {
        try {
            await this.props.mutate({
                variables: { title },
                refetchQueries: [{ query }]
            });
            this.props.history.push("/");
        } catch (e) {
            // component did catch ;)
            throw new Error(e);
        }
    };

    render() {
        const { handleSubmit } = this.props;
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
                <h3>Create a New Song</h3>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Field
                        name="title"
                        type="text"
                        component={renderField}
                        label="Song Title"
                    />
                </form>
            </div>
        );
    }
}

const addSongMutation = gql`
    mutation AddSong($title: String!) {
        addSong(title: $title) {
            id
            title
        }
    }
`;

const mapStateToProps = state => {
    return state;
};

export default compose(
    reduxForm({ form: "SongCreate", validate }),
    connect(mapStateToProps, { submitSongCreate }),
    graphql(addSongMutation)
)(SongCreate);
