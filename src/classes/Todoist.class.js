const TODOIST_API_TOKEN = '6fb9763d581570aeeaab7258c7c06f52ab55ebe4';
const TODOIST_API_BASE_URL = 'https://api.todoist.com/sync/v9/sync';

const { TodoistApi } = require('@doist/todoist-api-typescript');

const TodoistItem = require('./TodoistItem.class');
const TodoistProject = require('./TodoistProject.class.js');
const TodoistSection = require('./TodoistSection.class');

const api = new TodoistApi(token);

class Todoist {
  constructor(token) {
    this.token = token;
    this.api = new TodoistApi(token);
    this.projects = [];
    this.items = [];
  }

  addProject(project = new TodoistProject()) {
    this.projects.push(project);
  }
}
const getProjects = async () => {
  try {
    const projects = await api.getProjects();
    return projects;
  } catch (err) {
    console.error('Error:', err);
  }
};

const getItems = async () => {
  try {
    const items = await api.getItems();
    return items;
  } catch (err) {
    console.error('Error:', err);
  }
};
