// Generated TypeScript code from OpenAPI Specification

import ServiceClient from "./ServiceClient";

class TemplateService {
    baseUrl: string;
    session?: Session;
    constructor(session?: Session) {
        // this.baseUrl = process.env.NEXT_PUBLIC_APIGATEWAY_URL || "";//"https://devstyxsportsapigateway.azurewebsites.net";
        this.baseUrl = "http://localhost:5000"
        this.session = session;
    }
    async getAllPredictionTemplates(odataQuery?: string): Promise<QueryResponse<PredictionTemplateData>> {
        const pathParams: { [key: string]: any } = {};
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.get("/prediction-management/api/PredictionTemplates/getAllPredictionTemplates?" + odataQuery, pathParams);
    }


    async addPredictionTemplate(request: AddPredictionTemplateRequest): Promise<ActionResponse<AddPredictionTemplateResult>> {
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.post("/prediction-management/api/PredictionTemplates/addPredictionTemplate", request);
    }


    async updatePredictionTemplate(request: UpdatePredictionTemplateRequest): Promise<ActionResponse<UpdatePredictionTemplateResult>> {
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.post("/prediction-management/api/PredictionTemplates/updatePredictionTemplate", request);
    }

    async deletePredictionTemplate(request: DeletePredictionTemplateRequest): Promise<ActionResponse<DeletePredictionTemplateResult>> {
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.post("/prediction-management/api/PredictionTemplates/deletePredictionTemplate", request);
    }


    async getPredictionTemplateById(predictionTemplateId: number): Promise<SingleResponse<PredictionTemplateData>> {
        const pathParams: { [key: string]: any } = {};
        pathParams["predictionTemplateId"] = predictionTemplateId
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.getSingle("/prediction-management/api/PredictionTemplates/getPredictionTemplateById/{predictionTemplateId}", pathParams);
    }




    async getAllMatchType(odataQuery?: string): Promise<QueryResponse<MatchTypeData>> {
        const pathParams: { [key: string]: any } = {};
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.get("/prediction-management/api/MatchTypes/getAllMatchType?" + odataQuery, pathParams);
    }

    async getAllCategories(odataQuery?: string): Promise<QueryResponse<CategoryData>> {
        const pathParams: { [key: string]: any } = {};
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.get("/prediction-management/api/Categories/getAllCategories?" + odataQuery, pathParams);
    }
}
export default TemplateService;


