import { useState, Fragment } from "react";

const AddItem = ({ createItem }) => {

    const initState = {
        name: "",
        description: ""
    };

    const [item, setItem] = useState(initState);

    const onSubmit = (e) => {
        e.preventDefault();

        if (item.name != "" && item.description != "") {
            createItem(item);
        }
        else {
            alert("Please enter all info.");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    };

    return (
        <Fragment>
            <h1>Add Item</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" onChange={handleChange}></input>
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" onChange={handleChange}></input>
                <button type="submit">Submit</button>
            </form>
        </Fragment>
    );
};

export default AddItem;