import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Spinner, FormFeedback } from 'reactstrap';
import InputField from 'custom-fields/InputField';

AutheticationForm.propTypes = {
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func,
};

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
});

function AutheticationForm({ initialValues, onSubmit }) {
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, status }) => (
                <Form>
                    <InputField label='Email' type='email' name='email' placeholder='Your email' />
                    <InputField
                        label='Password'
                        type='password'
                        name='password'
                        placeholder='Your password'
                    />

                    {status && <FormFeedback className='d-block'>{status}</FormFeedback>}
                    <Button
                        className='mt-4'
                        color='primary'
                        block
                        type='submit'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spinner size='xs' color='danger' /> : 'Sign In'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default AutheticationForm;
