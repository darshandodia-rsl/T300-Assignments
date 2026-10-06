import { Employee } from "./Employee.ts";

export class Engineer extends Employee {
  constructor(id: string, name: string, dateOfBirth: string, reportsTo: string) {
    super(id, name, dateOfBirth, "Engineer", reportsTo);
  }
}
