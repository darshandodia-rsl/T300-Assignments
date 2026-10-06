import type { Employee } from "./models/Employee.ts";
import { OrganizationService } from "./services/OrganizationService.ts";
import { mockEmployees } from "./data/mockData.ts";

const organization: OrganizationService = new OrganizationService();

// Prints one employee on a single line
function printEmployee(employee: Employee): void {
  console.log(
    employee.designation + " | " + employee.id + " | " + employee.name + " | " + employee.dateOfBirth +
      " | reportsTo: " + employee.reportsTo + " | reportees: " + employee.reportees.join(",")
  );
}

// Prints every employee of the organization
function printAllEmployees(): void {
  const allEmployees: Employee[] = organization.getAllEmployees();
  for (const employee of allEmployees) {
    printEmployee(employee);
  }
}

// 1. CREATE
console.log("--- 1. Create employees ---");
for (const input of mockEmployees) {
  organization.addEmployee(input);
}
console.log("Added " + mockEmployees.length + " employees");

// 2. READ
console.log("\n--- 2. Get all employees ---");
printAllEmployees();

console.log("\n--- 3. Get employee by id (L1) ---");
printEmployee(organization.getEmployeeById("L1"));

// 4. UPDATE
console.log("\n--- 4. Update name of E1 ---");
const updatedEmployee: Employee = organization.updateEmployee("E1", { name: "New Name" });
printEmployee(updatedEmployee);

// 5. DELETE
console.log("\n--- 5. Delete employee E2 ---");
organization.deleteEmployee("E2");
printAllEmployees();

// 6. VALIDATIONS
console.log("\n--- 6. Validations ---");

try {
  console.log("Adding an employee with a duplicate id...");
  organization.addEmployee({
    id: "E1",
    name: "Test",
    dateOfBirth: "01/01/2000",
    designation: "Engineer",
    reportsTo: "L1",
  });
} catch (error) {
  console.log("Error: " + (error as Error).message);
}

try {
  console.log("Adding a second CEO...");
  organization.addEmployee({
    id: "C2",
    name: "Test",
    dateOfBirth: "01/01/1970",
    designation: "CEO",
    reportsTo: null,
  });
} catch (error) {
  console.log("Error: " + (error as Error).message);
}

try {
  console.log("Adding an engineer who reports to a manager...");
  organization.addEmployee({
    id: "E10",
    name: "Test",
    dateOfBirth: "01/01/2000",
    designation: "Engineer",
    reportsTo: "M1",
  });
} catch (error) {
  console.log("Error: " + (error as Error).message);
}

try {
  console.log("Adding an employee with an empty name...");
  organization.addEmployee({
    id: "E11",
    name: "",
    dateOfBirth: "01/01/2000",
    designation: "Engineer",
    reportsTo: "L1",
  });
} catch (error) {
  console.log("Error: " + (error as Error).message);
}

try {
  console.log("Adding an employee with a wrong date format...");
  organization.addEmployee({
    id: "E12",
    name: "Test",
    dateOfBirth: "2000-01-01",
    designation: "Engineer",
    reportsTo: "L1",
  });
} catch (error) {
  console.log("Error: " + (error as Error).message);
}

try {
  console.log("Updating an employee that does not exist...");
  organization.updateEmployee("X99", { name: "Test" });
} catch (error) {
  console.log("Error: " + (error as Error).message);
}

try {
  console.log("Deleting an employee who has reportees (L1)...");
  organization.deleteEmployee("L1");
} catch (error) {
  console.log("Error: " + (error as Error).message);
}
