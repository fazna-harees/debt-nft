import { Button, Divider, Input } from "antd";
import React from "react";
import { Events } from "../components";

export default function Debt({ tx, writeContracts, readContracts, address, mainnetProvider, localProvider }) {
  const createNFT = (owedAmount, owedUnits, startTimer, dueDate, debtor, authorizedToDestroy, nftContract ) => {
    console.log("authorizedTo", authorizedToDestroy);
    tx(
      writeContracts.DebtContract.createNFT(
        owedAmount,
        owedUnits,
        startTimer,
        dueDate,
        authorizedToDestroy,
        debtor,
        nftContract,
      ),
      res => {
        console.log(res);
      },
    );
  };
  return (
    <div>
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Debt Contract</h2>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input onChange={e => {}} />
          <Button
            onClick={() =>
              createNFT(100, "DAI", Date.now(), Date.now() + 10000000000, address, [], readContracts.DebtNFT.address)
            }
          >
            Create NFT
          </Button>
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = tx(writeContracts.YourContract.setPurpose(""), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Set Purpose!
          </Button>
        </div>
        <Divider />
        Your Address:
        {/* <Address address={address} ensProvider={mainnetProvider} fontSize={16} /> */}
        <Divider />
        ENS Address Example:
        <Divider />
        {/* use utils.formatEther to display a BigNumber: */}
        {/* <h2>Your Balance: {yourLocalBalance ? utils.formatEther(yourLocalBalance) : "..."}</h2> */}
        <div>OR</div>
        {/* <Balance address={address} provider={localProvider} price={price} /> */}
        <Divider />
        <div>🐳 Example Whale Balance:</div>
        {/* <Balance balance={utils.parseEther("1000")} provider={localProvider} price={price} /> */}
        <Divider />
        {/* use utils.formatEther to display a BigNumber: */}
        {/* <h2>Your Balance: {yourLocalBalance ? utils.formatEther(yourLocalBalance) : "..."}</h2> */}
        <Divider />
        Your Contract Address:
        <Divider />
        {/* <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              tx(
                writeContracts.YourContract.setPurpose("💵 Paying for this one!", {
                  value: utils.parseEther("0.001"),
                }),
              );
            }}
          >
            Set Purpose With Value
          </Button>
        </div> */}
        {/* <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              tx({
                to: writeContracts.YourContract.address,
                value: utils.parseEther("0.001"),
                data: writeContracts.YourContract.interface.encodeFunctionData("setPurpose(string)", [
                  "🤓 Whoa so 1337!",
                ]),
              });
            }}
          >
            Another Example
          </Button>
        </div> */}
      </div>

      {/*
    📑 Maybe display a list of events?
      (uncomment the event and emit line in YourContract.sol! )
  */}
      <Events
        contracts={readContracts}
        contractName="DebtNFT"
        eventName="CreatedNFT"
        localProvider={localProvider}
        mainnetProvider={mainnetProvider}
        startBlock={1}
      />

      {/* <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 256 }}>
        <Card>
          Check out all the{" "}
          <a
            href="https://github.com/austintgriffith/scaffold-eth/tree/master/packages/react-app/src/components"
            target="_blank"
            rel="noopener noreferrer"
          >
            📦 components
          </a>
        </Card>

        <Card style={{ marginTop: 32 }}>
          <div>
            There are tons of generic components included from{" "}
            <a href="https://ant.design/components/overview/" target="_blank" rel="noopener noreferrer">
              🐜 ant.design
            </a>{" "}
            too!
          </div>

          <div style={{ marginTop: 8 }}>
            <Button type="primary">Buttons</Button>
          </div>

          <div style={{ marginTop: 8 }}>
            <SyncOutlined spin /> Icons
          </div>

          <div style={{ marginTop: 8 }}>
            Date Pickers?
            <div style={{ marginTop: 2 }}>
              <DatePicker onChange={() => {}} />
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <Slider range defaultValue={[20, 50]} onChange={() => {}} />
          </div>

          <div style={{ marginTop: 32 }}>
            <Switch defaultChecked onChange={() => {}} />
          </div>

          <div style={{ marginTop: 32 }}>
            <Progress percent={50} status="active" />
          </div>

          <div style={{ marginTop: 32 }}>
            <Spin />
          </div>
        </Card>
      </div> */}
    </div>
  );
}
