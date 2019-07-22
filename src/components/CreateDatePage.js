import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class NewDate extends React.Component  {
  render(){
    return(
      <Form>
      <Form.Field>
      <label>Date</label>
      <input type='date' />
      </Form.Field>
      <Form.Field>
      <label>Time</label>
      <input type='time' />
      </Form.Field>
      <Form.Field>
      <label>Do you Need a Babysitter?</label>
      <Checkbox label='Yes' />
      <Checkbox label='No' />
      </Form.Field>
      <Form.Field>
      <label>Select a Date Type</label>
      <select>
      <option value="Select">Please Pick a Type</option>
      </select>
      </Form.Field>
      <Form.Field>
      <label>Select Attire Needed For Date</label>
      <select>
      <option value="Select">Please Pick a Type</option>
      </select>
      </Form.Field>
      <Form.Field>
      <label>Is this Date a surprise?</label>
      <Checkbox label='Yes' />
      <Checkbox label='No' />
      </Form.Field>
      <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default NewDate
