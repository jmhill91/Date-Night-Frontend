import React from 'react'
import {  Icon,  Menu, Sidebar, Button, Header, Modal } from 'semantic-ui-react'

class NavSidebar extends React.Component {

  state = {
    open: false ,
    edit: false,
    cancel: false,
    selectedDate: 0
  }

  showEdit = dimmer => () => this.setState({ dimmer, open: true, edit: true })
  showCancel = dimmer => () => this.setState({ dimmer, open: true, cancel: true })
  close = () => this.setState({ open: false, edit: false, cancel: false })

  handleSignOut = () => {
    localStorage.clear()
    this.props.history.push('/')
  }

  handleNewDate = () =>{
    this.props.history.push({
    pathname:  '/newdate',
    user_id: this.props.user_id,
    soPhone: this.props.soPhone.replace(/-/g, ""),
    name: this.props.usersName
    })
  }

  handleEditProfile = () => {
    this.props.history.push({
      pathname: '/edit-profile',
      name: this.props.usersName,
      phone: this.props.phone,
      soPhone: this.props.soPhone,
      email: this.props.email,
      userId: this.props.user_id
  })
  }

  handleCancel = (e) => {
    this.props.cancelDate(e,this.state.selectedDate)
    this.close()
  }

  handleDateSelect = (e) => {
    this.setState({selectedDate: e.target.value})
  }

  handleEditDate = (e) => {
     this.props.history.push({
      pathname: '/editdate',
      rendezvou_id: this.state.selectedDate,
      soPhone: this.props.soPhone.replace(/-/g, "")
     })
  }

  render () {
    let mod;
    let opt;
    const { open, dimmer } = this.state
    if (this.state.edit === true) {
      opt = this.props.dates.map(rendezvous =>{
       let outing=  this.props.dateTypes.find(dt => dt.id === rendezvous.rendezvous_type_id)
     return  <option value={rendezvous.id} >{outing.name}</option>})
    mod = (  <Modal dimmer={dimmer} open={open} onClose={this.close}>
      <Modal.Header>Pick A Date To Edit</Modal.Header>
      <Modal.Content >
      <Modal.Description>
      <Header>Select Date From Below</Header>
      <select onChange={this.handleDateSelect}>
      <option value="Select">Please Pick a Date to Edit</option>
      {opt}
      </select>
      </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Button color='black' onClick={this.close}>
      Never Mind
      </Button>
      <Button
      positive
      icon='edit outline'
      labelPosition='right'
      content="Selected Date"
      onClick={this.handleEditDate}
      />
      </Modal.Actions>
      </Modal> )
    } else if (this.state.cancel === true) {
      opt = this.props.dates.map(rendezvous =>{
       let outing=  this.props.dateTypes.find(dt => dt.id === rendezvous.rendezvous_type_id)
     return  <option value={rendezvous.id}>{outing.name}</option>})
    mod = (  <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Pick A Date To Cancel</Modal.Header>
          <Modal.Content >
            <Modal.Description>
              <Header>Select Date From Below</Header>
               <select onChange={this.handleDateSelect}>
                 <option value="Select">Please Pick a Date to Cancel</option>
                 {opt}
              </select>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Never Mind
            </Button>
            <Button
              positive
              icon='meh outline'
              labelPosition='right'
              content="Selected Date"
              onClick={this.handleCancel}
            />
          </Modal.Actions>
        </Modal> )
    }

    return (
      <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin'>
      <Menu.Item as='a' onClick={this.handleNewDate}>
      <Icon name='heart' />
      Plan a Date
      </Menu.Item>
      <Menu.Item as='a' onClick={this.showEdit('blurring')}>
      <Icon name='heart outline' />
      Edit a Date
      </Menu.Item>
      <Menu.Item as='a'onClick={this.showCancel('blurring')}>
      <Icon name='frown' />
      Cancel a Date
      </Menu.Item>
      <Menu.Item as='a' onClick={this.handleEditProfile}>
      <Icon name='user secret' />
      Edit Profile
      </Menu.Item>
      <Menu.Item as='a' onClick={this.handleSignOut}>
      <Icon name='sign out alternate' />
      Logout
      </Menu.Item>
      {mod}
      </Sidebar>


    )

  }
}
export default NavSidebar
