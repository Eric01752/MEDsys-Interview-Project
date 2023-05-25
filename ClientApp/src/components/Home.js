import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Items from "./Items";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import axios from "axios";
import { itemSort } from "../Utils/sorting";

const Home = () => {

    // State to hold the items returned from api
    const [items, setItems] = useState(null);
    // State to hold item being passed to EditForm
    const [item, setItem] = useState(null);
    // State to show or hide AddForm
    const [showAddForm, setShowAddForm] = useState(false);
    // State to show or hide EditForm
    const [showEditForm, setShowEditForm] = useState(false);
    // State to check if item list is loading
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        axios.get('item').then((res) => {
            setItems(res.data);
        });

        setIsLoading(false);
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
        setBtnsDisabled(true);
        setShowEditForm(false);
        setShowAddForm(true);
    };

    const openEditForm = (item) => {
        setBtnsDisabled(true);
        setItem(null);
        setShowAddForm(false);
        setShowEditForm(true);
        setItem(item);
    };

    const closeForms = () => {
        setShowAddForm(false);
        setShowEditForm(false);
        setItem(null);
        setBtnsDisabled(false);
    };

    const setBtnsDisabled = (status) => {
        document.querySelectorAll(".btnStatus").forEach((btn) => btn.disabled = status);
    };

    return (
        <div className="container">
            <div className="listContainer">
                <h1>Item List</h1>
                <button onClick={openAddForm} className="btnAdd btnStatus">Add Item</button>
                <Items items={items} openEditForm={openEditForm} deleteItem={deleteItem} isLoading={isLoading} />
            </div>
            {showAddForm && <AddItem createItem={createItem} closeForms={closeForms} />}
            {showEditForm && <EditItem item={item} editItem={editItem} closeForms={closeForms} />}
        </div>
    );
};

export default Home;