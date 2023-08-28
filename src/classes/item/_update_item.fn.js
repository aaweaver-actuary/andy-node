// Update an item - takes an object with the properties to update and formats the
// request body for the Todoist API
const _update_item = (properties) => {
  // Exit if no properties are provided
  if (!properties) return;

  // Exit if properties is not an object
  if (typeof properties !== 'object') return;

  // Exit if an id is not provided
  if (!properties.id) return;

  // Create the request body
  let requestBody = {
    id: properties.id,
  };

  // Add the properties to update to the request body
  // Before adding, check that the property exists on the TodoistItem
  // Do not add properties that are not valid TodoistItem properties
  for (const [key, value] of Object.entries(properties)) {
    if (this.hasOwnProperty(key)) {
      requestBody[key] = value;

      // If the property is the due date, check that it is a valid date
      if (key === 'due') {
        if (!Date.parse(value)) {
          throw new Error(`Invalid date for due date: ${value}`);
        }
      } else if (key === 'labels') {
        // If the property is labels, check that it is an array
        if (!Array.isArray(value)) {
          throw new Error(`Invalid labels: ${value}`);
        }
      } else if (key === 'priority') {
        // If the property is priority, check that it is a number
        if (typeof value !== 'number') {
          throw new Error(
            `Invalid priority: ${value} must be an integer between 1 and 4`,
          );
        }
        // check that it is an integer from 1 to 4
        if (value < 1 || value > 4) {
          throw new Error(
            `Invalid priority: ${value} must be an integer between 1 and 4`,
          );
        }
      } else if (key === 'child_order') {
        // If the property is child_order, check that it is a number
        if (typeof value !== 'number') {
          throw new Error(`Invalid child_order: ${value} must be an integer`);
        }
      } else if (key === 'day_order') {
        // If the property is day_order, check that it is a number
        if (typeof value !== 'number') {
          throw new Error(`Invalid day_order: ${value} must be an integer`);
        }
      } else if (key === 'collapsed') {
        // If the property is collapsed, check that it is a boolean
        if (typeof value !== 'boolean') {
          throw new Error(`Invalid collapsed: ${value} must be a boolean`);
        }
      } else if (key === 'checked') {
        // If the property is checked, check that it is a boolean
        if (typeof value !== 'boolean') {
          throw new Error(`Invalid checked: ${value} must be a boolean`);
        }
      } else if (key === 'is_deleted') {
        // If the property is is_deleted, check that it is a boolean
        if (typeof value !== 'boolean') {
          throw new Error(`Invalid is_deleted: ${value} must be a boolean`);
        }
      } else if (key === 'duration') {
        // If the property is duration, check that it is an object
        if (typeof value !== 'object') {
          throw new Error(`Invalid duration: ${value} must be an object`);
        }
      } else if (key === 'added_at') {
        // If the property is added_at, check that it is a valid date
        if (!Date.parse(value)) {
          throw new Error(`Invalid date for added_at: ${value}`);
        }
      } else if (key === 'completed_at') {
        // If the property is completed_at, check that it is a valid date
        if (!Date.parse(value)) {
          throw new Error(`Invalid date for completed_at: ${value}`);
        }
      } else if (key === 'description') {
        // If the property is description, check that it is a string
        if (typeof value !== 'string') {
          throw new Error(`Invalid description: ${value} must be a string`);
        }
      } else if (key === 'content') {
        // If the property is content, check that it is a string
        if (typeof value !== 'string') {
          throw new Error(`Invalid content: ${value} must be a string`);
        }
      } else if (key === 'project_id') {
        // If the property is project_id, check that it is a string
        if (typeof value !== 'string') {
          throw new Error(`Invalid project_id: ${value} must be a string`);
        }
      } else if (key === 'section_id') {
        // If the property is section_id, check that it is a string
        if (typeof value !== 'string') {
          throw new Error(`Invalid section_id: ${value} must be a string`);
        }
      } else if (key === 'parent_id') {
        // If the property is parent_id, check that it is a string
        if (typeof value !== 'string') {
          throw new Error(`Invalid parent_id: ${value} must be a string`);
        }
      } else if (key === 'user_id') {
        // If the property is user_id, check that it is a string
        if (typeof value !== 'string') {
          throw new Error(`Invalid user_id: ${value} must be a string`);
        }
      } else if (key === 'added_by_uid') {
        // If the property is added_by_uid, check that it is a string
        if (typeof value !== 'string') {
          throw new Error(`Invalid added_by_uid: ${value} must be a string`);
        }
      } else if (key === 'assigned_by_uid') {
        // If the property is assigned_by_uid, check that it is a string
        if (typeof value !== 'string') {
          throw new Error(`Invalid assigned_by_uid: ${value} must be a string`);
        }
      } else if (key === 'responsible_uid') {
        // If the property is responsible_uid, check that it is a string
        if (typeof value !== 'string') {
          throw new Error(`Invalid responsible_uid: ${value} must be a string`);
        }
      } else if (key === 'sync_id') {
        // If the property is sync_id, check that it is a string
        if (typeof value !== 'string') {
          throw new Error(`Invalid sync_id: ${value} must be a string`);
        }
      } else {
        // Throw an error if the property is not a valid TodoistItem property
        throw new Error(`Invalid property: ${key}`);
      }
    }
  }
  return requestBody;
};

module.exports = _update_item;
