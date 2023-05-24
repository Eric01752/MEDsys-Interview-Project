
const Item = ({ id, name, description, openEditForm, deleteItem }) => {

    return (
        <tr>
            <td>{name}</td>
            <td>{description}</td>
            <td>
                <button onClick={() => openEditForm({id, name, description})}>Update</button>
                <button onClick={() => deleteItem(id)}>&times;</button>
            </td>
        </tr>
    );

};

export default Item;
