import fetchFromAPI from "./ApiService";

export const RoleService = {
    async getRoles(): Promise<any> {
        return fetchFromAPI("roles");
    },
    async addRole(roleData: any): Promise<any> {
        return fetchFromAPI("roles", "POST", roleData);
    },
    async updateRole(roleId: string, roleData: any): Promise<any> {
        return fetchFromAPI(`roles/${roleId}`, "PUT", roleData);
    },
    async deleteRole(roleId: string): Promise<any> {
        return fetchFromAPI(`roles/${roleId}`, "DELETE");
    }
};
