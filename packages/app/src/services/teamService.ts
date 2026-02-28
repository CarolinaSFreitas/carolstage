import { createApiRef, DiscoveryApi, FetchApi } from "@backstage/core-plugin-api";

export interface TeamResponse {
    teams: string[];
}

export interface TeamAPI {
    getAll: () => Promise<TeamResponse>;
}

export const teamApiRef = createApiRef<TeamAPI>({
    id: 'plugin.team.service'
})

export const createTeamApi = (discoveryApi: DiscoveryApi, fetchApi: FetchApi) => ({
    async getAll(): Promise<TeamResponse> {
        const proxyUri = await discoveryApi.getBaseUrl('proxy');
        const response = await fetchApi.fetch(`${proxyUri}/teams`);
        if (!response.ok) {
            throw new Error(`Erro no fetch da API: ${response.statusText}`);
        }
        return response.json() as Promise<TeamResponse>;
    }
});