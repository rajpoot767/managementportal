
// getAllActiveMatches and getAllCloseMatches and getMatchById

interface MatchData {
  matchId: number;
  matchTypeId: number;
  styxSportsMatchId?: string | null;
  providerCode?: string | null;
  providerMatchId?: string | null;
  matchName?: string | null;
  teamAtitle?: string | null;
  isClosed: boolean;
  teamBtitle?: string | null;
  createdDate: Date;
  createdBy: number;
  modifiedDate?: Date | null;
  modifiedBy?: number | null;
  matchType: MatchTypeData;
  matchQuestions: MatchQuestionData[];
}

interface MatchQuestionData {
  matchQuestionId: number;
  matchId: number;
  questionText: string;
  categoryId: number;
  value1?: string | null;
  value2?: string | null;
  isActive: boolean;
  isDeleted: boolean;
}



// AddMatches

interface CreateMatchFromPredictionTemplateRequest {
  styxSportsMatchId?: string | null;
  predictionTemplateId: number;
  teamAtitle: string;
  teamBtitle: string;
  providerMatchId?: string | null;
}

interface CreateMatchFromPredictionTemplateResult {
  matchId: number;
}

// getCommentaryById

interface CommentaryMatchData {
  matchName?: string | null;
  matchTypeTitle?: string | null;
  commentaries: CommentaryData[];
}

interface CommentaryData {
  commentaryId: number;
  commentaryText?: string | null;
  modifiedDate?: Date | null;
}
// toggleMatchStatus

interface ToggleMatchStatusRequest {
  matchId: number;
}

interface ToggleMatchStatusResult {
  isClosed: boolean;
}

// addOrUpdateCommentaries

interface UpdateCommentaryRequest {
  matchId: number;
  matchCommentaries: CommentaryData[];
}

interface UpdateCommentariesResult {
  matchId: number;
}

// updateMatchQuestion

interface UpdateMatchQuestionsRequest {
  matchId: number;
  styxSportsMatchId?: string;
  providerMatchId?: string;
  matchQuestions: MatchQuestionData[];
}


interface UpdateMatchQuestionsResult {
  matchData?: MatchData | null;
}





































// interface CommentaryDataById{
//   commentaryId: number;         // Represents the ID of the commentary
//   commentaryText?: string;      // Optional field for the commentary text
//   modifiedDate?: Date;  
// }



  
//   interface MatchResultData {
//     matchId: number;
//     matchTypeId: number;
//     //predictionTemplateId: number;
//     styxSportsMatchId: string;
//     providerCode: string;
//     providerMatchId: string;
//     isClosed:boolean;
//     teamAtitle: string;
//     teamBtitle: string;
//     matchType: MatchType;
//     matchQuestions: any[];
//     commentaries:any[];
//   }
//   interface MatchType {
//     matchTypeId: number;
//     matchTypeTitle: string;
//   }

//   //add interface 

//   interface AddMatchRequest {
//     styxSportsMatchId: string;
//     //predictionTemplateId: number;
//     teamAtitle: string;
//     teamBtitle: string;
//     //providerCode: string;
//     providerMatchId: string;
//   }

//   interface AddMatchResult{
//     MatchId:number
//   }

//   interface UpdateMatchRequest {
//     styxSportsMatchId: string;
//     //predictionTemplateId: number;
//     teamAtitle: string;
//     teamBtitle: string;
//     providerCode: string;
//     providerMatchId: string;
//   }

//   interface UpdateMatchResult{
//     MatchId:number
//   }

//   interface MatchQuestionDataRequest {
//     matchQuestionId: number;
//     matchId: number;
//     questionText: string;
//     categoryId: number;
//     value1: string;
//     value2: string;
//     isActive: boolean;
//   }


//   // interface MatchQuestionData {
//   //   matchQuestionId: number;
//   //   matchId: number;
//   //   questionText: string;
//   //   categoryId: number;
//   //   value1?: string;
//   //   value2?: string;
//   //   isActive: boolean;
//   //   isDeleted: boolean;
//   // }
  
  

  
//   interface MatchDataResult {
//     matchId: number;
//     matchQuestionsData: MatchQuestionDataRequest[];
//   }
  


   
//   //  interface CommentaryData {
//   //   commentaryId: number;
//   //   commentaryText?: string;
//   // }