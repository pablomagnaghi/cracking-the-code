import {
  Employee,
  Respondent,
  Manager,
  Director,
  CallCenter,
  Call,
  Rank,
} from '../../src/object-oriented-design/02-call-center';

describe('Call Center', () => {
  let center: CallCenter;
  let r1: Respondent;
  let r2: Respondent;
  let m1: Manager;
  let d1: Director;

  beforeEach(() => {
    r1 = new Respondent('Alice');
    r2 = new Respondent('Bob');
    m1 = new Manager('Carol');
    d1 = new Director('Dave');
    center = new CallCenter([r1, r2], [m1], [d1]);
  });

  test('dispatches call to first available respondent', () => {
    const call = new Call();
    expect(center.dispatchCall(call)).toBe(true);
    expect(call.getHandler()).toBe(r1);
    expect(r1.isFree()).toBe(false);
  });

  test('dispatches to second respondent when first is busy', () => {
    center.dispatchCall(new Call());
    const call2 = new Call();
    center.dispatchCall(call2);
    expect(call2.getHandler()).toBe(r2);
  });

  test('escalates to manager when all respondents are busy', () => {
    center.dispatchCall(new Call());
    center.dispatchCall(new Call());
    const call3 = new Call();
    center.dispatchCall(call3);
    expect(call3.getHandler()).toBe(m1);
  });

  test('escalates to director when all respondents and managers are busy', () => {
    center.dispatchCall(new Call());
    center.dispatchCall(new Call());
    center.dispatchCall(new Call());
    const call4 = new Call();
    center.dispatchCall(call4);
    expect(call4.getHandler()).toBe(d1);
  });

  test('queues call when no one is available', () => {
    center.dispatchCall(new Call());
    center.dispatchCall(new Call());
    center.dispatchCall(new Call());
    center.dispatchCall(new Call());
    const call5 = new Call();
    expect(center.dispatchCall(call5)).toBe(false);
    expect(center.getQueueSize()).toBe(1);
  });

  test('completing a call frees the employee and dispatches queued call', () => {
    center.dispatchCall(new Call());
    center.dispatchCall(new Call());
    center.dispatchCall(new Call());
    center.dispatchCall(new Call());

    const queuedCall = new Call();
    center.dispatchCall(queuedCall);
    expect(center.getQueueSize()).toBe(1);

    // Complete r1's call; should dispatch queued call to r1
    center.markCallComplete(r1);
    expect(r1.isFree()).toBe(false); // got the queued call
    expect(queuedCall.getHandler()).toBe(r1);
    expect(center.getQueueSize()).toBe(0);
  });

  test('employee tracks current call', () => {
    const call = new Call();
    center.dispatchCall(call);
    expect(r1.getCurrentCall()).toBe(call);
    center.markCallComplete(r1);
    expect(r1.getCurrentCall()).toBeUndefined();
  });

  test('call with minimum rank skips lower ranks', () => {
    const managerCall = new Call(Rank.Manager);
    center.dispatchCall(managerCall);
    // Should go to manager, not respondent
    expect(managerCall.getHandler()).toBe(m1);
    expect(r1.isFree()).toBe(true);
    expect(r2.isFree()).toBe(true);
  });

  test('employee rank is correct for each subclass', () => {
    expect(r1.rank).toBe(Rank.Respondent);
    expect(m1.rank).toBe(Rank.Manager);
    expect(d1.rank).toBe(Rank.Director);
  });
});
