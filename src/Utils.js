import _ from 'lodash';

export const isMessageValid = message => {
    const mostUsedWords = [
        ' tous',
        ' avoir',
        ' toujours',
        ' plus',
        ' chaque',
        ' quand',
        ' souvent',
        ' autre',
        ' tout',
        ' vaut',
        ' juste',
        ' dans',
        ' pour',
        ' faire',
        ' nous'
    ];

    let acceptableScore = 3;
    let messageScore = 0;

    _.each(mostUsedWords, word => {
        if(message.search(word) !== -1) {
            messageScore += 1;
        }
    });

    return messageScore >= acceptableScore;
};

export const toAscii = binaryStr => String.fromCharCode(parseInt(binaryStr, 2));

export const xor = (a, b) => {
    let s = '';

    for (let i = 0; i < 8; i++) {
        s += (parseInt(b[i], 2) ^ parseInt(a[i], 2)).toString(2);
    }
    return s;
}

export const toBinary = (char, spaceSeparatedOctets) => {
    const zeroPad = (num) => {
        return "00000000".slice(String(num).length) + num
    };
    if(char !== ' ' && char !== undefined) {
        return char.replace(/[\s\S]/g, function(char) {
            char = zeroPad(char.charCodeAt().toString(2));
            return !1 == spaceSeparatedOctets ? char : char + " "
        }).trim();
    } else {
        char = zeroPad(char.charCodeAt().toString(2));
        return char;
    }
    
};

export const decrypt = (plainKey, plainMessage) => {
    let xoredMsgBinaryChars = [];

    let binMsg = toBinary(plainMessage).split(' ');
    let binKey = toBinary(plainKey).split(' ');

    let binKeyIndex = 0;
    for(let i = 0; i < binMsg.length; i++) {
        if(binKeyIndex > binKey.length - 1) {
            binKeyIndex = 0;
        }
        xoredMsgBinaryChars.push(xor(binKey[binKeyIndex], binMsg[i]));
        binKeyIndex++;

    }

    let decryptedMsg = '';
    _.each(xoredMsgBinaryChars, binChar => {
        decryptedMsg += toAscii(binChar);
    });

    return {
        valid: isMessageValid(decryptedMsg),
        message: decryptedMsg
    };
};

