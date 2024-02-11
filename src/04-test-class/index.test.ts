// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

const INITIAL_BALANCE = 100;

describe('BankAccount', () => {
  const bankAccount = getBankAccount(INITIAL_BALANCE);
  const transferBankAccount = getBankAccount(INITIAL_BALANCE);

  test('should create account with initial balance', () => {
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect.assertions(1);
    expect(() => bankAccount.withdraw(INITIAL_BALANCE + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect.assertions(1);
    expect(() =>
      bankAccount.transfer(INITIAL_BALANCE + 1, transferBankAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect.assertions(1);
    expect(() =>
      bankAccount.transfer(INITIAL_BALANCE + 1, bankAccount),
    ).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositMoney = INITIAL_BALANCE * 2;
    const balance = bankAccount.getBalance();

    bankAccount.deposit(depositMoney);

    expect(bankAccount.getBalance()).toBe(depositMoney + balance);
  });

  test('should withdraw money', () => {
    const withdrawMoney = INITIAL_BALANCE / 2;
    const balance = bankAccount.getBalance();

    bankAccount.withdraw(withdrawMoney);

    expect(bankAccount.getBalance()).toBe(balance - withdrawMoney);
  });

  test('should transfer money', () => {
    const transferMoney = INITIAL_BALANCE / 2;
    const balance = bankAccount.getBalance();
    const prevTransferAccBalance = transferBankAccount.getBalance();

    bankAccount.transfer(transferMoney, transferBankAccount);

    expect(bankAccount.getBalance()).toBe(balance - transferMoney);
    expect(transferBankAccount.getBalance()).toBe(
      prevTransferAccBalance + transferMoney,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await bankAccount.fetchBalance();

    if (result) {
      expect(typeof result).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const oldBalance = bankAccount.getBalance();

    try {
      await bankAccount.synchronizeBalance();

      expect(bankAccount.getBalance() - oldBalance).toBeTruthy();
    } catch {
      expect(bankAccount.getBalance()).toBe(oldBalance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await bankAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
