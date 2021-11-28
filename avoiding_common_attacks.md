1. Modifier `nonReentrant()` from OpenZeppelin's `ReentrancyGuard.sol` is used before executing a will (SWC-107). 
2. Use of Require (SWC-123). 
3. Use various Modifiers (SWC-105). 
4. Compiler version 0.8 is used (SWC-103, SWC-102, SWC-101).
5. Data length is checked in fallback function.
6. The use of `transfer()` and `send()` is avoided (SWC-111).
7. Errors in external calls are handled with `(bool success, )` (SWC-104).