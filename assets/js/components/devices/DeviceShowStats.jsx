import React, { Component } from 'react'
import { blueForDeviceStatsLarge } from '../../util/colors'
import { DEVICE_SHOW_STATS } from '../../graphql/devices'
import { Typography, Card, Col, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { graphql } from 'react-apollo';

const { Text } = Typography
const antLoader = <LoadingOutlined style={{ fontSize: 50, color: '#38A2FF' }} spin />;

const queryOptions = {
  options: props => ({
    variables: {
      id: props.device.id
    },
    fetchPolicy: 'cache-and-network',
  })
}

@graphql(DEVICE_SHOW_STATS, queryOptions)
class DeviceShowStats extends Component {
  state = {
    showDC: false
  }

  renderTitle = () => (
    <span>
      <a href="#" onClick={e => { e.preventDefault(); this.setState({ showDC: false }) }}>
        <Text style={{ fontWeight: 600, marginRight: 15, color: this.state.showDC ? "#777777" : "#000000" }}>Packets Transferred</Text>
      </a>
      <a href="#" onClick={e => { e.preventDefault(); this.setState({ showDC: true }) }}>
        <Text style={{ fontWeight: 600, color: !this.state.showDC ? "#777777" : "#000000" }}>DC Used</Text>
      </a>
    </span>
  )

  render() {
    const { device, smallerText } = this.props
    const { loading, error, device_stats } = this.props.data
    const { showDC } = this.state

    if (loading) return (
      <Card title={this.renderTitle()} style={{ height: 'calc(100% - 20px)', minWidth: 350 }}>
        <Col span={12}>
          <Text style={{ fontSize: 16, fontWeight: '300' }}>All Time</Text><br/>
          <Spin indicator={antLoader} style={{ marginTop: 10 }}/>
          <div style={{ marginBottom: 30 }} />
          <Text style={{ fontSize: 16, fontWeight: '300' }}>Last 30 Days</Text><br/>
          <Spin indicator={antLoader} style={{ marginTop: 10 }}/>
        </Col>
        <Col span={12}>
          <Text style={{ fontSize: 16, fontWeight: '300' }}>Last 7 Days</Text><br/>
          <Spin indicator={antLoader} style={{ marginTop: 10 }}/>
          <div style={{ marginBottom: 30 }} />
          <Text style={{ fontSize: 16, fontWeight: '300' }}>Last 24 Hours</Text><br/>
          <Spin indicator={antLoader} style={{ marginTop: 10 }}/>
        </Col>
      </Card>
    )
    if (error) return (
      <Card title={this.renderTitle()} style={{ height: 'calc(100% - 20px)', minWidth: 350 }}>
        <Text>Data failed to load, please reload the page and try again</Text>
      </Card>
    )

    if (!showDC) {
      return (
        <Card title={this.renderTitle()} style={{ height: 'calc(100% - 20px)', minWidth: 350 }}>
          <Col span={12}>
            <Text style={{ fontSize: 16, fontWeight: '300' }}>All Time</Text><br/>
            <Text style={{ fontSize: smallerText ? 32 : 46, color: blueForDeviceStatsLarge, position: 'relative' }}>{device.total_packets}</Text><br/>
            <div style={{ marginBottom: 30 }} />
            <Text style={{ fontSize: 16, fontWeight: '300' }}>Last 30 Days</Text><br/>
            <Text style={{ fontSize: smallerText ? 32 : 46, color: blueForDeviceStatsLarge, position: 'relative' }}>{device_stats.packets_last_30d}</Text><br/>
          </Col>
          <Col span={12}>
            <Text style={{ fontSize: 16, fontWeight: '300' }}>Last 7 Days</Text><br/>
            <Text style={{ fontSize: smallerText ? 32 : 46, color: blueForDeviceStatsLarge, position: 'relative' }}>{device_stats.packets_last_7d}</Text><br/>
            <div style={{ marginBottom: 30 }} />
            <Text style={{ fontSize: 16, fontWeight: '300' }}>Last 24 Hours</Text><br/>
            <Text style={{ fontSize: smallerText ? 32 : 46, color: blueForDeviceStatsLarge, position: 'relative' }}>{device_stats.packets_last_1d}</Text><br/>
          </Col>
        </Card>
      )
    } else {
      return (
        <Card title={this.renderTitle()} style={{ height: 'calc(100% - 20px)', minWidth: 350 }}>
          <Col span={12}>
            <Text style={{ fontSize: 16, fontWeight: '300' }}>All Time</Text><br/>
            <Text style={{ fontSize: smallerText ? 32 : 46, color: blueForDeviceStatsLarge, position: 'relative' }}>{device.dc_usage}</Text><br/>
            <div style={{ marginBottom: 30 }} />
            <Text style={{ fontSize: 16, fontWeight: '300' }}>Last 30 Days</Text><br/>
            <Text style={{ fontSize: smallerText ? 32 : 46, color: blueForDeviceStatsLarge, position: 'relative' }}>-</Text><br/>
          </Col>
          <Col span={12}>
            <Text style={{ fontSize: 16, fontWeight: '300' }}>Last 7 Days</Text><br/>
            <Text style={{ fontSize: smallerText ? 32 : 46, color: blueForDeviceStatsLarge, position: 'relative' }}>-</Text><br/>
            <div style={{ marginBottom: 30 }} />
            <Text style={{ fontSize: 16, fontWeight: '300' }}>Last 24 Hours</Text><br/>
            <Text style={{ fontSize: smallerText ? 32 : 46, color: blueForDeviceStatsLarge, position: 'relative' }}>-</Text><br/>
          </Col>
        </Card>
      )
    }
  }
}

export default DeviceShowStats