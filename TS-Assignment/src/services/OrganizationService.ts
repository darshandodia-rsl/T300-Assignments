import type { Designation } from "../types/Designation.ts";
import type { EmployeeInput, EmployeeUpdate } from "../interfaces/IEmployee.ts";
import { CEO } from "../models/CEO.ts";
import { Director } from "../models/Director.ts";
import type { Employee } from "../models/Employee.ts";
import { Engineer } from "../models/Engineer.ts";
import { Lead } from "../models/Lead.ts";
import { Manager } from "../models/Manager.ts";

// Handles all the CRUD operations and the validations of the organization
export class OrganizationService {
  private employees: Employee[] = [];

  // ---------- CREATE ----------
  addEmployee(input: EmployeeInput): Employee {
    this.validateBasicFields(input.id, input.name, input.dateOfBirth);

    if (this.findEmployee(input.id) !== undefined) {
      throw new Error(`Employee id "${input.id}" already exists`);
    }

    if (input.designation === "CEO") {
      if (this.findCeo() !== undefined) {
        throw new Error("Only one CEO is allowed in the organization");
      }
      if (input.reportsTo !== null) {
        throw new Error("CEO cannot report to anyone");
      }
    } else {
      this.validateReportsTo(input.designation, input.reportsTo);
    }

    const employee: Employee = this.createEmployeeObject(input);
    this.employees.push(employee);

    // Add the new employee in the reportees list of his/her boss
    if (input.reportsTo !== null) {
      const boss: Employee = this.getEmployeeById(input.reportsTo);
      boss.reportees.push(employee.id);
    }
    return employee;
  }

  // ---------- READ ----------
  getAllEmployees(): Employee[] {
    return [...this.employees];
  }

  getEmployeeById(id: string): Employee {
    const employee: Employee | undefined = this.findEmployee(id);
    if (employee === undefined) {
      throw new Error(`Employee with id "${id}" was not found`);
    }
    return employee;
  }

  // ---------- UPDATE ----------
  updateEmployee(id: string, changes: EmployeeUpdate): Employee {
    const employee: Employee = this.getEmployeeById(id);

    if (changes.name !== undefined && !this.isNotEmpty(changes.name)) {
      throw new Error("Name cannot be empty");
    }
    if (changes.dateOfBirth !== undefined && !this.isValidDate(changes.dateOfBirth)) {
      throw new Error(
        `Invalid date of birth "${changes.dateOfBirth}", use mm/dd/yyyy format`
      );
    }

    const wantsNewBoss: boolean = changes.reportsTo !== undefined;
    if (wantsNewBoss) {
      if (employee.designation === "CEO") {
        if (changes.reportsTo !== null) {
          throw new Error("CEO cannot report to anyone");
        }
      } else {
        this.validateReportsTo(employee.designation, changes.reportsTo as string | null);
      }
    }

    if (changes.name !== undefined) {
      employee.name = changes.name.trim();
    }
    if (changes.dateOfBirth !== undefined) {
      employee.dateOfBirth = changes.dateOfBirth;
    }
    if (wantsNewBoss && changes.reportsTo !== employee.reportsTo) {
      this.removeFromBossReportees(employee);
      employee.reportsTo = changes.reportsTo as string | null;
      if (employee.reportsTo !== null) {
        this.getEmployeeById(employee.reportsTo).reportees.push(employee.id);
      }
    }
    return employee;
  }

  // ---------- DELETE ----------
  // An employee who still has reportees cannot be deleted (they must be moved first)
  deleteEmployee(id: string): void {
    const employee: Employee = this.getEmployeeById(id);

    if (employee.reportees.length > 0) {
      throw new Error(
        `Cannot delete "${employee.name}" because ${employee.reportees.length} employee(s) report to them. ` +
          `Move the reportees to someone else first`
      );
    }

    this.removeFromBossReportees(employee);
    this.employees = this.employees.filter((e: Employee) => e.id !== id);
  }

  // ---------- HELPERS ----------
  private findEmployee(id: string): Employee | undefined {
    return this.employees.find((e: Employee) => e.id === id);
  }

  private findCeo(): Employee | undefined {
    return this.employees.find((e: Employee) => e.designation === "CEO");
  }

  // Returns true if the text is not empty (spaces only also counts as empty)
  private isNotEmpty(text: string): boolean {
    return text.length > 0;
  }

  // Returns true if the text is in mm/dd/yyyy format
  private isValidDate(text: string): boolean {
    const dateFormat: RegExp = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateFormat.test(text);
  }

  private validateBasicFields(id: string, name: string, dateOfBirth: string): void {
    if (!this.isNotEmpty(id)) {
      throw new Error("Employee id cannot be empty");
    }
    if (!this.isNotEmpty(name)) {
      throw new Error("Employee name cannot be empty");
    }
    if (!this.isValidDate(dateOfBirth)) {
      throw new Error(
        `Invalid date of birth "${dateOfBirth}", use mm/dd/yyyy format`
      );
    }
  }

  // Which designation the boss of a given designation must have
  private getRequiredBossDesignation(designation: Designation): Designation {
    switch (designation) {
      case "Engineer":
        return "Lead";
      case "Lead":
        return "Manager";
      case "Manager":
        return "Director";
      case "Director":
        return "CEO";
      default:
        throw new Error(`${designation} does not have a boss`);
    }
  }

  // Checks that the boss exists and has the right designation
  private validateReportsTo(designation: Designation, reportsTo: string | null): void {
    if (reportsTo === null || !this.isNotEmpty(reportsTo)) {
      throw new Error(`${designation} must report to someone (reportsTo is required)`);
    }

    const boss: Employee | undefined = this.findEmployee(reportsTo);
    if (boss === undefined) {
      throw new Error(`Invalid reportsTo: no employee with id "${reportsTo}"`);
    }

    const requiredDesignation: Designation = this.getRequiredBossDesignation(designation);
    if (boss.designation !== requiredDesignation) {
      throw new Error(
        `Invalid hierarchy: ${designation} must report to a ${requiredDesignation}, ` +
          `but "${reportsTo}" is a ${boss.designation}`
      );
    }
  }

  private removeFromBossReportees(employee: Employee): void {
    if (employee.reportsTo === null) {
      return;
    }
    const boss: Employee | undefined = this.findEmployee(employee.reportsTo);
    if (boss !== undefined) {
      boss.reportees = boss.reportees.filter((reporteeId: string) => reporteeId !== employee.id);
    }
  }

  // Creates the right class object for the designation
  private createEmployeeObject(input: EmployeeInput): Employee {
    const name: string = input.name.trim();
    const boss: string = input.reportsTo as string; // already validated, not null here

    switch (input.designation) {
      case "Engineer":
        return new Engineer(input.id, name, input.dateOfBirth, boss);
      case "Lead":
        return new Lead(input.id, name, input.dateOfBirth, boss);
      case "Manager":
        return new Manager(input.id, name, input.dateOfBirth, boss);
      case "Director":
        return new Director(input.id, name, input.dateOfBirth, boss);
      case "CEO":
        return new CEO(input.id, name, input.dateOfBirth);
    }
  }
}
