
//leads 

interface Lead {
  leadId: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  isClosed: boolean;
  comment?: string | null;
  createdDate: Date;
  createdBy: number;
  modifiedDate?: Date | null;
  modifiedBy?: number | null;
}
//add lead
interface LeadRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  isClosed: boolean;
}

interface LeadResult {
  leadId: number;
}

//update lead
interface UpdateCommentRequest {
  leadId?: number;
  comment?: string;
}
interface UpdateCommentResult {
  comment: any;
}

//toggle lead

 interface ToggleLeadStatusRequest {
  leadId: number;
}

 interface ToggleLeadStatusResult {
  isClosed: boolean;
}

