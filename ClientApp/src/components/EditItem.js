import { useState } from "react";

const EditItem = ({ item, editItem, closeForms }) => {

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
        <div className="formContainer">
            <h1>Edit Item</h1>
            <form onSubmit={onSubmit} autoComplete="off">
                <label htmlFor="name">Name: </label><br />
                <input type="text" id="name" name="name" value={newItem.name} onChange={handleChange}></input><br />
                <label htmlFor="description">Description: </label><br />
                <input type="text" id="description" name="description" value={newItem.description} onChange={handleChange}></input><br />
                <button type="submit" className="btnForm">Submit</button>
                <button onClick={closeForms} className="btnForm">Close Form</button>
            </form>
        </div>
    );
};

export default EditItem;