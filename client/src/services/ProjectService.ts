import defaultApi from '../api';
import { Project } from '../types/projects';

export default class ProjectService {
  static async getProjects() {
    return defaultApi.get<Project>('/projects');
  }
}
