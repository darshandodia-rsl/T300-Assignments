import { Employee } from "./Employee.ts";

export class Lead extends Employee {
  constructor(id: string, name: string, dateOfBirth: string, reportsTo: string) {
    super(id, name, dateOfBirth, "Lead", reportsTo);
  }
}
