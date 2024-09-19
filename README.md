# Revolution MFA
Our solution for team accounts that need 2fa yet only support mobile auth.

## Architecture
```mermaid
flowchart LR
A[Code Sent] --> B[Code Recieved by Twillo]
B --> C[Webhook Sent by Twillo]
C --> D[Recieved by Worker]
D --> |Code Extracted|E[Send Code to Slack]
D --> |Code Not Extracted|F[Send Whole Text to Slack]
E --> G[END]
F --> G[END]
```

## Credits
- Took MFA regex's from [Hackclub's solution](https://github.com/hackclub/mfa)

## Used By
- Us
