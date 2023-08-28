class TodoistProject {
  constructor(
    id,
    name,
    color = '',
    parent_id = '',
    order = 0,
    comment_count = 0,
    is_shared = false,
    is_favorite = false,
    is_inbox_project = false,
    is_team_inbox = false,
    view_style = '',
    url = '',
    sections = [],
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.parent_id = parent_id;
    this.order = order;
    this.comment_count = comment_count;
    this.is_shared = is_shared;
    this.is_favorite = is_favorite;
    this.is_inbox_project = is_inbox_project;
    this.is_team_inbox = is_team_inbox;
    this.view_style = view_style;
    this.url = url;
    this.sections = sections;
  }

  // ============================ METHODS TO CREATE NEW INSTANCES ============================
  // Create a new TodoistProject from a Todoist API response
  static fromAPIResponse(response, index = null) {
    // if index is null, loop over the array of response objects and create a
    // new TodoistProject for each. If index is not null, create a new TodoistProject
    // from the response object at the specified index
    let projectArray;

    if (index === null) {
      const projects = response.map((project) => {
        return new TodoistProject(
          project.id,
          project.name,
          project.color,
          project.parent_id,
          project.order,
          project.comment_count,
          project.is_shared,
          project.is_favorite,
          project.is_inbox_project,
          project.is_team_inbox,
          project.view_style,
          project.url,
        );
      });

      projectArray = projects;
    } else {
      const res = response[index];
      const project = new TodoistProject(
        res.id,
        res.name,
        res.color,
        res.parent_id,
        res.order,
        res.comment_count,
        res.is_shared,
        res.is_favorite,
        res.is_inbox_project,
        res.is_team_inbox,
        res.view_style,
        res.url,
      );

      projectArray = [project];
    }

    return projectArray;
  }

  // Create a new TodoistProject from an object
  static fromObject(object) {
    return new TodoistProject(
      object.id,
      object.name,
      object.color,
      object.parent_id,
      object.order,
      object.comment_count,
      object.is_shared,
      object.is_favorite,
      object.is_inbox_project,
      object.is_team_inbox,
      object.view_style,
      object.url,
    );
  }

  // Create a new TodoistProject directly from json
  static fromJSON(json) {
    return new TodoistProject(
      json.id,
      json.name,
      json.color,
      json.parent_id,
      json.order,
      json.comment_count,
      json.is_shared,
      json.is_favorite,
      json.is_inbox_project,
      json.is_team_inbox,
      json.view_style,
      json.url,
    );
  }

  // Create a new TodoistProject from a Firestore document
  static fromFirestore(doc) {
    return new TodoistProject(
      doc.id,
      doc.data().name,
      doc.data().color,
      doc.data().parent_id,
      doc.data().order,
      doc.data().comment_count,
      doc.data().is_shared,
      doc.data().is_favorite,
      doc.data().is_inbox_project,
      doc.data().is_team_inbox,
      doc.data().view_style,
      doc.data().url,
    );
  }

  // Create a new TodoistProject from a Firestore query snapshot
  static fromFirestoreSnapshot(snapshot) {
    return snapshot.docs.map((doc) => {
      return TodoistProject.fromFirestore(doc);
    });
  }
}

module.exports = TodoistProject;
