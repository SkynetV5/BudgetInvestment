export async function FetchDataUserId(id){
    const response = await fetch(`http://localhost:8080/users/id/${id}`)
    const result = await response.json();
    return result;
}

export async function FetchDataUserExpenses(id){
    const response = await fetch(`http://localhost:8080/expenses/${id}`);
    const result = await response.json();
    return result;
}

export async function FetchDataUserDeposits(id){
    const response = await fetch(`http://localhost:8080/deposits/${id}`);
    const result = await response.json();
    return result;
}

export async function FetchDataUserSavings(id){
    const response = await fetch(`http://localhost:8080/savings/${id}`);
    const result = await response.json();
    return result;
}

export async function FetchDataIsExistingEmail(email){
    const response = await fetch(`http://localhost:8080/users/email/${email}`);
    const result = await response.json();
    return result;
}

export async function FetchDataIsExistingUser(userName){
    const response = await fetch(`http://localhost:8080/users/userName/${userName}`);
    const result = await response.json();
    return result;
}