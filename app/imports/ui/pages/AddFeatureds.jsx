import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Featureds } from '../../api/featured/Featured';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  place: String,
  image: String,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddFeatureds extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, place, image, description } = data;
    const owner = Meteor.user().username;
    Featureds.collection.insert({ name, place, image, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered id="add-featured-page">
          <Grid.Column>
            <Header as="h2" textAlign="center">Promote A Dish Or Drink</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField id="restaurant-field-name" name='name'/>
                <TextField id="restaurant-field-place" name='place'/>
                <TextField id="restaurant-field-image" name='image'/>
                <LongTextField id="restaurant-field-description" name='description'/>
                <SubmitField id="restaurant-field-submit" value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddFeatureds;