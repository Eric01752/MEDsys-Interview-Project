import { Fragment, useState } from "react";

const EditItem = ({ item, editItem }) => {

    const [newItem, setNewItem] = useState(item);

    const onSubmit = (e) => {
        e.preventDefault();

        if (newItem.name != "" && newItem.description != "") {
            editItem(newItem);
        }
        else {
            alert("Please enter all info.");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewItem({ ...newItem, [name]: value });
    };

    return (
        <Fragment>
            <h1>Edit Item</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" value={newItem.name} onChange={handleChange}></input>
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" name="description" value={newItem.description} onChange={handleChange}></input>
                <button type="submit">Submit</button>
            </form>
        </Fragment>
    );
};

export default EditItem;