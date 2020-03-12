import React, { Component } from 'react';
import { API_USERS } from '../../constants/apiConstants';
import { getData } from '../../utils/apiutil';
import Table from '../table';
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { connect } from 'react-redux';

//styles for table
const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;   
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }`

//style for address modal
const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        position:'absolute'
    }
};
ReactModal.setAppElement('#root');

//users component which list all user data
class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showModal: false
        }
        this.columns = [
            {
                Header: 'Name ',
                accessor: 'name',
                headerStyle: { whiteSpace: 'unset' },
                style: { whiteSpace: 'unset' },
            },
            {
                Header: 'Age',
                accessor: 'age',
                headerStyle: { whiteSpace: 'unset' },
                style: { whiteSpace: 'unset' },
            },
            {
                Header: 'Employee Id',
                accessor: 'eid',
                headerStyle: { whiteSpace: 'unset' },
                style: { whiteSpace: 'unset' },
            },
            {
                Header: 'Sex',
                accessor: 'sex',
                headerStyle: { whiteSpace: 'unset' },
                style: { whiteSpace: 'unset' },
            }, {
                header: '',
                id: 'click-me-button',
                accessor: 'id',
                Cell: (row) => (
                    <button onClick={() => {
                        console.log(row);
                        console.log(row.cell.value);
                        this.getGivenUserAddresses(row.cell.value);

                    }}>
                        Click for Addresses
                    </button>
                )
            }
        ];

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }


    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }
    //State updating without redux
    getGivenUserAddresses(id) {
        getData(`${API_USERS.getUserAddresses}?userId=${id}`).then((data) => {
            console.log("data", data);
            let addressList = (<label><b>No address Found</b></label>);
            if (data && data.length > 0) {
                addressList = data.map((item, index) => {
                    return (
                        <div key={index}>
                            <label><b>Address {index + 1}</b></label><br></br>
                            <label>Street:{item.street}</label><br></br>
                            <label>City:{item.city}</label><br></br>
                            <label>State: {item.state}</label><br></br>
                        </div>
                    );

                })

            }
            this.setState({ address: addressList }, () => {
                this.handleOpenModal();
            });
        });
    }
    render() {
        const { data } = this.props;
        return (
            <React.Fragment>
                {(data && data.length > 0) ? <Styles><Table columns={this.columns} data={data} /> </Styles> : null}
                <ReactModal
                    isOpen={this.state.showModal}
                    style={modalStyle}
                >   <span onClick={this.handleCloseModal} style={{ position: 'absolute', right: '5px', top: '0px', cursor: 'pointer' }}>X</span>
                    {this.state.address}
                </ReactModal>
            </React.Fragment>
        )
    };

}

const mapStateToProps = state => {
    return {
        data: state.data
    };
};

export default connect(
    mapStateToProps,
    null
)(Users);