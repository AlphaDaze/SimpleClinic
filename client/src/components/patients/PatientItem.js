import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import convertToDate from '../../helpers/convertToDate'

const PatientItem = ({patient: { firstName, lastName, phoneNumber, birthdate, address }}) => {
    const dob = convertToDate(birthdate);
    return (
        <Fragment>
            {firstName} {lastName}   -   {phoneNumber}  -   {dob} - {address.firstLine}  
        </Fragment>
    )
}

PatientItem.propTypes = {
    patient: PropTypes.object.isRequired,
}

export default PatientItem
