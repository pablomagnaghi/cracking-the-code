// 14.06. Entity-Relationship Diagram
//
// Draw an entity-relationship diagram for a database with companies, people,
// and professionals (a subtype of people). Adapted: implement the entities
// and relationships as TypeScript classes with proper inheritance and
// relationship management.
//
// Approach:
//   - Person is the base entity with id, name, and address.
//   - Professional extends Person, adding a title, company reference, and
//     date of employment.
//   - Company has id, name, address, and a list of professional employees.
//   - An ERDatabase class manages all entities and their relationships:
//     addCompany, addPerson, addProfessional, hire (link professional to
//     company), and query methods.
//   - This models a one-to-many relationship: one company has many
//     professionals, each professional belongs to at most one company.
//
// Example:
//   db.addCompany({ id: 1, name: 'Acme Corp' })
//   db.addProfessional({ id: 1, name: 'Alice', title: 'Engineer' })
//   db.hire(1, 1)  // professional 1 joins company 1
//
// Constraints:
//   - A professional can belong to at most one company at a time.
//   - Hiring moves a professional from their current company (if any).
//   - People who are not professionals cannot be hired by companies.

export interface PersonData {
  id: number;
  name: string;
  address?: string;
}

export interface ProfessionalData extends PersonData {
  title: string;
  companyId?: number;
  dateOfEmployment?: string;
}

export interface CompanyData {
  id: number;
  name: string;
  address?: string;
}

export class Person {
  readonly id: number;
  name: string;
  address: string;

  constructor(data: PersonData) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address ?? '';
  }
}

export class Professional extends Person {
  title: string;
  companyId: number | null;
  dateOfEmployment: string | null;

  constructor(data: ProfessionalData) {
    super(data);
    this.title = data.title;
    this.companyId = data.companyId ?? null;
    this.dateOfEmployment = data.dateOfEmployment ?? null;
  }
}

export class Company {
  readonly id: number;
  name: string;
  address: string;

  constructor(data: CompanyData) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address ?? '';
  }
}

export class ERDatabase {
  private people: Map<number, Person> = new Map();
  private professionals: Map<number, Professional> = new Map();
  private companies: Map<number, Company> = new Map();

  addPerson(data: PersonData): Person {
    const person = new Person(data);
    this.people.set(person.id, person);
    return person;
  }

  addProfessional(data: ProfessionalData): Professional {
    const professional = new Professional(data);
    this.professionals.set(professional.id, professional);
    this.people.set(professional.id, professional);
    return professional;
  }

  addCompany(data: CompanyData): Company {
    const company = new Company(data);
    this.companies.set(company.id, company);
    return company;
  }

  hire(professionalId: number, companyId: number, date?: string): boolean {
    const professional = this.professionals.get(professionalId);
    const company = this.companies.get(companyId);
    if (!professional || !company) return false;

    professional.companyId = companyId;
    professional.dateOfEmployment = date ?? new Date().toISOString().slice(0, 10);
    return true;
  }

  terminate(professionalId: number): boolean {
    const professional = this.professionals.get(professionalId);
    if (!professional || professional.companyId === null) return false;

    professional.companyId = null;
    professional.dateOfEmployment = null;
    return true;
  }

  getCompanyEmployees(companyId: number): Professional[] {
    const result: Professional[] = [];
    for (const professional of this.professionals.values()) {
      if (professional.companyId === companyId) {
        result.push(professional);
      }
    }
    return result.sort((a, b) => a.id - b.id);
  }

  getProfessionalCompany(professionalId: number): Company | null {
    const professional = this.professionals.get(professionalId);
    if (!professional || professional.companyId === null) return null;
    return this.companies.get(professional.companyId) ?? null;
  }

  getPerson(id: number): Person | undefined {
    return this.people.get(id);
  }

  getProfessional(id: number): Professional | undefined {
    return this.professionals.get(id);
  }

  getCompany(id: number): Company | undefined {
    return this.companies.get(id);
  }

  getAllPeople(): Person[] {
    return Array.from(this.people.values()).sort((a, b) => a.id - b.id);
  }

  getAllCompanies(): Company[] {
    return Array.from(this.companies.values()).sort((a, b) => a.id - b.id);
  }
}
