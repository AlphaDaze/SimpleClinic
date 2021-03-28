// REQUIRED WORKAROUND for react-to-print

import React from "react";
import PatientPrint from "./PatientPrint";

class ComponentToPrint extends React.Component {
  render() {
      return (
          <PatientPrint patient={this.props.patient} prescriptions={this.props.prescriptions} visits={this.props.visits} ref={(el) => (this.componentRef = el)} />
      );
  }
}
export default ComponentToPrint;
