import defaultApi from '../api';
import { Project } from '../types/projects';

export default class ProjectService {
  static async getProjects() {
    const response = await defaultApi.get<Project[]>('/projects');

    return response.data;
  }
}
