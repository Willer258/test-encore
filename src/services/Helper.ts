/* eslint-disabled */
// @ts-ignore
import store from "@/store";
import {v4 as uuidv4} from 'uuid';


export const FILTER_API_DATE_FORMAT = 'YYYYMMDDHHmmss';
export const DISPLAY_DATE_FORMAT = 'MM/DD/YYYY';
export const TABLE_DISPLAY_DATE_FORMAT = 'MM/DD/YYYY h:mm:ssA';
export const CONTRACT_STATUS = {
    QUOTATION: "DEVIS",
    ONGOING: "EN_COURS",
    TERMINATED: "RESILIE",
    SUSPENDED: "SUSPENDU",
    WAITING: "EN_ATTENTE",
  };

class Helper {

    public uploadRoot = process.env.VUE_APP_MASTER_URL + 'uploads/'

    empty(data: any): boolean {
        if (data === null || data === undefined || data === 'null') {
            return true
        }
        if (Array.isArray(data)) {
            if (data.length === 0) {
                return true
            }
        }
        if (typeof data === "number") {
            return false
        }
        if (typeof data === "string") {
            let tmp = document.createElement("DIV");
            tmp.innerHTML = data
            data = tmp.innerHTML || tmp.innerText || "";
            return data.trim() === ''
        }

        return false
    }


    generateId() {
        return uuidv4()
        // const number = Math.random();
        // number.toString(36);
        // return number.toString(36).substr(2, 9);
    }

    // currencyFormat(amount: any, abs = false, currency = true) {
    //     try {
    //         amount = parseFloat(amount);
    //         if (abs) {
    //             amount = Math.abs(amount)
    //         }
    //         amount = this.roundMoney(amount, 2)
    //         // console.log(amount)
    //         amount = '' + (amount * store.state.currency.factor);
    //         if (amount === undefined) {
    //             return amount;
    //         }
    //         // amount = this.roundMoney(amount, 2)
    //         // console.log(amount)
    //         // if (amount.includes('.')) {
    //         //     const vals = amount.split('.')
    //         //     const entier = vals[0]
    //         //     const decimal = vals[1]
    //         //     console.log('entier decimal',entier,decimal)
    //         // }
    //         amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    //         if (!currency) {
    //             return amount
    //         }
    //         if (store.state.currency) {
    //             if (store.state.currency.left) {
    //                 amount = store.state.currency.symbol + ' ' + amount;
    //             } else {
    //                 amount += ' ' + store.state.currency.symbol;
    //             }
    //         }
    //         return amount;
    //     } catch (e) {
    //         return amount
    //     }
    // }
    currencyFormat(amount:any, abs = false, currency = false) {
        const factor = 1;
        const symbol = "CFA";
        try {
            amount = parseFloat(amount);
            if (abs) {
            amount = Math.abs(amount);
            }
            amount = this.roundMoney(amount, 2);
            // console.log(amount)
            amount = "" + amount * factor;
            if (!amount) {
            return amount;
            }
            amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            if (!currency) {
            return amount;
            }
            if (symbol) {
            // if (store.state.currency.left) {
            //   amount = symbol + " " + amount;
            // } else {
            amount += " " + symbol;
            // }
            }
            return amount;
        } catch (e) {
            return amount;
        }
    }

    roundMoney(amount: any, count: number) {
        amount = parseFloat(amount);
        // console.log(amount)
        const val = Math.pow(10, count);
        return Math.round(amount * val) / val
    }

    // minifyCurrency(amount: any, abs = false, currency = true) {
    //     amount = parseFloat(amount);
    //     if (abs) {
    //         amount = Math.abs(amount)
    //     }
    //     if(amount > 100)
    // }

