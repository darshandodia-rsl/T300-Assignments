import type { Designation } from "../types/Designation.ts";
import type { IEmployee } from "../interfaces/IEmployee.ts";

// Base class with the details common to all employees
export abstract class Employee implements IEmployee {
  id: string;
  name: string;
  dateOfBirth: string;
  designation: Designation;
  reportsTo: string | null;
  reportees: string[];

  constructor(
    id: string,
    name: string,
    dateOfBirth: string,
    designation: Designation,
    reportsTo: string | null
  ) {
    this.id = id;
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.designation = designation;
    this.reportsTo = reportsTo;
    this.reportees = [];
  }
}
