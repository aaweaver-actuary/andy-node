// This module contains the TodoistItem class, which is used to represent a Todoist item.
// The class is a container for the data that is returned from the Todoist API, and is
// not intended to be used outside of a bigger application that works with Todoist data.
const axios = require('axios');

const Due = require('./Due.class');

const _update_item = require('./_update_item.fn');

class TodoistItem {
  constructor(
    id,
    user_id,
    project_id,
    content,
    description = '',
    due = Due.fromString(`${Date.now()}`),
    priority = 1,
    parent_id = '',
    child_order = 0,
    section_id = '',
    day_order = 0,
    collapsed = false,
    labels = [],
    added_by_uid = '',
    assigned_by_uid = '',
    responsible_uid = '',
    checked = false,
    is_deleted = false,
    sync_id = '',
    completed_at = '',
    added_at = '',
    duration = {},
  ) {
    this.id = id;
    this.user_id = user_id;
    this.project_id = project_id;
    this.content = content;
    this.description = description;
    this.due = due;
    this.priority = priority;
    this.parent_id = parent_id;
    this.child_order = child_order;
    this.section_id = section_id;
    this.day_order = day_order;
    this.collapsed = collapsed;
    this.labels = labels;
    this.added_by_uid = added_by_uid;
    this.assigned_by_uid = assigned_by_uid;
    this.responsible_uid = responsible_uid;
    this.checked = checked;
    this.is_deleted = is_deleted;
    this.sync_id = sync_id;
    this.completed_at = completed_at;
    this.added_at = added_at;
    this.duration = duration;
  }

  // ============================ METHODS TO CREATE NEW INSTANCES ============================
  // Create a new TodoistItem from a Todoist API response
  static fromAPIResponse(response) {
    return new TodoistItem(
      response.id,
      response.user_id,
      response.project_id,
      response.content,
      response.description,
      response.due,
      response.priority,
      response.parent_id,
      response.child_order,
      response.section_id,
      response.day_order,
      response.collapsed,
      response.labels,
      response.added_by_uid,
      response.assigned_by_uid,
      response.responsible_uid,
      response.checked,
      response.is_deleted,
      response.sync_id,
      response.completed_at,
      response.added_at,
      response.duration,
    );
  }

  // Create a new TodoistItem from an object
  static fromObject(obj) {
    return new TodoistItem(
      obj.id,
      obj.user_id,
      obj.project_id,
      obj.content,
      obj.description,
      obj.due,
      obj.priority,
      obj.parent_id,
      obj.child_order,
      obj.section_id,
      obj.day_order,
      obj.collapsed,
      obj.labels,
      obj.added_by_uid,
      obj.assigned_by_uid,
      obj.responsible_uid,
      obj.checked,
      obj.is_deleted,
      obj.sync_id,
      obj.completed_at,
      obj.added_at,
      obj.duration,
    );
  }

  // Create a new TodoistItem from a JSON string
  static fromJSON(json) {
    return TodoistItem.fromObject(JSON.parse(json));
  }

  // Create a new TodoistItem from a Firestore document
  static fromFirestore(doc) {
    return TodoistItem.fromObject(doc.data());
  }

  // Create a new TodoistItem from a Firestore query snapshot
  static fromQuerySnapshot(snapshot) {
    return snapshot.docs.map((doc) => TodoistItem.fromFirestore(doc));
  }

  // ============================ METHODS TO PREPARE TODOIST API CALLS ==================

  // GET api request using axios to todoist
  async _get_request(enpoint, payload = {}) {
    const res = await axios
      .get(enpoint, payload)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    return res;
  }

  // POST api request using axios to todoist
  async _post_request(enpoint, payload = {}) {
    const res = await axios
      .post(enpoint, payload)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    return res;
  }

  // update an item
  update(properties) {
    const request = _update_item(properties);
    return this._post_request(TODOIST_API_BASE_URL, request);
  }

  // move
}

module.exports = TodoistItem;
