import React from 'react'
import {  Icon,  Menu, Sidebar } from 'semantic-ui-react'

class NavSidebar extends React.Component {

  handleSignOut = () => {
    localStorage.clear()
    this.props.history.push('/')
  }

  handleNewDate = () =>{
    this.props.history.push({
    pathname:  '/newdate',
    user_id: this.props.user_id
    })
  }

  render () {
    return (
      <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin'>
      <Menu.Item as='a' onClick={this.handleNewDate}>
      <Icon name='heart' />
      Plan a Date
      </Menu.Item>
      <Menu.Item as='a'>
      <Icon name='heart outline' />
      Edit a Date
      </Menu.Item>
      <Menu.Item as='a'>
      <Icon name='frown' />
      Cancel a Date
      </Menu.Item>
      <Menu.Item as='a'>
      <Icon name='user secret' />
      Edit Profile
      </Menu.Item>
      <Menu.Item as='a' onClick={this.handleSignOut}>
      <Icon name='sign out alternate' />
      Logout
      </Menu.Item>
      </Sidebar>


    )

  }
}
export default NavSidebar