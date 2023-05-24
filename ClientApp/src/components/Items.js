import Item from "./Item";

const Items = ({ items, openEditForm, deleteItem }) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    items != null &&
                    items.map((item, index) =>
                        <Item key={index} id={item.id} name={item.name} description={item.description} openEditForm={openEditForm} deleteItem={deleteItem} />
                    )
                }
            </tbody>
        </table>
    );
};

export default Items;