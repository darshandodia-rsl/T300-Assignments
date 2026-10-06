import { Employee } from "./Employee.ts";

// The CEO reports to nobody, so reportsTo is always null
export class CEO extends Employee {
  constructor(id: string, name: string, dateOfBirth: string) {
    super(id, name, dateOfBirth, "CEO", null);
  }
}
