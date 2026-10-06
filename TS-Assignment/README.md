# Organization Management System (TypeScript)

A small console program, written in TypeScript with OOP concepts (classes, `extends`, `implements`, abstract class, union type, interfaces), that manages the employees of an organization. There is no UI. The program runs in Node.js using mock data.

## Setup and installation

Requirements: Node.js v22.18 or newer (it can run `.ts` files directly) and npm.

```
cd TS-Assignment
npm install
```

## Execution commands

The TypeScript file is run directly with Node.js, no compile step is needed:

```
node src/main.ts
```

To only check the types (strict mode, no implicit any / return types) without running the program:

```
npx tsc
```

The program runs every feature one after the other and prints the result: Create, Read (all and by id), Update, Delete, and then 7 basic validation cases (each one prints `Error: reason`).

## Project structure

All the code is inside the `src` folder. `main.ts` is the starting point: it adds the mock employees and then runs create, read, update, delete and a few validation cases, printing the result of each. The `data` folder has `mockData.ts` with the sample employees (1 CEO, 2 Directors, 2 Managers, 2 Leads and 3 Engineers). The `types` folder has `Designation.ts`, a union type with the five designations. The `interfaces` folder has `IEmployee.ts`, which defines `IEmployee` and the `EmployeeInput` and `EmployeeUpdate` types. The `models` folder has the abstract `Employee` class and one class for each designation (`Engineer`, `Lead`, `Manager`, `Director` and `CEO`) that extends it. The `services` folder has `OrganizationService.ts`, which does all the CRUD operations and validations. `package.json` has the project details and `tsconfig.json` has the compiler settings (strict mode, `noImplicitAny` and `noImplicitReturns`).

## Design approach

- **`IEmployee`** is the interface describing what every employee has. The abstract class **`Employee`** `implements` it and holds the common fields (`id`, `name`, `dateOfBirth`, `designation`, `reportsTo`, `reportees`).
- **`Engineer`, `Lead`, `Manager`, `Director`, `CEO`** each `extends Employee` and just set their own designation. The `CEO` constructor has no `reportsTo` and always passes `null`.
- **`OrganizationService`** keeps the list of employees and has `addEmployee`, `getAllEmployees`, `getEmployeeById`, `updateEmployee` and `deleteEmployee`. All the rules live here, so `main.ts` stays simple.
- **All validations are in `OrganizationService`**, and errors are thrown with a clear message that the caller prints.
- **No implicit `any` / implicit return types**: `tsconfig.json` has `strict`, `noImplicitAny` and `noImplicitReturns` turned on, and every function, parameter and variable has an explicit type.

## Assumptions

- Hierarchy is fixed: Engineer -> Lead -> Manager -> Director -> CEO. An employee can only report to the designation directly above.
- The CEO must be added first, because every other employee needs a boss that already exists.
- Date of birth must be in `mm/dd/yyyy` format (2-digit month and day, 4-digit year).
- **Delete**: an employee who still has reportees is **rejected**. The reportees must first be moved to someone else using update.

## MCQ answers

1. **B. `"two"`**: `as const` makes the array a readonly tuple `readonly [1, "two", 3]`, so index `1` has the exact literal type `"two"`.
2. **B**: An interface only describes the shape. A class that `implements` it does not get the optional property automatically, so `c.y` does not exist on type `C` and TypeScript gives an error.
3. **B**: Enums are nominally typed. `Level.Active` is not assignable to `Status`, even though both are `"ACTIVE"`, so it is a compile-time error.
4. **C. `never`**: Intersecting `{ id: number } & { id: string }` makes `id` of type `number & string`, which is impossible, so it reduces to `never`.
5. **B**: The `triangle` case is not handled and there is no `default`, so not all code paths return a value. The fix is a `default` branch with a `never` check.
