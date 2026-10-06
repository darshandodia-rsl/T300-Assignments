import { Employee } from "./Employee.ts";

export class Director extends Employee {
  constructor(id: string, name: string, dateOfBirth: string, reportsTo: string) {
    super(id, name, dateOfBirth, "Director", reportsTo);
  }
}
