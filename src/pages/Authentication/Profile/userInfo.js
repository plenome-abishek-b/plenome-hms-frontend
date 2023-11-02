import React from "react"
import { Table, TabPane, TabContent, Nav, NavItem, NavLink} from "reactstrap"

const userInfo = () => {
  return (
    <div>
      <div className="table-responsive">
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({
                active: activeTab === "1",
              })}
              onClick={() => {
                toggle("1")
              }}
            >
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({
                active: activeTab === "2",
              })}
              onClick={() => {
                toggle("2")
              }}
            >
              Address
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Table className="table-nowrap mb-0">
              <tbody>
                <tr>
                  <th scope="row">Father Name :</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Mother Name :</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Gender :</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">E-mail :</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Date of birth :</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Blood Group :</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">PAN Number :</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Work Experience :</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Qualification :</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Work type :</th>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="2">
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
          </TabPane>
        </TabContent>
      </div>
    </div>
  )
}

export default userInfo
