## Assumptions
[Back](README.md)
* Backend API resources - I provided a basic stack that provided the requested deliverable but in production I might consider keeping the validation logic and services in the backend and accessible via an API function.
* Various ways to protect verification - input masking, encrypting payload, prevent letters, ...
* i18N - Localization - Internationalize (Remind me to tell you a cool story!)
* CI/CD - I used Serverless Components for a quick solution but in reality I would flush out a true CI/CD approach via a pipeline of action such as github actions or AWS Code Pipeline trigered by merge hooks most likely.
* Unit Tests - TBD
* CNAME - Time allowed, implement https://github.com/amplify-education/serverless-domain-manager

