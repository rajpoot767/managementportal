interface Toss {
    text: string | null;
    winner: number;
    decision: number;
  }
  
  interface Competition {
    id: number;
    name: string;
    shortname: string;
    season: string;
  }
  
  interface Team {
    id: number;
    name: string;
    shortname: string;
    logo: string;
    scores_full: string | null;
    scores: string | null;
    overs: string | null;
  }
  
  interface Venue {
    venue_id: string;
    name: string;
    location: string;
    country: string;
  }

interface LiveMatch {
    _id: string;
    match_id: number;
    name: string;
    shortname: string;
    subtitle: string;
    match_number: string;
    format: number;
    format_str: string;
    priority: number;
    status: number;
    match_status: string;
    status_note: string;
    pre_squad: string;
    verified: string;
    odds_available: string;
    game_state: number;
    category: string;
    start_timestamp: number;
    end_timestamp: number;
    umpires: string;
    referee: string;
    win_margin: string;
    winning_team_id: number;
    commentary: number;
    wagon: number;
    inning: number;
    toss: Toss;
    competition: Competition;
    team_a: Team;
    team_b: Team;
    venue: Venue;
    created: string;
    modified: string;
  }
  
   interface LiveScoreResult {
    code: string;
    message: string;
    data: LiveMatch[];
  }