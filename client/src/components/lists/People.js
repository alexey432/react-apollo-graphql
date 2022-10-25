import { List, Spin } from "antd";
import { GET_PEOPLE } from '../../queries';
import { useQuery } from "@apollo/client";
import Person from '../listItems/Person';

const People = () => {
    const { loading, error, data } = useQuery(GET_PEOPLE);
    console.log(data);

    // if Error
    if (error) return <p>{error.message}</p>;

    return (
        <>
            {loading ? (<Spin />) : (
                <List>
                    {data && data.people.map(person => (
                        <List.Item key={person.id}><Person person={person} /></List.Item>
                    ))}
                </List>
            )}
        </>
    );
}

export default People;
