import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createVisit } from '../../actions/visit'

import { Helmet } from 'react-helmet'
const TITLE = "Add Visit"

const initalState = {
    patientIssue: '',
    examination: '',
    diagnosis: '',
    whiteBlood: '',
    haemoglobin: '',
    urea: '',
    creatinine: '',
    FEV1: '',
    FVC: '',
    followup: ''
};

const NewVisit = ({ createVisit, history, match }) => {
    const [formData, setFormData] = useState(initalState);

    const {
        patientIssue,
        examination,
        diagnosis,
        whiteBlood,
        haemoglobin,
        urea,
        creatinine,
        FEV1,
        FVC,
        followup,
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        createVisit(match.params.id, formData, history);
    }  
    

    return (
        <Fragment>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            
            <div className="card elevationSmall">
                <div className="card-body">
                    <h4 className="card-title">Add Visit</h4>
                    <form className="form-" onSubmit={e => onSubmit(e)}>
                        <p className="card-description">
                            Enter visit details
                        </p>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label
                                        className="col-sm-3 col-form-label"
                                        style={{ marginTop: "-12px" }} >
                                        Patient's Complaints
                                    </label>
                                    <div className="col-sm-9">
                                        <textarea rows="3" cols="50"
                                            className="form-control"
                                            name='patientIssue'
                                            value={patientIssue}
                                            onChange={e => onChange(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Examination</label>
                                    <div className="col-sm-9">
                                        <textarea rows="3" cols="50"
                                            className="form-control"
                                            name='examination'
                                            value={examination}
                                            onChange={e => onChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Diagnosis</label>
                                    <div className="col-sm-9">
                                        <textarea rows="3" cols="50"
                                            className="form-control"
                                            name='diagnosis'
                                            value={diagnosis}
                                            onChange={e => onChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="card-description spacerAboveSmall">
                            Vitals
                        </p>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">White Blood Cell</label>
                                    <div className="col-sm-9">
                                        <input type="number"
                                            placeholder="9999"
                                            className="form-control"
                                            name='whiteBlood'
                                            value={whiteBlood}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Haemoglobin</label>
                                    <div className="col-sm-9">
                                        <input type="number"
                                            placeholder="999"
                                            className="form-control"
                                            name='haemoglobin'
                                            value={haemoglobin}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Creatinine</label>
                                    <div className="col-sm-9">
                                        <input type="number"
                                            placeholder="999"
                                            className="form-control"
                                            name='creatinine'
                                            value={creatinine}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Urea</label>
                                    <div className="col-sm-9">
                                        <input type="number"
                                            placeholder="999"
                                            className="form-control"
                                            name='urea'
                                            value={urea}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="card-description spacerAboveSmall">
                            PFT
                        </p>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">FEV1</label>
                                    <div className="col-sm-9">
                                        <input type="number"
                                            placeholder="999"
                                            className="form-control"
                                            name='FEV1'
                                            value={FEV1}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">FVC</label>
                                    <div className="col-sm-9">
                                        <input type="number"
                                            placeholder="999"
                                            className="form-control"
                                            name='FVC'
                                            value={FVC}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row spacerAboveLarge">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Follow-up Date</label>
                                    <div className="col-sm-9">
                                        <input type="date"
                                            className="form-control"
                                            name='followup'
                                            value={followup}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mr-2">Add</button>
                    </form>
                </div>
            </div>
        </Fragment >
    );
}

NewVisit.propTypes = {
    createVisit: PropTypes.func.isRequired,
};


export default connect(null, { createVisit })(withRouter(NewVisit));
