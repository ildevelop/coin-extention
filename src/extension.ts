// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import API from "./api/coinApi";
import { CoinType, CoinListType } from "./constant-types";
import { coinList } from "./config";

const list: CoinListType[] = coinList;
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
    const article = await vscode.window.showQuickPick(list, { matchOnDetail: true });
    if (!article) {
      return;
    }

    const coin: CoinType = await API.getCoin(article.path);

    const result = await vscode.window.showInformationMessage(`📍 ${article.label}: ${coin.last}$`, "😄", "😟");
    if (result === "😄") {
      vscode.window.showInformationMessage("thanks for good response");
    } else if (result === "😟") {
      vscode.window.showInformationMessage("I hope next time it should be good news for you");
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
