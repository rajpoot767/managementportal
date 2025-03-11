// Generated TypeScript code from OpenAPI Specification


import NodeServiceClient from "./NodeServiceClient";


class LiveStreamingService {

  session?: Session;
  constructor(session?: Session) {
    this.session = session;
  }
  async getLiveStreamingMatches(request: StreamRequest): Promise<StreamResponse> {
    // console.log(request)
    const client = new NodeServiceClient(this.session);
    return await client.post("/web/api/get_live_stream", request);
  }

  
}
export default LiveStreamingService;
