import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { compose, withHandlers } from "recompose";
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
    handleFormSubmit = ({ title }) => {
        this.props.mutate({
            variables: { title }
        });
        this.props.submitSongCreate(title);
        this.props.history.push("/");
    };

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
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
