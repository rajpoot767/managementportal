// getAllPredictionTemplates
interface PredictionTemplateData {
  predictionTemplateId: number;
  templateTitle: string;
  matchTypeId: number;
  createdDate: Date;
  createdBy: number;
  modifiedDate?: Date | null;
  modifiedBy?: number | null;
  predictionTemplateQuestions: PredictionTemplateQuestionData[];
  matchType: MatchTypeData;
}

interface PredictionTemplateQuestionData {
  predictionTemplateQuestionId: number;
  questionText: string;
  categoryId: number;
  isDeleted: boolean;
}

interface MatchTypeData {
  matchTypeId: number;
  matchTypeTitle: string;
}

// AddPredictionTemplate

interface AddPredictionTemplateRequest {
  templateTitle: string;
  matchTypeId: number;
  predictionTemplateQuestions: PredictionTemplateQuestionData[];
}

interface AddPredictionTemplateResult {
  predictionTemplateId: number;
}

// UpdatePredictionTemplate

interface UpdatePredictionTemplateRequest {
  predictionTemplateId: number;
  templateTitle: string;
  matchTypeId: number;
  predictionTemplateQuestions: PredictionTemplateQuestionData[];
}

interface UpdatePredictionTemplateResult {
  isSuccessful: boolean;
}

// DeletePredictionTemplate

interface DeletePredictionTemplateRequest {
  predictionTemplateId: number;
}

interface DeletePredictionTemplateResult {
  message: string;
}

// getAllMatchType

interface MatchTypeData{
  matchTypeId:number;
  matchTypeTitle:string;
}

// getAllCategories

interface CategoryData{
  categoryId:number;
  categoryTitle: string;
  algorithmCode: string;
}







































// // interface PredictionTemplateData {
// //     predictionTemplateId: number;
// //     templateTitle: string;
// //     matchTypeId: number;
// //     predictionTemplateQuestions?: PredictionTemplateQuestionData[];
// //     matchType: MatchTypeData;
// //   }
// //   interface PredictionTemplateQuestionData {
// //     predictionTemplateQuestionId: number;
// //     questionText: string;
// //     categoryId: number;
// //     isDeleted: boolean;
// //   }
  
//   // interface MatchTypeData {
//   //   matchTypeId: number;
//   //   matchTypeTitle: string;
//   // }

//   // interface AddPredictionTemplateRequest {
//   //   templateTitle: string;
//   //   matchTypeId: number;
//   //   questions: PredictionTemplateQuestionData[];
//   // }
  
//   interface PredictionTemplateQuestionData {
//     predictionTemplateQuestionId: number;
//     questionText: string;
//     categoryId: number;
//     isDeleted: boolean;
//   }
  
//   interface AddPredictionTemplateResult
//   {
//       predictionTemplateId:number
//   }
  
//   // interface UpdatePredictionTemplateRequest {
//   //   predictionTemplateId:number
//   //   templateTitle: string;
//   //   matchTypeId: number;
//   //   questions: PredictionTemplateQuestionData[];
//   // }
  
  
//   interface UpdatePredictionTemplateResult
//   {
//       predictionTemplateId:number
//   }
  


// // interface deleteTemplateRequest{
// //   predictionTemplateId:string | undefined
// // }
// interface deleteTemplateResponse{
//   message:string
// }
