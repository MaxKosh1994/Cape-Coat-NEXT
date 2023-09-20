declare namespace Email {
  interface EmailSendOptions {
    SecureToken: string;
    To: string;
    From: string;
    Subject: string;
    Body: string;
  }

  function send(options: EmailSendOptions): void;
}
