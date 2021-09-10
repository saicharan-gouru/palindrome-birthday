function reversedString(str) {
    return str.split('').reverse().join('');
}

function isPalindrome(str) {
    var reverse = reversedString(str);
    return str === reverse;
}

function convertDateToStr(date) {
    var dateStr = { day: '', month: '', year: '' }
    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}

function checkPalindromeForAllDateFormats(date) {
    var flag = false;
    var listOfFormats = getAllDateFormats(date);

    for (var i = 0; i < listOfFormats.length; i++) {
        if (isPalindrome(listOfFormats[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }

    return { day: day, month: month, year: year };

}

function getNextPalindromeDate(date) {
    var c = 0;
    var nextdate = getNextDate(date);
    while (1) {
        c++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextdate);
        if (isPalindrome) {
            break;
        }
        nextdate = getNextDate(nextdate);
    }
    return [c, nextdate];
}

var inputDate = document.querySelector("#input-date");
var btnCheck = document.querySelector("#btn-check");
var output = document.querySelector("#output");

function eventHadler() {
    bdayStr = inputDate.value;
    if (bdayStr !== '') {
        var listOfDate = bdayStr.split('-');
        var date = { day: Number(listOfDate[2]), month: Number(listOfDate[1]), year: Number(listOfDate[0]) };
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        console.log(isPalindrome);
        if (isPalindrome) {
            output.innerText = "Yayyy...! Your birthday is a palindrome";
        } else {
            var [ctr, nextdate] = getNextPalindromeDate(date);
            output.innerText = `Oh no...! your birthday is not palindrome, The next palindrome date is ${nextdate.day}-${nextdate.month}-${nextdate.year}, You missed it by ${ctr} day(s)`;
        }
    }
}

btnCheck.addEventListener("click", eventHadler);