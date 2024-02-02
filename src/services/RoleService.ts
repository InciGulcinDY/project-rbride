import axios from 'axios';
import { RoleModel } from '../models/response/RoleModel';

const API_URL = "http://localhost:8080/api/roles"

class RoleService {
    getAllRoles():Promise<RoleModel[]> {
        return axios.get(`${API_URL}/getAll`).then(response => response.data);
    }
}

export default new RoleService();