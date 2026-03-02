import {
  ERDatabase,
  Person,
  Professional,
  Company,
} from '../../src/databases/06-entity-relationship-diagram';

describe('ERDatabase', () => {
  let db: ERDatabase;

  beforeEach(() => {
    db = new ERDatabase();
    db.addCompany({ id: 1, name: 'Acme Corp', address: '123 Main St' });
    db.addCompany({ id: 2, name: 'Globex Inc', address: '456 Oak Ave' });
    db.addPerson({ id: 10, name: 'Eve', address: '789 Elm St' });
    db.addProfessional({ id: 20, name: 'Alice', title: 'Engineer' });
    db.addProfessional({ id: 21, name: 'Bob', title: 'Designer' });
    db.addProfessional({ id: 22, name: 'Charlie', title: 'Manager' });
  });

  test('Professional extends Person', () => {
    const prof = db.getProfessional(20);
    expect(prof).toBeInstanceOf(Professional);
    expect(prof).toBeInstanceOf(Person);
    expect(prof!.name).toBe('Alice');
    expect(prof!.title).toBe('Engineer');
  });

  test('hiring links a professional to a company', () => {
    db.hire(20, 1, '2024-01-15');
    const company = db.getProfessionalCompany(20);
    expect(company).toBeDefined();
    expect(company!.name).toBe('Acme Corp');
    const prof = db.getProfessional(20);
    expect(prof!.dateOfEmployment).toBe('2024-01-15');
  });

  test('getCompanyEmployees returns all professionals in a company', () => {
    db.hire(20, 1);
    db.hire(22, 1);
    db.hire(21, 2);
    const acmeEmployees = db.getCompanyEmployees(1);
    expect(acmeEmployees).toHaveLength(2);
    expect(acmeEmployees[0].name).toBe('Alice');
    expect(acmeEmployees[1].name).toBe('Charlie');
  });

  test('hiring moves professional from one company to another', () => {
    db.hire(20, 1);
    expect(db.getProfessionalCompany(20)!.name).toBe('Acme Corp');
    db.hire(20, 2);
    expect(db.getProfessionalCompany(20)!.name).toBe('Globex Inc');
    expect(db.getCompanyEmployees(1)).toHaveLength(0);
  });

  test('terminate removes professional from company', () => {
    db.hire(20, 1);
    const terminated = db.terminate(20);
    expect(terminated).toBe(true);
    expect(db.getProfessionalCompany(20)).toBeNull();
    expect(db.getCompanyEmployees(1)).toHaveLength(0);
  });

  test('terminate returns false for unhired professional', () => {
    const result = db.terminate(20);
    expect(result).toBe(false);
  });

  test('hire returns false for non-existent professional or company', () => {
    expect(db.hire(999, 1)).toBe(false);
    expect(db.hire(20, 999)).toBe(false);
  });

  test('getAllPeople includes both persons and professionals', () => {
    const all = db.getAllPeople();
    expect(all).toHaveLength(4); // Eve, Alice, Bob, Charlie
    const names = all.map((p) => p.name);
    expect(names).toContain('Eve');
    expect(names).toContain('Alice');
  });

  test('Company has correct properties', () => {
    const company = db.getCompany(1);
    expect(company).toBeInstanceOf(Company);
    expect(company!.name).toBe('Acme Corp');
    expect(company!.address).toBe('123 Main St');
  });
});
