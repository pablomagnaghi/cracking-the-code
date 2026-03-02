// 07.02. Call Center
//
// Imagine you have a call center with three levels of employees: respondent,
// manager, and director. An incoming call must be first allocated to a
// respondent who is free. If the respondent can't handle the call, it must
// be escalated to a manager. If the manager is not free or not able to
// handle it, then the call should be escalated to a director. Design the
// classes and data structures for this problem. Implement a method
// dispatchCall() which assigns a call to the first available employee.
//
// Approach:
//   - An Employee base class tracks whether the employee is free and can
//     optionally handle or escalate a call.
//   - Respondent, Manager, and Director extend Employee with increasing rank.
//   - CallCenter maintains queues of employees by rank and a waiting-calls
//     queue. dispatchCall() finds the first available employee at the lowest
//     rank, escalating through the hierarchy as needed.
//
// Example:
//   const center = new CallCenter(respondents, managers, directors);
//   center.dispatchCall();  // assigns to first free respondent
//
// Constraints:
//   - Calls are dispatched to the lowest available rank first.
//   - If no employee is available at any rank, the call is queued.
//   - Completing a call frees the employee and dispatches any waiting call.

export enum Rank {
  Respondent,
  Manager,
  Director,
}

export class Call {
  private handler?: Employee;
  readonly rank: Rank; // minimum rank that can handle this call

  constructor(minimumRank: Rank = Rank.Respondent) {
    this.rank = minimumRank;
  }

  setHandler(employee: Employee): void {
    this.handler = employee;
  }

  getHandler(): Employee | undefined {
    return this.handler;
  }
}

export class Employee {
  readonly name: string;
  readonly rank: Rank;
  private free: boolean = true;
  private currentCall?: Call;

  constructor(name: string, rank: Rank) {
    this.name = name;
    this.rank = rank;
  }

  isFree(): boolean {
    return this.free;
  }

  receiveCall(call: Call): void {
    this.currentCall = call;
    this.free = false;
    call.setHandler(this);
  }

  completeCall(): Call | undefined {
    const call = this.currentCall;
    this.currentCall = undefined;
    this.free = true;
    return call;
  }

  getCurrentCall(): Call | undefined {
    return this.currentCall;
  }
}

export class Respondent extends Employee {
  constructor(name: string) {
    super(name, Rank.Respondent);
  }
}

export class Manager extends Employee {
  constructor(name: string) {
    super(name, Rank.Manager);
  }
}

export class Director extends Employee {
  constructor(name: string) {
    super(name, Rank.Director);
  }
}

export class CallCenter {
  private employeeLevels: Employee[][]; // indexed by Rank
  private callQueue: Call[] = [];

  constructor(respondents: Respondent[], managers: Manager[], directors: Director[]) {
    this.employeeLevels = [
      [...respondents],
      [...managers],
      [...directors],
    ];
  }

  /** Dispatch an incoming call to the first available employee. */
  dispatchCall(call: Call = new Call()): boolean {
    for (let rank = call.rank; rank <= Rank.Director; rank++) {
      const employee = this.getAvailableEmployee(rank);
      if (employee) {
        employee.receiveCall(call);
        return true;
      }
    }
    // No one available; queue the call
    this.callQueue.push(call);
    return false;
  }

  /** Called when an employee finishes a call; dispatch next queued call. */
  markCallComplete(employee: Employee): void {
    employee.completeCall();
    this.dispatchNextCall();
  }

  getQueueSize(): number {
    return this.callQueue.length;
  }

  private getAvailableEmployee(rank: Rank): Employee | undefined {
    const employees = this.employeeLevels[rank];
    return employees.find((e) => e.isFree());
  }

  private dispatchNextCall(): void {
    if (this.callQueue.length === 0) return;
    const call = this.callQueue[0];
    for (let rank = call.rank; rank <= Rank.Director; rank++) {
      const employee = this.getAvailableEmployee(rank);
      if (employee) {
        this.callQueue.shift();
        employee.receiveCall(call);
        return;
      }
    }
  }
}
