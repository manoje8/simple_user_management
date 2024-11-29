// Dependencies
import { useContext, useState } from "react"

// Contexts
import { UserContext } from "../context/User"

//component
import UserTable from "./UI/UserTable"

const Users = () => {

    // Here you consume your Context, and you can grab the user value and method.
    const { users, deleteUser, updateUser, loading, setError, error } = useContext(UserContext);

    //state for update
    const [updateValue, setUpdateValue] = useState({
        id: "",
        name: "",
        username: "",
        email: "",
        phone: "",
    });

    //state for using update fields
    const [editFlag, setEditFlag] = useState(false);
    const [editId, setEditId] = useState("");

    //set update value to state
    const handlerEdit = (id) => {
        setEditFlag(true);
        setEditId(id);
        setUpdateValue({ ...users[id] }); // Update with specific user object
    };

    //update user
    const updatedUser = () => {
        if (
            updateValue.name.trim() === "" ||
            updateValue.username.trim() === "" ||
            !/\S+@\S+\.\S+/.test(updateValue.email) ||
            updateValue.phone.trim() === ""
          ) {
            setError("All fields are required and must be valid!");
            return;
          }
        updateUser(updateValue);
        setEditFlag(false);
    };

    //Delete handler
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) 
        {
            deleteUser(id);
        }
    };

    
    const handleChange = ({ target: { name, value } }) => {
        setUpdateValue({
        ...updateValue,
        [name]: value,
        });
    };

    return (
        <div className="container my-3">
            {error && <p className="alert alert-danger text-center">{error}</p>}
            {loading && <p className="text-center">Loading...</p>}
            <UserTable>
                {
                    users.map((user, id) => {
                        return (
                            <tr key={id}>
                                <th scope="row">{id + 1}</th>
                                <td>{editId === id && editFlag ? <input type="text" name = "name" value={updateValue.name} onChange={handleChange}/>
                                : user.name}</td>
                                <td>{editId === id && editFlag ? <input type="text" name = "username" value={updateValue.username} onChange={handleChange}/>
                                : user.username}</td>
                                <td>{editId === id && editFlag ? <input type="email" name = "email" value={updateValue.email} onChange={handleChange}/>
                                : user.email}</td>
                                <td>{editId === id && editFlag ? <input type="text" name = "phone" value={updateValue.phone} onChange={handleChange}/>
                                : user.phone}</td>
                                {
                                    editId === id && editFlag ? 
                                    <td>
                                        <button className="btn text-white btn-dark mt-2 ml-4" onClick={updatedUser}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                        </button>
                                        <button className="btn btn-dark mt-2 ml-4" onClick={() => {setEditFlag(false)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                            </svg>
                                        </button>
                                    </td>
                                        :
                                    <td>
                                        <button className="btn text-white btn-dark mt-2 ml-4" onClick={() => handlerEdit(id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                            </svg>
                                        </button>
                                        <button className="btn btn-dark mt-2 ml-4" onClick={() => handleDelete(user.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                            </svg>
                                        </button>
                                    </td>
                                }
                            </tr>
                        )
                    })
                }
            </UserTable>
        </div>
    )
}

export default Users