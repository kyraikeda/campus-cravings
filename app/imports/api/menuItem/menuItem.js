import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class MenuItemsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'MenuItemsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      type: String,
      vegan: {
        type: String,
        allowedValues: ['yes', 'no',],
        defaultValue: 'no',
      },
      available: {
        type: String,
        allowedValues: ['yes', 'no',],
        defaultValue: 'no',
      },
      restaurant: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    // this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const MenuItems = new MenuItemsCollection();
