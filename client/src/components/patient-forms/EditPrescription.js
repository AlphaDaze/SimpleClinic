import React, { Fragment, useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { getPrescriptionById } from '../../actions/prescription';
import { editPrescriptionById } from '../../actions/prescription';
import convertToDate from '../../utils/convertToDate'

import { Helmet } from 'react-helmet'
const TITLE = "Edit Patient"




const EditPrescription = ({ editPrescriptionById, getPrescriptionById, prescription: {prescription, loading}, history, match}) => {
    useEffect(() => {
        getPrescriptionById(match.params.id);
    }, [getPrescriptionById, match.params.id]);


    const date = new Date(); 
    const currDate = date.toISOString().substr(0,10);
    
    let initialState = {
        drug: '',
        units: '',
        directions: '',
        notes: '',
        startDate: currDate,
        endDate: '',
    };

    if (!loading && prescription != null) {
        initialState.drug = (prescription.drug) ? prescription.drug : '';
        initialState.units = (prescription.units) ? prescription.units : '';
        initialState.directions = (prescription.directions) ? prescription.directions : '';
        initialState.notes = (prescription.notes) ? prescription.notes : '';

        if (prescription.startDate) {
            const start = new Date(prescription.startDate).toISOString().substr(0,10); 
            initialState.startDate = start;
        }
        if (prescription.endDate) {
            const end = new Date(prescription.endDate).toISOString().substr(0,10); 
            initialState.endDate = end;
        }
    }
    
    console.log(initialState);

    const [formData, setFormData] = useState(initialState);

    let {
        drug,
        units,
        directions,
        notes,
        startDate,
        endDate
    } = formData;
    
   
    useEffect(() => {
        setFormData({...formData});
    }, [initialState.drug]);


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        editPrescriptionById(match.params.id, formData, history);
    }


    if (loading) {
        return <Card body>Loading...</Card>
    } else {
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
                                                required
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

    
}

EditPrescription.propTypes = {
    editPrescriptionById: PropTypes.func.isRequired,
    getPrescriptionById:  PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    prescription: state.prescription,
})



export default connect(mapStateToProps, { getPrescriptionById, editPrescriptionById})(withRouter(EditPrescription));
