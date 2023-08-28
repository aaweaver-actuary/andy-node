class TodoistSection {
  constructor(id, project_id = '', order = 0, name = '', items = []) {
    this.id = id;
    this.project_id = project_id;
    this.order = order;
    this.name = name;
    this.items = items;
  }

  // ============================ METHODS TO CREATE NEW INSTANCES ============================
  // Create a new TodoistSection from a Todoist API response
  static fromAPIResponse(response, index = null) {
    // if index is null, loop over the array of response objects and create a
    // new TodoistSection for each. If index is not null, create a new TodoistSection
    // from the response object at the specified index
    let sectionArray;

    if (index === null) {
      const sections = response.map((section) => {
        return new TodoistSection(
          section.id,
          section.project_id,
          section.order,
          section.name,
        );
      });

      sectionArray = sections;
    } else {
      const res = response[index];

      sectionArray = new TodoistSection(
        res.id,
        res.project_id,
        res.order,
        res.name,
      );
    }

    return sectionArray;
  }

  // Create a new TodoistSection from a TodoistItem
  static fromTodoistItem({ ...params }) {
    return new TodoistSection(
      params.section_id,
      params.project_id,
      params.child_order,
      params.section_name,
      params.items,
    );
  }

  // Create a new TodoistSection from a Firebase document
  static fromFirebaseDoc(doc) {
    return new TodoistSection(
      doc.id,
      doc.data().project_id,
      doc.data().order,
      doc.data().name,
    );
  }

  // Create a new TodoistSection from a Firebase query snapshot
  static fromFirebaseSnapshot(snapshot) {
    const sections = [];

    snapshot.forEach((doc) => {
      sections.push(TodoistSection.fromFirebaseDoc(doc));
    });

    return sections;
  }

  // Create a new TodoistSection from an object
  static fromObject({ ...params }) {
    return new TodoistSection(
      params.id,
      params.project_id,
      params.order,
      params.name,
    );
  }

  // Create a new TodoistSection from a JSON string
  static fromJSON(json) {
    return TodoistSection.fromObject(JSON.parse(json));
  }
}
