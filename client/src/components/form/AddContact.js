import { Form, Input } from 'antd'

const getStyles = () => ({
    form: {
        marginBottom: '2rem'
    }

})


const AddPersonForm = () => {
    const styles = getStyles();


    return (
        <Form
            name='add-person-form'
            layout='vertical'
            size='large'
            style={styles.form}
        >
            <Form.Item name="firstName" rules={[{ required: true, message: "Please input your first name!" }]}>
                <Input placeholder="i.e. Alex" />
            </Form.Item>
            <Form.Item name="lastName" rules={[{ required: true, message: "Please input your last name!" }]}>
                <Input placeholder="i.e. Smith" />
            </Form.Item>
        </Form>
    );
}

export default AddPersonForm;
