import type { Designation } from "../types/Designation.ts";

// Shape that every employee class must follow
export interface IEmployee {
  id: string;
  name: string;
  dateOfBirth: string; // mm/dd/yyyy
  designation: Designation;
  reportsTo: string | null; // id of the boss (null only for CEO)
  reportees: string[]; // ids of the people reporting to this employee
}

// Data needed to create a new employee
export interface EmployeeInput {
  id: string;
  name: string;
  dateOfBirth: string;
  designation: Designation;
  reportsTo: string | null;
}

// Data that can be changed in an existing employee.
// Every field is optional, only the given ones are updated.
export interface EmployeeUpdate {
  name?: string;
  dateOfBirth?: string;
  reportsTo?: string | null;
}
