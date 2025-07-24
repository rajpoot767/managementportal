export interface Department {
    id:number;
    departmentCode: string;
    departmentName: string;
    establishedDate: string; // ISO format date
    emergencyContactNumber: string;
    emergencyServicesAvailable: boolean;
    openingTime: string; // HH:mm:ss format
    closingTime: string; // HH:mm:ss format
    isActive: boolean;
    description: string;
    departmentEmail: string;
    headDoctorId: number;
    contactNumber: string;
    faxNumber: string;
    floorNumber: string;
    buildingName: string;
    departmentLogoUrl: string;
    departmentImageUrl: string;
    numberOfStaff: number;
    numberOfBeds: number;
    departmentBudget: number;
    lastModifiedEmail: string;
    createdByUser: string;
}

export interface DepartmentApiResponse {
    count: number | null;
    result: Department[];
    message: string;
    errorNumber: number;
    responseGeneratedAtUTC?: string; // ISO timestamp
    // isSuccessful?: boolean;
}
  
