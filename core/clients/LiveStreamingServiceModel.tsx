/* eslint-disable @typescript-eslint/no-unused-vars */
interface StreamResponse {
    code: string;          
    message: string;       
    data: StreamRecord[];  
  }
  
 interface StreamRecord {
    id: string;             
    name: string; 
    score_match_id:number;        
    category_name: string;  
    tour_id: string;        
    tour_name: string;      
    match_status: number;   
    is_stream: number;      
    stream_caption: string; 
    start_date: string;     
    start_date_time: Date;
    team_a: Team;           
    team_b: Team;           
    logo: string;           
    venue: string;          
  }
  
 interface Team {
    id: number;       
    name: string;     
    short_name: string;
    logo: string;     
  }
  
  interface StreamRequest{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    is_limit?:any,
    timezone:string
  }