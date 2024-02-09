export function obscureEmail(email) {
    const [local, domain] = email.split("@");
    return local.slice(0,2) + "•••••••@" + domain;
}

export function convertEmailToLocal(email) {
    const [local] = email.split("@");
    return local;
}