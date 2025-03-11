// Generated TypeScript code from OpenAPI Specification

import ServiceClient from "./ServiceClient";

class LeadService {
    baseUrl: string;
    session?: Session;
    constructor(session?: Session) {
        // this.baseUrl = process.env.NEXT_PUBLIC_APIGATEWAY_URL || "";//"https://prodapigatewaystyxsports.azurewebsites.net";
        this.baseUrl = "http://localhost:5000"
        this.session = session;
    }

    //leads

    async getAllLeads(odataQuery?: string): Promise<QueryResponse<Lead>> {
        const pathParams: { [key: string]: any } = {};
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.get("/authv2/api/Lead/getAllLeads?" + odataQuery, pathParams);
    }

    async getLeadbyId(leadId: number): Promise<SingleResponse<Lead>> {
        const pathParams: { [key: string]: any } = {};
        pathParams["leadId"] = leadId
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.getSingle("/authv2/api/Lead/getLeadbyId/{leadId}", pathParams);
    }

    async updateLeadComment(request: UpdateCommentRequest): Promise<ActionResponse<UpdateCommentResult>> {

        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.post("/authv2/api/Lead/updateLeadComment", request);
    }

    async toggleLeadStatus(request: ToggleLeadStatusRequest): Promise<ActionResponse<ToggleLeadStatusResult>> {

        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.post("/authv2/api/Lead/toggleLeadStatus", request);
    }



}
export default LeadService;
