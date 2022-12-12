export class Error {
    constructor(message) {
          this.message = message;
          this.name = "Error"; 
        
    }}

export class InvalidParameterException extends Error {
    constructor(message) {
    super(message); 
    this.name = "InvalidParameterException";
    this.errorCode= 500
    }}

export class ExistingAccount extends Error {
    constructor(message) {
    super(message); 
    this.name = "ExistingAccount";
    this.errorCode= 500
    }}

export class ValidationError extends Error {
    constructor(message) {
    super(message); 
    this.name = "ValidationError";
    this.errorCode= 400
    }}

// export class SuccessResponse extends Error {
//     constructor(message) {
//     super(message); 
//     this.name = "SuccessResponse";
//     this.errorCode= 200
//     }}
    

export class notFoundResponse extends Error {
    constructor(message) {
    super(message); 
    this.name = "SuccessResponse";
    this.errorCode= 200
    }}

export class unauthorizedResponse extends Error {
    constructor(message) {
    super(message); 
    this.name = "unauthorizedResponse";    
    this.errorCode= 401
     }}

export class forbiddenResponse extends Error {
    constructor(message) {
    super(message); 
    this.name = "forbiddenResponse";    
    this.errorCode= 403
    }}

export class approvalerror extends Error{
    constructor(message) {
        super(message); 
        this.name = "approvalerror";    
        this.errorCode= 500
        }

}
export class uploaderror extends Error{
    constructor(message) {
        super(message); 
        this.name = "uploaderror";    
        this.errorCode= 500
        }

}
    




