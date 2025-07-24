// Generated TypeScript code from OpenAPI Specification

import ServiceClient from "./ServiceClient";
import { DepartmentApiResponse, Department } from "./DepartmentModel";

class DepartmentService {
  baseUrl: string;
  session?: Session;
  constructor(session?: Session) {
    this.baseUrl = "http://localhost:5150/"
    this.session = session;
  }

  async getAllDepartments(): Promise<DepartmentApiResponse> {
    const client = new ServiceClient(this.baseUrl, this.session);
    return await client.get("api/v1.0/department/getAllDepartments?api-version=1.0");
  }

  async createDepartment(department: Partial<Department>): Promise<DepartmentApiResponse> {
    const client = new ServiceClient(this.baseUrl, this.session);
    const response = await client.post("api/v1.0/department/createDepartment?api-version=1.0", department);
    return {
      ...response,
      count: null,
      errorNumber: typeof response.errorNumber === 'string' ? parseInt(response.errorNumber) : 0
    } as unknown as DepartmentApiResponse;
  }

  async getDepartmentById(id: number): Promise<DepartmentApiResponse> {
    const client = new ServiceClient(this.baseUrl, this.session);
    return await client.get(`api/v1.0/department/getDepartmentsById${id}?api-version=1.0`);
  }

  async updateDepartment(id: number, department: Partial<Department>): Promise<DepartmentApiResponse> {
    const client = new ServiceClient(this.baseUrl, this.session);
    const response = await client.post(`api/v1.0/department/updateDepartmentById${id}?api-version=1.0`, department);
    return {
      ...response,
      count: null,
      errorNumber: typeof response.errorNumber === 'string' ? parseInt(response.errorNumber) : 0
    } as unknown as DepartmentApiResponse;
  }

  async toggleDepartmentStatus(id: number): Promise<DepartmentApiResponse> {
    const client = new ServiceClient(this.baseUrl, this.session);
    const response = await client.get(`api/v1.0/department/toggleDepartmentStatusById/${id}?api-version=1.0`);
    return {
      ...response,
      count: null,
      errorNumber: typeof response.errorNumber === 'string' ? parseInt(response.errorNumber) : 0
    } as unknown as DepartmentApiResponse;
  }
}

export default DepartmentService;
