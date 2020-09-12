import { Field, useField, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

InputField.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
};

function InputField({ label, placeholder, type, name }) {
    const [field, meta] = useField(name);

    const errorText = meta.error && meta.touched ? meta.error : '';

    return (
        <FormGroup>
            <Label for={label}>{label}</Label>
            <Field
                {...field}
                placeholder={placeholder}
                type={type}
                as={Input}
                invalid={!!errorText}
            />
            <ErrorMessage name={name} component={FormFeedback} />
        </FormGroup>
    );
}

export default InputField;
