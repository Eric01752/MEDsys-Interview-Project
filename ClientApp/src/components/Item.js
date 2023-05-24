
const Item = ({ id, name, description, openEditForm, deleteItem }) => {

    return (
        <tr>
            <td>{name}</td>
            <td>{description}</td>
            <td>
                <button onClick={() => openEditForm({ id, name, description })} className="btnTable btnStatus">Update</button>
                <button onClick={() => deleteItem(id)} className="btnTable btnStatus">&times;</button>
            </td>
        </tr>
    );

};

export default Item;
