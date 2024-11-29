import { useContext, useState } from "react"
import { UserContext } from "../context/User"

const Home = () => {
    const { addHandler, loading, error } = useContext(UserContext)
    const [values, setValues] = useState([{
        id: '',
        name: '',
        username: '',
        email: '',
        phone: ''
    }])

    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        })
    }


    return (
        <div>
            <h1 className="text-center">Add User</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-12 col-md-6 p-5 border rounded bg-light">
                            <form onSubmit={(e)=>addHandler(e,values)}>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="inputUserName" placeholder="User Name"
                                        name="username" value={values.username || ''} onChange={handleChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="inputName" placeholder="Name"
                                        name="name" value={values.name || ''} onChange={handleChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" id="inputEmail" placeholder="E-mail address"
                                        name="email" value={values.email || ''} onChange={handleChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="number" className="form-control" id="inputNumber" placeholder="Phone Number"
                                        name="phone" value={values.phone || ''} onChange={handleChange}/>
                                </div>
                                <button className="btn btn-primary">{loading ? "Loading..." : "Add"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Home