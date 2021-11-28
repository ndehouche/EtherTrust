**Inheritance and Interfaces:**  The main contract, `EtherTrust.sol`, inherits from OpenZeppelin's `Ownable.sol`, `Pausable.sol`, and `ReentrancyGuard.sol`.
It calls modifier `nonReentrant()` from OpenZeppelin's `ReentrancyGuard.sol` before executing a will, and modifier `whenNotPaused()` from `Pausable.sol` before creating or executing a will.
**Access Control Design Patterns:** 
Modifier `isTestator()` ensures that the creator of a will is the only address that can modify or cancel it.
Anti-access control design pattern: variable `lastAlive()` ensures that the creator of a will no longer has access to it before executing it.
**Other Design Patterns**
1. Data length is checked in fallback function.
2. The use of `transfer()` and `send()` is avoided.
3. Errors in external calls are handled with `(bool success, )`.
4. A way of circumventing non-participating participants is provided, through a time limit, i.e. contracts executed by incentivized third-parties.
5. Compiler version 0.8 is used to benefit from built-in `SafeMath`.