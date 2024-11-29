import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext()

const UserProvider = ({ children, url }) => {
    let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const fetchUsers = useCallback(async () => {
        try 
        {
            setLoading(true)
            const response = await axios(url);
            setUsers(response.data)
            setError("")
        } 
        catch (error) 
        {
            setError("Error:", error)
        }
        finally 
        {
            setLoading(false)
        }
    }, [url])

    //Effects
    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])


    //add user into the state
    const onAddUser = (user) => {
        let len = users.length;
        let id = len + 1;
        const { name, username, email, phone } = user

        setUsers((prev) => {
            return [...prev, {id, name, username, email, phone}]
        })
    }

    //Add User
    const addHandler = async (event, values) => {
        event.preventDefault();
        if (
            !values.name?.trim() || 
            !values.username?.trim() || 
            !values.email?.trim() || 
            !values.phone?.trim()
          ) {
            setError("All fields are required!");
            return;
          }
        
        try 
        {
            setLoading(true)
            const response = await axios.post(url, values)
            onAddUser(response.data)
            navigate("/users");
            setError("")
            
        } 
        catch (error) 
        {
            setError("Error:", error)
        }
        finally 
        {
            setLoading(false)
        }

    }


    //Update User
    const updateUser = async(value) => {
        try 
        {
            setLoading(true)
            const response = await axios.put(`${url}/${value.id}`, value)

            const updateUserData = response.data;
            const newUsers = users.map(user => user.id === value.id ? updateUserData : user)
            setUsers([...newUsers])
            setError("")
            
        } 
        catch (error) 
        {
            setError(error);
        }
        finally 
        {
            setLoading(false)
        }
    }


    //Delete User
    const deleteUser = async(id) => {
        try 
        {
            setLoading(true)
            await axios.delete(`${url}/${id}`)
            setUsers(users.filter(user => user.id !== id))
            setError("")
        } 
        catch (error) 
        {
            setError(error);
        }
        finally 
        {
            setLoading(false)
        }
        
    }


    //context
    const context = {
        users,
        loading,
        error,
        setError,
        addHandler,
        updateUser,
        deleteUser
    }

    return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export default UserProvider
