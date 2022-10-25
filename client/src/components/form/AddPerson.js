import { useState, useEffect } from 'react';
import { Form, Input, Button, Divider } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { ADD_PERSON, GET_PEOPLE } from '../../queries';
import Title from '../layout/Title';

const getStyles = () => ({
    form: {
        marginBottom: '2rem'
    }

})


const AddPersonForm = () => {
    const styles = getStyles();
    // const [id] = useState(uuidv4());
    const [addPerson] = useMutation(ADD_PERSON)

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        const { firstName, lastName } = values

        addPerson({
            variables: {
                id: uuidv4(),
                firstName,
                lastName,
            },
            update: (cache, { data: { addPerson } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE });
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: { ...data, people: [...data.people, addPerson] }
                });
            }
        })
    }

    return (
        <>
            <Form
                form={form}
                name='add-person-form'
                onFinish={onFinish}
                // size='large'
                style={styles.form}
                layout='inline'
            >
                <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: "Please input your first name!" }]}>
                    <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Please input your last name!" }]}>
                    <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Add Person
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </>
    );
}

export default AddPersonForm;
