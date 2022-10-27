import { useState, useEffect } from 'react';
import { Form, Input, Button, Divider, InputNumber } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { UPDATE_CAR, GET_PEOPLE, } from '../../queries';
import Title from '../layout/Title';
import { useQuery } from "@apollo/client";
import { Select } from 'antd';
const { Option } = Select;

const getStyles = () => ({
    form: {
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'nowrap',
    }

})


const UpdateCarForm = ({ car, handleClick }) => {
    const { id, make, model, year, price, personId } = car

    const { loading, error, data } = useQuery(GET_PEOPLE);

    console.log('people: ', data.people);
    const styles = getStyles();
    // const [id] = useState(uuidv4());
    const [updateCar] = useMutation(UPDATE_CAR)
    const [selectedPersonId, setSelectedPersonId] = useState(personId);

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        const { make,
            model,
            year,
            color,
            price } = values;

        updateCar({
            variables: {
                id: id,
                make: `${make}`,
                model: `${model}`,
                year: year,
                color: `${color}`,
                price: price,
                personId: selectedPersonId
            },
            update: (cache, { data: { updateCar } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE });

                const newData = data.people.map(person => {

                    // if the car stays with the same person
                    if (personId === updateCar.personId) {
                        if (person.id === updateCar.personId) {
                            const newCars = person.cars.filter(car => car.id !== updateCar.id)


                            return { ...person, cars: [...newCars, updateCar] }
                        }

                        return person;

                        // if the car doesn't stay with the same person
                    } else {
                        // add car to new person
                        if (person.id === updateCar.personId) {

                            const newCars = [...person.cars, updateCar]
                            return { ...person, cars: [...newCars] }
                        }

                        // remove car from previous person
                        if (person.id === personId) {
                            const newCars = person.cars.filter(car => car.id !== updateCar.id)

                            return {
                                ...person,
                                cars: [...newCars]
                            }
                        }

                        return person;
                    }

                })


                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: { ...data, people: [...newData] }
                });
            }
        })

        handleClick();

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
                initialValues={{
                    year: year,
                    make: make,
                    model: model,
                    price: price,
                    person: data.people.find(person => person.id === personId).id
                }}
            >
                <Form.Item name="year" label="Year" rules={[{ required: true, message: "Please input the car's year!" }]}>
                    {/* <Input width={20} placeholder="Year" /> */}
                    <InputNumber
                        min={1}
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
                        optionFilterProp="people"
                        onChange={(id) => setSelectedPersonId(id)}
                    // onSearch={onSearch}
                    // filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                        {data.people.map(person => (
                            <Option key={person.id} value={person.id}>{person.firstName} {person.lastName}</Option>
                        ))}
                        {/* <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option> */}
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(false) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Update Car
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </>
    );
}

export default UpdateCarForm;
