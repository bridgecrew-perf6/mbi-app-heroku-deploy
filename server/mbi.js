"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MBI = void 0;
var MBI;
(function (MBI) {
    function Generate() {
        var result = Array(mbiLength);
        for (var i = 0; i < result.length; i++) {
            result[i] = getMbiCharacter(i);
        }
        return result.join("");
    }
    MBI.Generate = Generate;
    const mbiIndices = [
        'NumberNotZero',
        'Letter',
        'Either',
        'Number',
        'Letter',
        'Number',
        'Number',
        'Either',
        'Letter',
        'Number',
        'Number'
    ];
    const mbiLength = mbiIndices.length;
    function getMbiCharacter(index) {
        const type = mbiIndices[index];
        switch (type) {
            case "Letter": return getMbiLetter();
            case "NumberNotZero": return getMbiNumber(false);
            case "Number": return getMbiNumber(true);
            case "Either": {
                const flip = randomIntBetween(1, 0);
                return flip == 1 ? getMbiLetter() : getMbiNumber(true);
            }
        }
    }
    const mbiLetters = [
        'A', /*'B',*/ 'C', 'D', 'E', 'F', 'G', 'H',
        'M', 'N', /*'O',*/ 'P', 'Q', 'R',
        /*'S',*/ 'T', 'U', 'V', 'W', 'X', 'Y',
    ];
    const mbiLettersLookup = {};
    mbiLetters.forEach(l => mbiLettersLookup[l] = true);
    function getMbiLetter() {
        return mbiLetters[randomIntBetween(mbiLetters.length, 0)];
    }
    function getMbiNumber(allowZero) {
        return randomIntBetween(9, allowZero ? 0 : 1).toString();
    }
    function randomIntBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function Verify(mbi) {
        if (mbi.length != mbiLength)
            return false;
        for (var i = 0; i < mbi.length; i++) {
            if (!isMbiCharacter(i, mbi[i]))
                return false;
        }
        return true;
    }
    MBI.Verify = Verify;
    function isMbiCharacter(index, character) {
        const type = mbiIndices[index];
        switch (type) {
            case "Letter": return isMbiLetter(character);
            case "NumberNotZero": return isMbiNumber(character, false);
            case "Number": return isMbiNumber(character, true);
            case "Either": return isMbiLetter(character) || isMbiNumber(character, true);
        }
    }
    function isMbiLetter(letter) {
        return mbiLettersLookup[letter] === true;
    }
    function isMbiNumber(number, allowZero) {
        if (number.length > 1)
            return false;
        const n = parseInt(number);
        return !isNaN(n) && (allowZero || n != 0);
    }
    function Format(mbi) {
        if (mbi.length < 4)
            return mbi;
        if (mbi.length < 7)
            return `${mbi.substring(0, 4)}-${mbi.substring(4)}`;
        return `${mbi.substring(0, 4)}-${mbi.substring(4, 7)}-${mbi.substring(7)}`;
    }
    MBI.Format = Format;
    function Parse(mbi) {
        return mbi.replaceAll("-", ""); //note: this is valid in ES2021, but not earlier. if this application needs to run in older browsers, a shim will be needed
    }
    MBI.Parse = Parse;
})(MBI = exports.MBI || (exports.MBI = {}));
//# sourceMappingURL=mbi.js.map