import { createSlug } from "./PathUtility";

class RouteBuilder {

  constructor() {
  }


  public createSignInLink(countryCode: any, returnUrl?:string): string {

    let url =  `/auth/signin/${countryCode}/`;
    if(returnUrl)
    {
      url= url + "?returnUrl=" + returnUrl
    }
    return url;
  
  }
  public createPasswordLink(transactionIdentifier: string, returnUrl?: string | null): string {
    let url = `/auth/otp/${transactionIdentifier}`;
    if (returnUrl) {
      url = url + "?returnUrl=" + returnUrl
    }
    return url;
  }
  public createRegisterByInvitePasswordLink(transactionIdentifier: string, returnUrl?: string | null): string {
    let url = `/auth/register/${transactionIdentifier}`;
    if (returnUrl) {
      url = url + "?returnUrl=" + returnUrl
    }
    return url;

   
  }
  public createStreamingPageLink(tourName: string, teamNames: string, matchId: string): string {
    let url = `live-stream/${tourName}/${teamNames}/${matchId}`;

    return url;
  }

  public createScheduleByTourIdPageLink(tourId: string, date: string): string {
    let url = `schedule/${tourId}/${date}/1`;

    return url;
  }

  public fetchBannerFromBlobStorage(tourId: string): string {
    let url = `https://styxsportscdn.azureedge.net/styxsports-public/toursbanners/${tourId}.webp`

    return url;
  }

  

  public streamingPageLink()
  {
    //cricket/series/live-stream/csa-four-day-series-division-two-2024-25-eastern-storm-vs-mpumalanga-rhinos-cricket/671b95e63cea6bb9b2cb5ab0
  }


  public createMatchHighlightsDetailPageLink(group_name:string, video_group_id:string, name:string, id:string):string{

    // /cricket/series/{group_name}/{video_group_id}/
    // /{Joburg Bangla Tigers V/S Cape Town Samp Army}
    // /match-highlights/
    // {id}

    let url = `/cricket/series/match-highlights/${createSlug(group_name)}/${video_group_id}/${createSlug(name)}/${id}`;

    return url;
  }


  public createPredictionTemplateEditLink(predictionTemplateId:number)
  {
    let url = `/dashboard/templates/edit/${predictionTemplateId}`;

    return url;
  }
  public returnToAllMatches()
  {
    let url = '/dashboard/matches';

    return url;
  }
 
}
export default new RouteBuilder