    minifyCurrency(amount: any, abs = false, currency = true) {
        amount = amount.toString().replace(/[^0-9.]/g, '');
        amount = parseFloat(amount);
        if (abs) {
            amount = Math.abs(amount)
        }

        if (amount < 1000) {
            return amount;
        }
        let si = [
            {v: 1E3, s: "K"},
            {v: 1E6, s: "M"},
            {v: 1E9, s: "B"},
            {v: 1E12, s: "T"},
            {v: 1E15, s: "P"},
            {v: 1E18, s: "E"}
        ];
        let index;
        for (index = si.length - 1; index > 0; index--) {
            if (amount >= si[index].v) {
                break;
            }
        }
        return (amount / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
    };

    numberFormat(n: number) {
        return new Intl.NumberFormat().format(n);
    }

    isValidDate(dateObject: any) {
        return new Date(dateObject).toString() !== 'Invalid Date';
    }

    phoneFormat(n: string) {
        //
        if (!n) {
            return n
        }
        let i = 0, pattern = null
        if (n.length === 14) {
            pattern = "#### ## ## ## ## ##"
        }
        if (n.length === 10) {
            pattern = "## ## ## ## ##"
        }
        if (n.length == 8) {
            pattern = "## ## ## ##"
        }

        if (pattern) {
            return pattern.replace(/#/g, () => n[i++]);
        }
        return n.replace(/\B(?=(\d{2})+(?!\d))/g, " ");
    }

    dateToHtml(date: Date) {
        try {
            const day = date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate()
            const month = (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
            return day + '-' + month + '-' + date.getFullYear()
        } catch (e) {
            return date
        }
    }

    reversedDateToHtml(date: Date) {
        try {
            console.log(date.toString())
            console.log(date.getDate())
            const day = date.getDate().toString().length === 1 ? ('0' + date.getDate()) : date.getDate()
            const month = (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
            console.log(day)
            return date.getFullYear() + '-' + month + '-' + day
        } catch (e) {
            return date.toString()
        }
    }
// @ts-ignore
    readable(date: Date | string | undefined, format: string = 'dmY H:i:s'): string {

        // console.log(date);
        if (typeof date === 'string') {
            try {
                date = new Date(date);
            } catch (e) {
                console.log('error');
                console.log(e);
                if (typeof date === 'string') {
                    return date;
                }
                return '';
            }
        }
        if (date instanceof Date) {
            let res = date.getDate() + ' ';
            if (!format.includes('d')) {
                res = '';
            }


            if (format.includes('m')) {
                let month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
                res += month[date.getMonth()] + ' ';
            }
            if (format.includes('M')) {
                let month = ['Janv', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
                res += month[date.getMonth()] + ' ';
            }
            if (format.includes('y')) {
                res += (date.getFullYear() + '').substr(-2);
            }
            if (format.includes('Y')) {
                res += (date.getFullYear() + '');
            }
            let h = date.getHours() < 10 ? '0' : '';
            let m = date.getMinutes() < 10 ? '0' : '';
            let s = date.getSeconds() < 10 ? '0' : '';
            if (format.includes('H')) {
                res += ' à ' + h + date.getHours();
            }
            if (format.includes('i')) {
                res += ':' + m + date.getMinutes();
            }
            if (format.includes('s')) {
                res += ':' + s + date.getSeconds();
            }
            // console.log(res);
            return res;
        }
        return '';
    }


    removeAccent(string: string) {
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    getTimeLapse(date?: Date | string | undefined, now?: Date | string, addPrefix = true, format?: string): string {

        if (typeof now === 'string') {
            try {
                now = new Date(now);
            } catch (e) {
                throw new Error('Impossible de convertir ' + now + ' en date valide');
            }
        }
        if (!now) {
            now = new Date();
        }
        if (typeof date === 'string') {
            try {
                date = new Date(date);
            } catch (e) {
                throw new Error('Impossible de convertir ' + date + ' en date valide');
            }
        }
        if (!date) {
            return '';
        }
        const diff = Math.abs(now.getTime() - date.getTime());
        let text = '';
        const timelapse = {
            y: Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 12),
            m: Math.floor(diff / 1000 / 60 / 60 / 24 / 30) % 12,
            d: Math.floor(diff / 1000 / 60 / 60 / 24) % 30,
            h: Math.floor(diff / 1000 / 60 / 60) % 24,
            i: Math.floor(diff / 1000 / 60) % 60,
            s: Math.floor(diff / 1000) % 60,
        };
        if (text.trim() === '' || (format && format.includes('y'))) {
            text += timelapse.y > 0 ? timelapse.y + ' an' : '';
            text += timelapse.y > 1 ? 's' : '';
        }
        if (text.trim() === '' || (format && format.includes('m'))) {
            text += timelapse.m > 0 ? ' ' + timelapse.m + ' ' + 'mois' : '';
        }
        if (text.trim() === '' || (format && format.includes('d'))) {
            text += timelapse.d > 0 ? ' ' + timelapse.d + ' jour' : '';
            text += timelapse.d > 1 ? 's' : '';
        }
        if (text.trim() === '' || (format && format.includes('h'))) {
            text += timelapse.h > 0 ? ' ' + timelapse.h + ' heure' : '';
            text += timelapse.h > 1 ? 's' : '';
        }
        if (text.trim() === '' || (format && format.includes('i'))) {
            text += timelapse.i > 0 ? ' ' + timelapse.i + ' minute' : '';
            text += timelapse.i > 1 ? 's' : '';
        }
        if (text.trim() === '' || (format && format.includes('s'))) {
            text += timelapse.s > 0 ? ' ' + timelapse.s + ' seconde' : '';
            text += timelapse.s > 1 ? 's' : '';
        }
        // console.log(text);

        if (addPrefix) {
            const prefix = now.getTime() - date.getTime() > 0 ? 'Il y a ' : 'Dans ';
            text = prefix + text;
        }
        // console.log(text);
        return text;
    }

    slugify(text: any, separator = "-") {
        if (!text) {
            return '';
        }
        return text
            .toString()
            .normalize('NFD')                   // split an accented letter in the base letter and the acent
            .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
            // .toLowerCase()
            .trim()
            .replace(/[^A-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
            .replace(/\s+/g, separator);
    }

    isValidPassword(text: any) {
        // console.log('isValidPassword "'+text+'" ? ',(text && text.length < 4))
        if  (this.empty(text)) {
          return false;
        }
        if (text && text.length < 4) {
          return false;
        }
        return true;
      }
    
    toCapitalize(text: string):string {
        if (!text) {
            return text;
        }
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    // getTimeLapse(
    //     date:any = null,
    //     now:any = null,
    //     addPrefix:any = true,
    //     format:any = "dmY",
    //   ) {
    //     if (typeof now === "string") {
    //       try {
    //         now = new Date(now);
    //       } catch (e) {
    //         throw new Error("Impossible de convertir " + now + " en date valide");
    //       }
    //     }
    //     if (!now) {
    //       now = new Date();
    //     }
    //     if (typeof date === "string") {
    //       try {
    //         date = new Date(date);
    //       } catch (e) {
    //         throw new Error("Impossible de convertir " + date + " en date valide");
    //       }
    //     }
    //     if (!date) {
    //       return "";
    //     }
    //     const diff = Math.abs(now.getTime() - date.getTime());
    //     let text = "";
    //     const timelapse = {
    //       y: Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 12),
    //       m: Math.floor(diff / 1000 / 60 / 60 / 24 / 30) % 12,
    //       d: Math.floor(diff / 1000 / 60 / 60 / 24) % 30,
    //       h: Math.floor(diff / 1000 / 60 / 60) % 24,
    //       i: Math.floor(diff / 1000 / 60) % 60,
    //       s: Math.floor(diff / 1000) % 60,
    //     };
    //     if (text.trim() === "" || (format && format.includes("y"))) {
    //       text += timelapse.y > 0 ? timelapse.y + " an" : "";
    //       text += timelapse.y > 1 ? "s" : "";
    //     }
    //     if (text.trim() === "" || (format && format.includes("m"))) {
    //       text += timelapse.m > 0 ? " " + timelapse.m + " " + "mois" : "";
    //     }
    //     if (text.trim() === "" || (format && format.includes("d"))) {
    //       text += timelapse.d > 0 ? " " + timelapse.d + " jour" : "";
    //       text += timelapse.d > 1 ? "s" : "";
    //     }
    //     if (text.trim() === "" || (format && format.includes("h"))) {
    //       text += timelapse.h > 0 ? " " + timelapse.h + " heure" : "";
    //       text += timelapse.h > 1 ? "s" : "";
    //     }
    //     if (text.trim() === "" || (format && format.includes("i"))) {
    //       text += timelapse.i > 0 ? " " + timelapse.i + " minute" : "";
    //       text += timelapse.i > 1 ? "s" : "";
    //     }
    //     if (text.trim() === "" || (format && format.includes("s"))) {
    //       text += timelapse.s > 0 ? " " + timelapse.s + " seconde" : "";
    //       text += timelapse.s > 1 ? "s" : "";
    //     }
    //     // console.log(text);
      
    //     if (addPrefix) {
    //       const prefix = now.getTime() - date.getTime() > 0 ? "Il y a " : "Dans ";
    //       text = prefix.trim() + " " + text.trim();
    //     }
    //     // console.log(text);
    //     return text;
    //   }
}

export const helper = new Helper()
