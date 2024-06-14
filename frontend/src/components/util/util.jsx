import { ClipLoader } from "react-spinners";

export function obscureEmail(email) {
    const [local, domain] = email.split("@");
    return local.slice(0,2) + "•••••••@" + domain;
}

export function convertEmailToLocal(email) {
    const [local] = email.split("@");
    return local;
}

export function abbreviateBody(body) {
    const bodyArr = body.split(" ");
    if (bodyArr.length <= 24) return body;
    const abbreviatedArr = bodyArr.slice(0, 25);
    return abbreviatedArr.join(" ") + "...";
}

export function abbreviateDate(date) {
    const currentYear = new Date().getFullYear();
    let dateArr = date.split(",")
    if (dateArr[1] === " " + currentYear.toString()) {
        return dateArr[0];
    } else {
        return date;
    }
}

export const autoGrow = e => {
    if (e.target.value === "") {
        e.target.style.height = "51px";
    } else {
        e.target.style.height = "auto";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }
}

export const totalClapAmount = (article, claps) => {
    const div = <div id="clap-placeholder-div"/>;
    // if (!article.clapIds || !claps) return <ClipLoader margin={4} size={5}/>
    if (!article.clapIds || !claps) return "--";
    if (article.clapIds.length === 0) return div;
    if (Object.values(claps).length === 0) return div;
    const arrayOfClapAmounts = article.clapIds.map(clapId => claps[clapId].amount);
    if (arrayOfClapAmounts.length === 0) return " ";
    return arrayOfClapAmounts.reduce((count, next) => count + next);
}

export const filterClappers = (article, claps, users) => {
    return article.clapIds.map(clapId => users[claps[clapId].clapperId]);
}

export const copyCurrentUrl = e => {
    e.preventDefault();

    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
        .then(() => console.log("URL copied to clipboard"))
        .catch((err) => console.error('Failed to copy current URL: ', err))
};