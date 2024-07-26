#! /usr/bin/env node
//Shebang

import inquirer from "inquirer";
import chalk from "chalk";

//Bank class interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void //void is return type! void means this method will return nothing only will perform operation
    deposit(amount: number): void
    checkBalance():void 
}

//Bank class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number,balance:number){ //constructor is a method, it is initializing object of class
        this.accountNumber=accountNumber;
        this.balance=balance  //when we use property with 'this' keyword in constructor , it represents object and when we get property with 'this' keyword out of the constructor , it refers to object
    }

    //Debit money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount
            console.log(chalk.greenBright(`\n\tWithdrawal of $${amount} successful! \n\tRemaining balance: $${this.balance}`));
      }
      else{
        console.log(chalk.redBright(`\n\tInsufficient Balance`));
        
      }
    }

    //Credit money
    deposit(amount: number): void {
        if (amount > 100){
            this.balance -= 1 //$1 fee charged if deposited is more than $100
        }
        this.balance += amount
        console.log(chalk.greenBright(`\n\tDeposit of $${amount} successfully! \n\t Remaining balance: $${this.balance}`));  
    }

    //Check balance
    checkBalance(): void {
        console.log(chalk.greenBright(`\n\tCurrent balance is: $${this.balance}`));
    }
}

//Customer class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName:string, lastName:string, gender:string, age:number, mobileNumber:number, account:BankAccount){
        this.firstName=firstName, //assigning property in constructor
        this.lastName=lastName,
        this.gender=gender,
        this.age=age,
        this.mobileNumber=mobileNumber,
        this.account=account
    }
}

//Create accounts
const accounts : BankAccount[]=[
    new BankAccount(1001,500),
    new BankAccount(1002,1000),
    new BankAccount(1003,2000)
]

//Create customers
const Customers : Customer[]=[
    new Customer("Fariha","Kanwal","Female",23, 3249876540,accounts[0]),
    new Customer("Muskan","Sheikh","Female",22, 3249876760,accounts[1]),
    new Customer("Yumna","Kanwal","Female",24, 3241116540,accounts[2])
]

console.log(chalk.yellowBright('\n\n\t'+'*'.repeat(60)));
console.log(chalk.yellowBright('\t'+'*'.repeat(60)));
console.log(chalk.yellowBright('\t\t\t ***MY BANK SYSTEM(CONSOLE APP)*** '));
console.log(chalk.yellowBright('\t'+'*'.repeat(60)));
console.log(chalk.yellowBright('\t'+'*'.repeat(60)));

console.log(chalk.greenBright('\n\tThere are 3 customers accounts in this app..Check it out! '))

console.log(chalk.greenBright('\n\t\t Name:Fariha Kanwal , Account Number:1001 \n\t\t Name:Muskan Sheikh , Account Number:1002 \n\t\t Name:Yumna Kanwal , Account Number:1003'));

//Function to interact with bank account
async function service(){  
    do{  //used do while loop to run function in loop form
        const accountNumberInput= await inquirer.prompt(
            {
                name:'accountNumber',
                type:'number',
                message:chalk.greenBright('\n\tEnter your account number:')
            }
        )

        const customer= Customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)

        if(customer){
            console.log(chalk.yellowBright.bold.italic.underline(`\n\n\tWelcome ${customer.firstName} ${customer.lastName}!`));
            const answer = await inquirer.prompt(
                [
                    {
                        name:'select',
                        type:'list',
                        message:chalk.blueBright('\n\tSelect an operation:'),
                        choices:['Deposit','Withdraw','Check Balance','Exit']
                    }
                ]
            )

            switch(answer.select){
                case 'Deposit':
                    const depositAmount=await inquirer.prompt(
                        {
                            name:'amount',
                            type:'number',
                            message:chalk.greenBright('\n\tEnter your amount to deposit:')
                        }
                    )
                    customer.account.deposit(depositAmount.amount)  //customer --> account(type BankAccount) --> deposit(BankAccount method)
                    break;

                    case 'Withdraw':
                    const withdrawAmount=await inquirer.prompt(
                        {
                            name:'amount',
                            type:'number',
                            message:chalk.greenBright('\n\tEnter your amount to deposit:')
                        }
                    )
                    customer.account.withdraw(withdrawAmount.amount) //giving user withdraw amount in withdraw method constructor , it will set user withdraw amount in withdraw method automatically
                    break;

                    case 'Check Balance':
                        customer.account.checkBalance()
                        break;

                        case 'Exit':
                            console.log(chalk.greenBright('\n\tExiting Bank Program....'));

                            console.log(chalk.yellowBright('\n\n\t'+'*'.repeat(60)));
                            console.log(chalk.yellowBright('\t\t****Thanks For Using Our Bank Services****'));
                            console.log(chalk.yellowBright('\t\t\t****Have a Great Day!****'));
                            console.log(chalk.yellowBright('\t'+'*'.repeat(60)));
                        return;            
            }     
        } 

        else{
            console.log(chalk.redBright('\n\n\tInvalid Account Number..'));
            console.log(chalk.redBright('\tPlease Try Again'));       
        }
    }while(true)
}

//Calling function
service()


