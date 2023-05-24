import React, { useState, Fragment, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Items from "./Items";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import axios from "axios";
import { itemSort } from "../Utils/sorting";

const Home = () => {

    const [items, setItems] = useState(null);
    const [item, setItem] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        axios.get('item').then((res) => {
            setItems(res.data);
        });
    }, []);

    const deleteItem = (id) => {
        axios.delete(`item/${id}`).then(() => {
            let newList = [...items.filter((i) => i.id !== id)].sort((a, b) => itemSort(a, b));
            setItems([...newList]);
        });
    };

    const editItem = (item) => {
        axios({
            method: 'PUT',
            url: `item/${item.id}`,
            data: {
                Id: item.id,
                Name: item.name,
                Description: item.description
            },
            config: {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        }).then((res) => {
            let newList = [...items.filter((i) => i.id !== item.id), res.data].sort((a, b) => itemSort(a, b));
            setItems([...newList]);
        });

        closeForms();
    };

    const createItem = (item) => {
        const newItem = {
            Id: uuid(),
            Name: item.name,
            Description: item.description
        };

        axios({
            method: 'POST',
            url: 'item',
            data: newItem,
            config: {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        }).then((res) => {
            let newList = [...items, res.data].sort((a, b) => itemSort(a, b));
            setItems([...newList]);
        });

        closeForms();
    };

    const openAddForm = () => {
        setShowEditForm(false);
        setShowAddForm(true);
    };

    const openEditForm = (item) => {
        setItem(item);
        setShowAddForm(false);
        setShowEditForm(true);
    };

    const closeForms = () => {
        setShowAddForm(false);
        setShowEditForm(false);
        setItem("");
    };

    return (
        <Fragment>
            <div>
                <h1>Item List</h1>
                <button onClick={openAddForm}>Add Item</button>
                <Items items={items} openEditForm={openEditForm} deleteItem={deleteItem} />
            </div>
            <div>
                {showAddForm && <AddItem createItem={createItem} />}
                {showEditForm && <EditItem item={item} editItem={editItem} />}
            </div>
        </Fragment>
    );
};

export default Home;