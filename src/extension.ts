'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let txarStatusBarItem: vscode.StatusBarItem;
const NAMESPACE = 'toggleexplorerautoreveal';
const SETTING_KEY = 'explorer.autoReveal';
const TOGGLE_COMMAND = `${NAMESPACE}.toggle`;
const ON_COMMAND = `${NAMESPACE}.on`;
const OFF_COMMAND = `${NAMESPACE}.off`;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // toggle
    let toggleCommand = vscode.commands.registerCommand(TOGGLE_COMMAND, () => {
        toggle();
    });
    context.subscriptions.push(toggleCommand);

    // turn on
    let onCommand = vscode.commands.registerCommand(ON_COMMAND, () => {
        turnOn();
    });
    context.subscriptions.push(onCommand);

    // turn off
    let offCommand = vscode.commands.registerCommand(OFF_COMMAND, () => {
        turnOff();
    });
    context.subscriptions.push(offCommand);

    // create a new status bar item that we can now manage
    txarStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    txarStatusBarItem.command = TOGGLE_COMMAND;
    txarStatusBarItem.show();
    context.subscriptions.push(txarStatusBarItem);

    updateStatusBarItem();
}

// this method is called when your extension is deactivated
export function deactivate() {
    log("deactivate");
}

/**
 *
 */
function updateStatusBarItem(): void {
    txarStatusBarItem.text = vscode.workspace.getConfiguration().get(SETTING_KEY) ? 'autoReveal: on' : 'autoReveal: off';
}

/**
 * Toggle autoReveal
 */
function toggle(): void {
    let autoReveal = vscode.workspace.getConfiguration().get(SETTING_KEY);
    update(!autoReveal);
}

/**
 * Turn on autoReveal
 */
function turnOn(): void {
    update(true);
}

/**
 * Turn off autoReveal
 */
function turnOff(): void {
    update(false);
}

/**
 *
 * @param value
 */
function update(value: boolean) {
    vscode.workspace.getConfiguration().update(SETTING_KEY, value, vscode.ConfigurationTarget.Global).then(value => {
        updateStatusBarItem();
    }, reason => {
        error(reason);
    });
}

/**
 *
 * @param message
 */
function log(message: any): void {
    console.log(`[${NAMESPACE}] ${message}`);
}

/**
 *
 * @param message
 */
function error(message: any): void {
    console.error(`[${NAMESPACE}] ${message}`);
}