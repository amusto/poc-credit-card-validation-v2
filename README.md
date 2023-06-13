## poc-credit-card-validation

### Summary
You work for a company that accepts Visa, MasterCard and Discover credit cards for payment.

Given a credit card number as input, answer the following questions:
- Is the input a valid credit card number?
- What type of credit card is this? (Visa, Mastercard or Discover)

Your application will be deployed in AWS and should be implemented using serverless architecture and services if possible.

* [./Software_Engineer_Technical_Project.pdf](Software_Engineer_Technical_Project.pdf): Original requirements
* [./src](Software_Engineer_Technical_Project.pdf): Code base
* [./ASSUMPTIONS.md](ASSUMPTIONS.md): Assumptions Readme

#### Demo: https://d330fgnypu2hmi.cloudfront.net/

<hr>

### My Approach
I kept everything Front end with the caveats detailed in the [ASSUMPTIONS.md](ASSUMPTIONS.md) Readme file.
- Node v18.18.12
- Create React App
- react-hook-form (for cool validation)
- Terraform (IAC) (AWS Cloudfront/S3)

## How to run locally
Clone the repo to your local system
```
git clone https://github.com/amusto/poc-credit-card-validation.git
cd poc-credit-card-validation
```

Install dependencies

```
yarn OR npm install
``` 

### Run local
```
yarn start OR npm start
```

## References
- https://regexr.com/
- https://www.regular-expressions.info/creditcard.html

