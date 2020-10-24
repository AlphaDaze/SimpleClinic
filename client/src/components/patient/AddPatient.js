import React, { Fragment, useState } from 'react';

const initalState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    cnic: '',
    gender: '',
    birthdate: '',
    firstLine: '',
    secondLine: '',
    thirdLine: '',
    city: '',
    province: '',
};

const NewPatient = () => {
    const [formData, setFormData] = useState(initalState);

    const {
        firstName,
        lastName,
        phoneNumber,
        cnic,
        gender,
        birthdate,
        firstLine,
        secondLine,
        thirdLine,
        city,
        province,
    } = formData;


    const onTextChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSelectChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.options[e.target.selectedIndex].text
    })
    const onDateChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        console.log()
    }

    return (
        <Fragment>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Add Patient</h4>
                        <form className="form-sample" onSubmit={e => onSubmit(e)}>
                            <p className="card-description">
                                Enter patient's name, phone, gender and dob
                            </p>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label
                                            className="col-sm-3 col-form-label"
                                            style={{ marginTop: "-12px" }} >
                                            First & Middle Name
                                        </label>
                                        <div className="col-sm-9">
                                            <input type="text"
                                                className="form-control"
                                                placeholder="First Middle"
                                                name='firstName'
                                                value={firstName}
                                                onChange={e => onTextChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Last Name</label>
                                        <div className="col-sm-9">
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Last Name"
                                                name='lastName'
                                                value={lastName}
                                                onChange={e => onTextChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Gender</label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control"
                                                name='gender'
                                                value={gender}
                                                onChange={e => onSelectChange(e)}>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Date of Birth</label>
                                        <div className="col-sm-9">
                                            <input type="date"
                                                className="form-control"
                                                name='birthdate'
                                                value={birthdate}
                                                onChange={e => onDateChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label
                                            className="col-sm-3 col-form-label"
                                            style={{ marginTop: "-12px" }} >
                                            Phone Number
                                        </label>
                                        <div className="col-sm-9">
                                            <input type="number"
                                                className="form-control"
                                                max={99999999999}
                                                placeholder="00000000000"
                                                name='phoneNumber'
                                                value={phoneNumber}
                                                onChange={e => onTextChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="card-description">
                                Address
                            </p>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">House Number</label>
                                        <div className="col-sm-9">
                                            <input type="text"
                                                className="form-control"
                                                name='lastName'
                                                value={lastName}
                                                onChange={e => onTextChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                             -   <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Street Number</label>
                                        <div className="col-sm-9">
                                            <input type="text"
                                                className="form-control"
                                                name='lastName'
                                                value={lastName}
                                                onChange={e => onTextChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Sector</label>
                                        <div className="col-sm-9">
                                            <input type="text"
                                                className="form-control"
                                                name='lastName'
                                                value={lastName}
                                                onChange={e => onTextChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Area</label>
                                        <div className="col-sm-9">
                                            <input type="text"
                                                className="form-control"
                                                name='thirdLine'
                                                value={thirdLine}
                                                onChange={e => onTextChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">City</label>
                                        <div className="col-sm-9">
                                            <input type="text"
                                                className="form-control"
                                                name='city'
                                                value={city}
                                                onChange={e => onTextChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Province</label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control"
                                                name='province'
                                                value={province}
                                                onChange={e => onSelectChange(e)} >
                                                <option>Khyber Pakhtunkhwa</option>
                                                <option>Islamabad</option>
                                                <option>Punjab</option>
                                                <option>Sindh</option>
                                                <option>Balochistan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary mr-2">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment >
    );
}

export default NewPatient;