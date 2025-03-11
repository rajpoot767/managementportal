// Generated TypeScript code from OpenAPI Specification


import NodeServiceClient from "./NodeServiceClient";

class LiveScoreService {

  session?: Session;
  constructor(session?: Session) {
    this.session = session;
  }

  
  async getLiveScore(): Promise<LiveScoreResult> {
    const client = new NodeServiceClient(this.session);
    return await client.get("/score/api/live_score");
  }

}
export default LiveScoreService;
