import { useState } from "react";

const AddItem = ({ createItem, closeForms }) => {

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
        <div className="formContainer">
            <h1>Add Item</h1>
            <form onSubmit={onSubmit} autoComplete="off">
                <label htmlFor="name">Name: </label><br />
                <input type="text" id="name" name="name" onChange={handleChange}></input><br />
                <label htmlFor="description">Description: </label><br />
                <input type="text" id="description" name="description" onChange={handleChange}></input><br />
                <button type="submit" className="btnForm">Submit</button>
                <button onClick={closeForms} className="btnForm">Cancel</button>
            </form>
        </div>
    );
};

export default AddItem;