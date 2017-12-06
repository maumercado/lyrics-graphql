import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import { compose } from "recompose";

const validate = values => {
    const errors = {};
    if (!values.lyric) {
        errors.lyric = "A lyric is required";
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

class LyricCreate extends Component {
    handleFormSubmit = async ({ lyric }) => {};

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Field
                    name="lyric"
                    type="text"
                    component={renderField}
                    label="Add a Lyric"
                />
            </form>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default compose(
    reduxForm({ form: "AddLyric", validate }),
    connect(mapStateToProps)
)(LyricCreate);
