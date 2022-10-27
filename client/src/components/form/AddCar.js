import { useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { ADD_CAR, GET_PEOPLE, GET_CARS } from '../../queries';
import { Select } from 'antd';
import { useQuery } from "@apollo/client";
const { Option } = Select;

const getStyles = () => ({
    form: {
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'nowrap',
    }

})


const AddCarForm = () => {
    const styles = getStyles();
    // const [id] = useState(uuidv4());
    const [addCar] = useMutation(ADD_CAR)
    const { loading, error, data } = useQuery(GET_PEOPLE);

    const people = data?.people;

    const [selectedPersonId, setSelectedPersonId] = useState(null);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        const {
            year,
            make,
            model,
            price, } = values
        console.log(values);

        addCar({
            variables: {
                id: uuidv4(),
                year: year,
                make: `${make}`,
                model: `${model}`,
                price: price,
                personId: `${selectedPersonId}`
            },
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE });

                const newData = data.people.map(person => {
                    if (person.id === addCar.personId) {
                        return {
                            ...person,
                            cars: [...person.cars, { ...addCar }]
                        }
                    }
                    return person;
                })

                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: { ...data, people: [...newData] }
                });
            }
        })

        form.resetFields();
    }

    return (
        <>  {people?.length > 0 && (
            <Form
                form={form}
                name='add-person-form'
                onFinish={onFinish}
                // size='large'
                style={styles.form}
                layout='inline'
            >
                <Form.Item name="year" label="Year" rules={[{ required: true, message: "Please input the car's year!" }]}>
                    {/* <Input width={20} placeholder="Year" /> */}
                    <InputNumber
                        // defaultValue={3} 
                        placeholder="Year"
                    />
                </Form.Item>
                <Form.Item name="make" label="Make" rules={[{ required: true, message: "Please input the car's make!" }]}>
                    <Input width={20} placeholder="Make" />
                </Form.Item>
                <Form.Item name="model" label="Model" rules={[{ required: true, message: "Please input the car's model!" }]}>
                    <Input width={20} placeholder="Model" />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please input the car's price!" }]}>
                    <InputNumber
                        // defaultValue={1000}
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    // onChange={onChange}
                    />
                </Form.Item>
                <Form.Item name="person" label="Person" rules={[{ required: true, message: "Please input the car's owner!" }]}>
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={(id => setSelectedPersonId(id))}
                    // onSearch={onSearch}
                    // filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                        {people?.map(person => (
                            <Option key={person.id} value={person.id}>{person.firstName} {person.lastName}</Option>
                        ))}
                    </Select>
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
                            Add Car
                        </Button>
                    )}
                </Form.Item>
            </Form>
        )}
        </>
    );
}

export default AddCarForm;
