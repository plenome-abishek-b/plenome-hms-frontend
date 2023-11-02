import React from "react";
import { Table } from "reactstrap";

const userDetails = () => {
  return (
    <div className="table-responsive">
      <Table className="table-nowrap mb-0">
        <tbody>
          <tr>
            <th scope="row">Current Address :</th>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Permanent Address :</th>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default userDetails;
