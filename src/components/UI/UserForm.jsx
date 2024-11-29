const UserForm = () => {
    return (
        <div className="p-3 p-md-4 p-xl-5">
            <div className="container">
                <div className="row d-flex justify-content-center ">
                    <div className="col-12 col-md-6 p-5 border rounded bg-light">
                        <form>
                            <div className="form-group">
                                <input name="username" type="text" className="form-control" id="inputUserName" placeholder="User Name" />
                            </div>
                            <div className="form-group">
                                <input name="name" type="text" className="form-control" id="inputName" placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <input name="email" type="email" className="form-control" id="inputEmail" placeholder="E-mail address" />
                            </div>
                            <div className="form-group">
                                <input name="phone" type="number" className="form-control" id="inputNumber" placeholder="Phone Number" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm