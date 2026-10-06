import type { EmployeeInput } from "../interfaces/IEmployee.ts";

// Employees are listed from top to bottom so every boss exists before his/her reportees are added
export const mockEmployees: EmployeeInput[] = [
  { id: "C1", name: "Raja Venkatraman", dateOfBirth: "03/15/1970", designation: "CEO", reportsTo: null },
  { id: "D1", name: "Amit Agarwal", dateOfBirth: "07/22/1975", designation: "Director", reportsTo: "C1" },
  { id: "D2", name: "Sagar Waghmare", dateOfBirth: "11/05/1976", designation: "Director", reportsTo: "C1" },
  { id: "M1", name: "Piyush Mehta", dateOfBirth: "01/30/1982", designation: "Manager", reportsTo: "D1" },
  { id: "M2", name: "Sumit Kaulkar", dateOfBirth: "09/12/1984", designation: "Manager", reportsTo: "D2" },
  { id: "L1", name: "Jayesh Sharma", dateOfBirth: "04/18/1988", designation: "Lead", reportsTo: "M1" },
  { id: "L2", name: "Hrishikesh Deshpande", dateOfBirth: "12/01/1989", designation: "Lead", reportsTo: "M2" },
  { id: "E1", name: "Sumeet Bhujang", dateOfBirth: "06/25/1995", designation: "Engineer", reportsTo: "L1" },
  { id: "E2", name: "Pranav Patil", dateOfBirth: "08/09/1997", designation: "Engineer", reportsTo: "L1" },
  { id: "E3", name: "Darshan Dodia", dateOfBirth: "02/14/1999", designation: "Engineer", reportsTo: "L2" },
];
