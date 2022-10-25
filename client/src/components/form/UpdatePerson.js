import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { UPDATE_PERSON, GET_PEOPLE } from '../../queries';


const UpdatePerson = ({ firstName, lastName, handleClick }) => {

    const [updatePerson] = useMutation(UPDATE_PERSON)

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        const { firstName, lastName } = values

        updatePerson({
            variables: {
                id: uuidv4(),
                firstName,
                lastName,
            },
            // update: (cache, { data: { updatedPerson } }) => {
            //     const data = cache.readQuery({ query: GET_PEOPLE });
            //     cache.writeQuery({
            //         query: GET_PEOPLE,
            //         data: { ...data, people: [...data.people, updatedPerson] }
            //     });
            // }
        })

        handleClick();
    }

    return (
        <Form
            form={form}
            name='add-person-form'
            layout='vertical'
            onFinish={onFinish}
            initialValues={{
                firstName: firstName,
                lastName: lastName
            }}
            size='large'
        >
            <Form.Item name="firstName" rules={[{ required: true, message: "Please input your first name!" }]}>
                <Input placeholder="i.e. Alex" />
            </Form.Item>
            <Form.Item name="lastName" rules={[{ required: true, message: "Please input your last name!" }]}>
                <Input placeholder="i.e. Smith" />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Person
                    </Button>
                )}
            </Form.Item>
            <Form.Item>
                <Button
                    type='danger'
                    onClick={handleClick}
                >
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
}

export default UpdatePerson;
