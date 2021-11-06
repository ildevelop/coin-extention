// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import API from "./api/coinApi";
import { Coin, CoinList } from "./constant-types";

const coinList: CoinList[] = [
  { label: "BTC", path: "btcusd" },
  { label: "ETH", path: "ethusd" },
  { label: "LTC", path: "ltcusd" },
  { label: "ALGO", path: "algousd" },
  { label: "XRP", path: "xrpusd" },
  { label: "LINK", path: "linkusd" },
  { label: "MATIC", path: "maticusd" },
  { label: "BAT", path: "batusd" },
  { label: "SUSHI", path: "sushiusd" },
  { label: "OMG", path: "omgusd" },
];
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "get-coin-example" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("get-coin-example.getCoinPrice", async () => {
    const article = await vscode.window.showQuickPick(coinList, { matchOnDetail: true });
    if (!article) {
      return;
    }

    console.log("article>>", article);
    const coin: Coin = await API.getCoin(article.path);

    console.log(">>Coin>>", coin.last);

    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage(`📍 ${article.label}: ${coin.last}$`);
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
