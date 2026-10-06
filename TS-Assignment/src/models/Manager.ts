import { Employee } from "./Employee.ts";

export class Manager extends Employee {
  constructor(id: string, name: string, dateOfBirth: string, reportsTo: string) {
    super(id, name, dateOfBirth, "Manager", reportsTo);
  }
}
