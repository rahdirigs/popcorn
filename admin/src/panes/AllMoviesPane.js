import React from 'react'
import { Table } from 'react-bootstrap'

const AllMoviesPane = () => {
  return (
    <Table striped bordered responsive hover className="table-md my-3">
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Year</td>
          <td>Past Shows</td>
          <td>Future Shows</td>
          <td>Spent</td>
          <td>Earnings</td>
        </tr>
      </thead>
      <tbody></tbody>
    </Table>
  )
}

export default AllMoviesPane
