import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPrescription } from '../../actions/prescription';

import { Helmet } from 'react-helmet'
const TITLE = "Add Prescription"

let date = new Date(); 
const currDate = date.toISOString().substr(0,10);

const initalState = {
    drug: '',
    units: '',
    directions: '',
    notes: '',
    startDate: currDate,
    endDate: '',
};

const NewPrescription = ({ createPrescription, history, match }) => {
    const [formData, setFormData] = useState(initalState);

    const {
        drug,
        units,
        directions,
        notes,
        startDate,
        endDate
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        createPrescription(match.params.id, formData, history);
    }  
    

    return (
        <Fragment>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            
            <div className="card elevationSmall">
                <div className="card-body">
                    <h4 className="card-title">Add Prescription</h4>
                    <form className="form-" onSubmit={e => onSubmit(e)}>
                        <p className="card-description">
                            Enter prescription details
                        </p>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label
                                        className="col-sm-3 col-form-label"
                                        style={{ marginTop: "-12px" }} >
                                        Drug
                                    </label>
                                    <div className="col-sm-9">
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Drug's Name"
                                            name='drug'
                                            value={drug}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Units</label>
                                    <div className="col-sm-9">
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Units"
                                            name='units'
                                            value={units}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Directions</label>
                                    <div className="col-sm-9">
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Directions"
                                            name='directions'
                                            value={directions}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Notes</label>
                                    <div className="col-sm-9">
                                        <textarea rows="3" cols="50"
                                            className="form-control"
                                            name='notes'
                                            value={notes}
                                            onChange={e => onChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Start Date</label>
                                    <div className="col-sm-9">
                                        <input type="date"
                                            className="form-control"
                                            name='startDate'
                                            value={startDate}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">End Date</label>
                                    <div className="col-sm-9">
                                        <input type="date"
                                            className="form-control"
                                            name='endDate'
                                            value={endDate}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    </form>
                </div>
            </div>
        </Fragment >
    );
}

NewPrescription.propTypes = {
    createPrescription: PropTypes.func.isRequired,
};


export default connect(null, { createPrescription })(withRouter(NewPrescription));
