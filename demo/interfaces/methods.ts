/* eslint-disable */
import { strict as assert } from "assert";
interface Notifier {
  send(message: string): void;
}
class EmailNotifier implements Notifier {
  send(message: string): void {
    //  Todo : send the eamil for real
    console.log(`[Email] ${message}`);
  }
}

class SMSNotifier implements Notifier {
  send(message: string): void {
    // Todo : send the txt for real
    console.log(`[SMS] ${message}`);
  }
}

class TestNotifier implements Notifier {
  send(message: string): void {
    // Todo : log the message for testing
    console.log(`[Test] ${message}`);
  }
}

const email = new EmailNotifier();
const sms = new SMSNotifier();
const test = new TestNotifier();

function logAndSend(notifier: Notifier, message: string) {
  console.log(`\nSending message.....`);
  notifier.send(message);
  console.log(`Message sent successfully.\n`);
}

logAndSend(email, "Hello via Email!");
logAndSend(sms, "Hello via SMS!");
logAndSend(test, "Hello via Test!");
