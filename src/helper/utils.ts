function generate(){
    let password = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    for(let i=0;i<8;i++){
        password += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return password
}

export {generate} 