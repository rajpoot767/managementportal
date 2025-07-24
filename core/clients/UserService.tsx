import ServiceClient from "./ServiceClient";
import { UserApiResponse, User } from "./UserModel";

class UserService {
  baseUrl: string;
  session?: Session;
  constructor(session?: Session) {
    this.baseUrl = "http://localhost:5150/"
    this.session = session;
  }

  async getAllUsers(): Promise<UserApiResponse> {
    const client = new ServiceClient(this.baseUrl, this.session);
    return await client.get("api/v1.0/user/getAllUsers?api-version=1.0");
  }

  async createUser(user: Partial<User>): Promise<UserApiResponse> {
    const client = new ServiceClient(this.baseUrl, this.session);
    const response = await client.post("api/v1.0/user/createUser?api-version=1.0", user);
    return {
      ...response,
      count: null,
      errorNumber: typeof response.errorNumber === 'string' ? parseInt(response.errorNumber) : 0
    } as unknown as UserApiResponse;
  }

  async getUserById(id: number): Promise<UserApiResponse> {
    const client = new ServiceClient(this.baseUrl, this.session);
    return await client.get(`api/v1.0/user/getUserById/${id}?api-version=1.0`);
  }

  async updateUser(id: number, user: Partial<User>): Promise<UserApiResponse> {
    const client = new ServiceClient(this.baseUrl, this.session);
    const response = await client.post(`api/v1.0/user/updateUserById/${id}?api-version=1.0`, user);
    return {
      ...response,
      count: null,
      errorNumber: typeof response.errorNumber === 'string' ? parseInt(response.errorNumber) : 0
    } as unknown as UserApiResponse;
  }

  async toggleUserStatus(id: number): Promise<UserApiResponse> {
    const client = new ServiceClient(this.baseUrl, this.session);
    const response = await client.get(`api/v1.0/user/toggleUserStatusById/${id}?api-version=1.0`);
    return {
      ...response,
      count: null,
      errorNumber: typeof response.errorNumber === 'string' ? parseInt(response.errorNumber) : 0
    } as unknown as UserApiResponse;
  }
}

export default UserService; 