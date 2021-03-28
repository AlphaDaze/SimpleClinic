import React, { Fragment, useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { getPatientById } from '../../actions/patient';
import { createPatient } from '../../actions/patient';

import { Helmet } from 'react-helmet'
const TITLE = "Edit Patient"




const EditPatient = ({ createPatient, history, getPatientById, patient: {patient, loading}, match}) => {
    useEffect(() => {
        getPatientById(match.params.id);
    }, [getPatientById, match.params.id]);
    
    let initialState = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        cnic: '',
        gender: 'Male',
        birthdate: '',
        houseNumber: '',
        streetNumber: '',
        sector: '',
        area: '',
        city: '',
        province: 'Khyber Pakhtunkhwa',
    };

    if (!loading) {
        const pat = patient.patient;

        // SPLIT INTO ARRAY OF NUMBERS - takes numbers out of string
        if (pat.address.firstLine) {
            const houseAndStreet = pat.address.firstLine.match(/^\d+|\d+\b|\d+(?=\w)/g).map(function (v) {return +v;}); //=> [4567, 4, 67]
            initialState.houseNumber = houseAndStreet[0];
            initialState.streetNumber = houseAndStreet[1];
        }

        const dob = new Date(pat.birthdate).toISOString().split('T')[0];


        initialState.firstName = pat.firstName;
        initialState.lastName = pat.lastName;
        initialState.phoneNumber = pat.phoneNumber;
        initialState.cnic = pat.cnic;
        initialState.gender = pat.gender;
        initialState.birthdate = dob;
        initialState.sector = pat.address.secondLine;
        initialState.area = pat.address.thirdLine;
        initialState.city = pat.address.city;
        initialState.province = pat.address.province;
    }
    

    const [formData, setFormData] = useState(initialState);

    let {
        firstName,
        lastName,
        phoneNumber,
        cnic,
        gender,
        birthdate,
        houseNumber,
        streetNumber,
        sector,
        area,
        city,
        province,
    } = formData;



    const onTextChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSelectChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.options[e.target.selectedIndex].text
    })
    const onDateChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }) // remove this

    const onSubmit = e => {
        e.preventDefault();

        // destructure form here
        const parsedData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            cnic: formData.cnic,
            gender: formData.gender,
            birthdate: formData.birthdate,
            firstLine: null,
            secondLine: formData.sector,
            thirdLine: formData.area,
            city: formData.city,
            province: null,
        };

       

        if (formData.houseNumber) {
            parsedData.firstLine = "House No. " + formData.houseNumber + ", Street No. " + formData.streetNumber;
            parsedData.province = formData.province;
        }

        createPatient(parsedData, history);
    }


    if (loading) {
        return <Card body>Loading...</Card>
    } else {
        return (
            <Fragment>
    
                {loading ? <Card body>Loading...</Card> : 
                    
                    <Fragment>
    
                        <Helmet>
                            <title>{ TITLE }</title>
                        </Helmet>
                        
                        <div className="card elevationSmall">
                            <div className="card-body">
                                <h4 className="card-title">Edit Patient</h4>
                                <form className="form-" onSubmit={e => onSubmit(e)}>
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
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label
                                                    className="col-sm-3 col-form-label"
                                                    style={{ marginTop: "-12px" }} >
                                                    CNIC Number
                                                </label>
                                                <div className="col-sm-9">
                                                    <input type="number"
                                                        className="form-control"
                                                        max={9999999999999}
                                                        placeholder="0000000000000"
                                                        name='cnic'
                                                        value={cnic}
                                                        onChange={e => onTextChange(e)}
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
                                                <label 
                                                    className="col-sm-3 col-form-label"
                                                    style={{ marginTop: "-12px" }}>
                                                    House Number
                                                </label>
                                                <div className="col-sm-9">
                                                    <input type="number"
                                                        placeholder="1-9999"
                                                        className="form-control"
                                                        name='houseNumber'
                                                        value={houseNumber}
                                                        onChange={e => onTextChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                            <label 
                                                className="col-sm-3 col-form-label"
                                                style={{ marginTop: "-12px" }}>
                                                Street Number
                                            </label>
                                                <div className="col-sm-9">
                                                    <input type="number"
                                                        className="form-control"
                                                        placeholder="1-999"
                                                        name='streetNumber'
                                                        value={streetNumber}
                                                        onChange={e => onTextChange(e)}
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
                                                        placeholder="Sector L2"
                                                        name='sector'
                                                        value={sector}
                                                        onChange={e => onTextChange(e)}
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
                                                        placeholder="Hayatabad"
                                                        name='area'
                                                        value={area}
                                                        onChange={e => onTextChange(e)}
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
                                                        placeholder="Peshawar"
                                                        name='city'
                                                        value={city}
                                                        onChange={e => onTextChange(e)}
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
                                    <button type="submit" className="btn btn-primary mr-2">Edit</button>
                                </form>
                            </div>
                        </div>
                    </Fragment> }
            </Fragment>
        );
    }

    
}

EditPatient.propTypes = {
    createPatient: PropTypes.func.isRequired,
    getPatientById: PropTypes.func.isRequired,
    patient: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    patient: state.patient,
})


export default connect(mapStateToProps, { createPatient, getPatientById })(withRouter(EditPatient));
