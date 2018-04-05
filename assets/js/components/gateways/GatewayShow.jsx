import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import pick from 'lodash/pick'
import { fetchGateway, deleteGateway } from '../../actions/gateway'
import EventsTable from '../events/EventsTable'
import DashboardLayout from '../DashboardLayout'
import RandomEventButton from '../events/RandomEventButton'
import Button from '../common/Button'

class GatewayShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchGateway(id)
  }

  render() {
    const { gateway, events, deleteGateway } = this.props

    if (gateway === undefined) return (<div>loading...</div>)

    return(
      <DashboardLayout title="Gateway" current="gateways">
        <p>ID: {gateway.id}</p>
        <p>Name: {gateway.name}</p>
        <p>MAC: {gateway.mac}</p>
        <p>Lat: {gateway.latitude}</p>
        <p>Lng: {gateway.longitude}</p>

        <RandomEventButton gateway_id={gateway.id} />
        <Button
          type="danger"
          text="Delete Gateway"
          onClick={() => deleteGateway(gateway)}
        />
        <EventsTable events={events} />
      </DashboardLayout>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const gateway = state.entities.gateways[ownProps.match.params.id]
  if (gateway === undefined) return {}
  return {
    gateway,
    events: Object.values(pick(state.entities.events, gateway.events))
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGateway, deleteGateway }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GatewayShow);