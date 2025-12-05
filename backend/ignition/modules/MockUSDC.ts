import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MockUSDC", (m) => {
    const account = m.getAccount(0);
    const usdc = m.contract("MockUSDC", ["USDC", "USDC"]);

    m.call(usdc, "mint", [account, 200]);

    return { usdc };
});
