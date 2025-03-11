interface Session {
    contactId?: number;
    fullName?: string | null;
    truncatedIdentityNo?: string | null;
    oAuthToken?: string | null;
    refreshToken?: string | null;
    isPrimaryContact?: boolean
  }