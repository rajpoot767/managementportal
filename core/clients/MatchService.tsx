// Generated TypeScript code from OpenAPI Specification

import ServiceClient from "./ServiceClient";


class MatchService {
    baseUrl: string;
    session?: Session;
    constructor(session?: Session) {
        // this.baseUrl = process.env.NEXT_PUBLIC_APIGATEWAY_URL || "";//"https://devstyxsportsapigateway.azurewebsites.net";
        this.baseUrl = "http://localhost:5000"
        this.session = session;
    }
    async getAllActiveMatches(odataQuery?: string): Promise<QueryResponse<MatchData>> {
        const pathParams: { [key: string]: any } = {};

        const client = new ServiceClient(this.baseUrl, this.session);

        return await client.get("/prediction-management/api/Matches/getAllActiveMatches?" + odataQuery, pathParams);
    }
    async getAllClosedMatches(odataQuery?: string): Promise<QueryResponse<MatchData>> {
        const pathParams: { [key: string]: any } = {};

        const client = new ServiceClient(this.baseUrl, this.session);

        return await client.get("/prediction-management/api/Matches/getAllClosedMatches?" + odataQuery, pathParams);
    }

    async createMatchFromPredictionTemplate(request: CreateMatchFromPredictionTemplateRequest): Promise<ActionResponse<CreateMatchFromPredictionTemplateResult>> {
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.post("/prediction-management/api/Matches/createMatchFromPredictionTemplate", request);
    }
    async getMatchById(matchId: number): Promise<SingleResponse<MatchData>> {
        const pathParams: { [key: string]: any } = {};
        pathParams["matchId"] = matchId
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.getSingle("/prediction-management/api/Matches/getMatchById/{matchId}", pathParams);
    }
    async getCommentaryByMatchId(matchId: number): Promise<SingleResponse<CommentaryMatchData>> {
        const pathParams: { [key: string]: any } = {};
        pathParams["matchId"] = matchId
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.getSingle("/prediction-management/api/Matches/getCommentryByMatchId/{matchId}", pathParams);
    }

    async toggleMatchStatus(request: ToggleMatchStatusRequest): Promise<ActionResponse<ToggleMatchStatusResult>> {

        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.post("/prediction-management/api/matches/togglematchstatus", request);
    }
    async addOrUpdateCommentaries(request: UpdateCommentaryRequest): Promise<ActionResponse<UpdateCommentariesResult>> {

        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.post("/prediction-management/api/Matches/addOrUpdateCommentaries", request);
    }


    async updateMatchQuestion(request: UpdateMatchQuestionsRequest): Promise<ActionResponse<UpdateMatchQuestionsResult>> {
        const client = new ServiceClient(this.baseUrl, this.session);
        return await client.post("/prediction-management/api/Matches/updateMatchQuestions", request);
    }



}
export default MatchService;
