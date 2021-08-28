import { word_dictionary } from "../words";

// Begin Huffman Encoder Library.

/**
 * Copyright (c) 2010 Wilker Lúcio
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Huffman;
Huffman = {
    treeFromText: function (b) {
        var a;
        a = new Huffman.TreeBuilder(b);
        return a.build();
    },
};
Huffman.CoreHelpers = {
    isArray: function (a) {
        return !!(a && a.constructor === Array);
    },
    lpad: function (a, b) {
        b = b || 8;
        while (a.length < b) {
            a = "0" + a;
        }
        return a;
    },
};
Huffman.Tree = function (a) {
    this.root = a;
    this.root = this.root || new Huffman.Tree.Node();
    return this;
};
Huffman.Tree.prototype.encode = function (a) {
    return this.bitStringToString(this.encodeBitString(a));
};
Huffman.Tree.prototype.decode = function (j) {
    var g, f, e, a, c, i, h, b;
    a = this.stringToBitString(j);
    i = "";
    b = this.root;
    f = a.split("");
    for (g = 0, e = f.length; g < e; g++) {
        h = f[g];
        c = h === "0" ? "left" : "right";
        b = b[c];
        if (b.isLeaf()) {
            i += b.value;
            b = this.root;
        }
    }
    return i;
};
Huffman.Tree.prototype.encodeBitString = function (f) {
    var c, b, a, d, e;
    e = "";
    b = f.split("");
    for (c = 0, a = b.length; c < a; c++) {
        d = b[c];
        e += this.bitValue(d);
    }
    return e;
};
Huffman.Tree.prototype.bitStringToString = function (a) {
    var d, b, f, c, e;
    e = 8 - (a.length % 8);
    for (c = 0; 0 <= e ? c < e : c > e; 0 <= e ? (c += 1) : (c -= 1)) {
        a += "0";
    }
    f = (function () {
        d = [];
        b = a.length;
        for (c = 0; 0 <= b ? c < b : c > b; c += 8) {
            d.push(String.fromCharCode(parseInt(a.substr(c, 8), 2)));
        }
        return d;
    })();
    return f.join("") + e.toString();
};
Huffman.Tree.prototype.stringToBitString = function (c) {
    var e, d, b, a, f, h, g;
    g = c.split("");
    h = parseInt(g.pop());
    g = (function () {
        e = [];
        b = g;
        for (d = 0, a = b.length; d < a; d++) {
            f = b[d];
            e.push(Huffman.CoreHelpers.lpad(f.charCodeAt(0).toString(2)));
        }
        return e;
    })();
    g = g.join("");
    return g.substr(0, g.length - h);
};
Huffman.Tree.prototype.bitValue = function (b) {
    var a;
    if (!(typeof (a = this.leafCache) !== "undefined" && a !== null)) {
        this.generateLeafCache();
    }
    return this.leafCache[b];
};
Huffman.Tree.prototype.generateLeafCache = function (a, b) {
    this.leafCache =
        typeof this.leafCache !== "undefined" && this.leafCache !== null
            ? this.leafCache
            : {};
    a = a || this.root;
    b = b || "";
    if (a.isLeaf()) {
        return (this.leafCache[a.value] = b);
    } else {
        this.generateLeafCache(a.left, b + "0");
        return this.generateLeafCache(a.right, b + "1");
    }
};
Huffman.Tree.prototype.encodeTree = function () {
    return this.root.encode();
};
Huffman.Tree.decodeTree = function (a) {
    return new Huffman.Tree(Huffman.Tree.parseNode(a));
};
Huffman.Tree.parseNode = function (b) {
    var a;
    a = new Huffman.Tree.Node();
    if (Huffman.CoreHelpers.isArray(b)) {
        a.left = Huffman.Tree.parseNode(b[0]);
        a.right = Huffman.Tree.parseNode(b[1]);
    } else {
        a.value = b;
    }
    return a;
};
Huffman.Tree.Node = function () {
    this.left = this.right = this.value = null;
    return this;
};
Huffman.Tree.Node.prototype.isLeaf = function () {
    return this.left === this.right && this.right === null;
};
Huffman.Tree.Node.prototype.encode = function () {
    return this.value ? this.value : [this.left.encode(), this.right.encode()];
};
var __hasProp = Object.prototype.hasOwnProperty;
Huffman.TreeBuilder = function (a) {
    this.text = a;
    return this;
};
Huffman.TreeBuilder.prototype.build = function () {
    var a, b;
    b = this.buildFrequencyTable();
    a = this.combineTable(b);
    return Huffman.Tree.decodeTree(this.compressCombinedTable(a));
};
Huffman.TreeBuilder.prototype.buildFrequencyTable = function () {
    var d, c, b, a, e, h, f, g;
    g = {};
    c = this.text.split("");
    for (d = 0, b = c.length; d < b; d++) {
        e = c[d];
        g[e] = typeof g[e] !== "undefined" && g[e] !== null ? g[e] : 0;
        g[e] += 1;
    }
    f = [];
    a = g;
    for (e in a) {
        if (!__hasProp.call(a, e)) {
            continue;
        }
        h = a[e];
        f.push([h, e]);
    }
    f.sort(this.frequencySorter);
    return f;
};
Huffman.TreeBuilder.prototype.frequencySorter = function (d, c) {
    return d[0] > c[0] ? 1 : d[0] < c[0] ? -1 : 0;
};
Huffman.TreeBuilder.prototype.combineTable = function (b) {
    var c, a;
    while (b.length > 1) {
        c = b.shift();
        a = b.shift();
        b.push([c[0] + a[0], [c, a]]);
        b.sort(this.frequencySorter);
    }
    return b[0];
};
Huffman.TreeBuilder.prototype.compressCombinedTable = function (a) {
    var b;
    b = a[1];
    return Huffman.CoreHelpers.isArray(b)
        ? [this.compressCombinedTable(b[0]), this.compressCombinedTable(b[1])]
        : b;
};

// End Huffman Encoder Library.
// Begin Word Dictionary (Processed from the Open American National Corpus, accessible at https://www.anc.org/data/oanc/)

const bits_per_dict_word = 13;

const EncodingCharacterSets = {
    SEPARATORS: " -./",
    SPECIAL: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
    CAPITAL: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    LOWERCASE: "abcdefghijklmnopqrstuvwxyz",
    NUMERIC: "0123456789",
};
Object.freeze(EncodingCharacterSets);

const ExtendedEncoding = {
    BINARY: 0,
    BASE64: 1,
    ASCII: 2,
    FUTURE2: 3,
    FUTURE3: 4,
    FUTURE4: 5,
    FUTURE5: 6,
    FUTURE6: 7,
};
Object.freeze(ExtendedEncoding);

function generate_control_bits_from_booleans(
    separators = false,
    special = false,
    capital = false,
    lowercase = false,
    numeric = false
) {
    if (separators && special) {
        throw "separators and special cannot both be set, this is reserved for extended encodings.";
    }

    if (!separators && !special && !capital && !lowercase && !numeric) {
        throw "attempting to generate control bits with no encoding data, this is invalid.";
    }

    var control_bits = 0;
    control_bits |= +separators << 12;
    control_bits |= +special << 11;
    control_bits |= +capital << 10;
    control_bits |= +lowercase << 9;
    control_bits |= +numeric << 8;

    return control_bits;
}

function generate_control_bits_from_extended_type(extension) {
    var control_bits = 0;
    // Set encd_seperator
    control_bits |= 1 << 12;
    control_bits |= 1 << 11;

    // Set extended encoding part.
    control_bits |= (extension & 7) << 8;

    return control_bits;
}

function read_control_bits_eol_offset(control_bits) {
    return (control_bits >> 4) & 15;
}

function set_control_bits_eol_offset(control_bits, eol_offset) {
    if (eol_offset > 12)
        throw "Invalid eol_offset, must be between 0 and 12 inclusive.";
    control_bits |= (eol_offset & 15) << 4;
    return control_bits;
}

function read_control_bits_extended_flag(control_bits) {
    var encd_seperators = (control_bits >> 12) & 1;
    var encd_special = (control_bits >> 11) & 1;
    return encd_seperators && encd_special;
}

function read_control_bits_extended_type(control_bits) {
    if (!read_control_bits_extended_flag)
        throw "Attempting to read extended type when extended flag isn't set.";
    return (control_bits >> 8) & 7;
}

function read_control_bits_booleans(control_bits) {
    var encd_seperators = (control_bits >> 12) & 1;
    var encd_special = (control_bits >> 11) & 1;
    var encd_capital = (control_bits >> 10) & 1;
    var encd_lowercase = (control_bits >> 9) & 1;
    var encd_numeric = (control_bits >> 8) & 1;
    return {
        separators: encd_seperators,
        special: encd_special,
        capital: encd_capital,
        lowercase: encd_lowercase,
        numeric: encd_numeric,
    };
}

function encode_data(control_bits, data) {
    // Check for extended encoding since separators and special are mutually
    // exclusive.
    if (read_control_bits_extended_flag(control_bits)) {
        throw "Unimplemented encoding schema (this is a prototype algorithm).";

        var encd_extended = read_control_bits_extended_type(control_bits);
        switch (encd_extended) {
            case ExtendedEncoding.BINARY:
                break;
            case ExtendedEncoding.BASE64:
                break;
            case ExtendedEncoding.ASCII:
                break;
            default:
                throw "Unsupported extended encoding schema.";
                break;
        }
    } else {
        var encd = read_control_bits_booleans(control_bits);

        // Generate Huffman Encoding tree to match current encoding settings;
        var characters = "";
        if (encd.separators) characters += EncodingCharacterSets.SEPARATORS;
        if (encd.special) characters += EncodingCharacterSets.SPECIAL;
        if (encd.capital) characters += EncodingCharacterSets.CAPITAL;
        if (encd.lowercase) characters += EncodingCharacterSets.LOWERCASE;
        if (encd.numeric) characters += EncodingCharacterSets.NUMERIC;

        // Encode data to binary using Huffman Encoding to optimise data transmission.
        var huffman_encoding = Huffman.treeFromText(characters);
        var binary_data = huffman_encoding.encode(data);
        /*for (let i = 0; i < binary_data.length; i++) {
            console.log("Data: " + binary_data.charCodeAt(i));
        }*/
    }

    var converted_data = convert_binary_to_word_data(binary_data);
    control_bits = set_control_bits_eol_offset(
        control_bits,
        converted_data.eol_offset
    );

    // Convert word_data to code_phrase.
    var code_phrase = word_dictionary[control_bits] + " ";
    for (let i = 0; i < converted_data.word_data.length; i++) {
        if (
            !(
                0 <= converted_data.word_data[i] &&
                converted_data.word_data[i] <= 8195
            )
        )
            throw "word_key out of bounds.";

        code_phrase += word_dictionary[converted_data.word_data[i]];
        if (i != converted_data.word_data.length) code_phrase += " ";
    }

    return code_phrase;
}

function convert_binary_to_word_data(binary_data) {
    console.log(binary_data);
    var word_data = [];
    for (
        let in_bit_index = 0;
        in_bit_index < binary_data.length * 8;
        in_bit_index++
    ) {
        let curr_byte = binary_data[Math.floor(in_bit_index / 8)].charCodeAt(0);
        let word_index = Math.floor(in_bit_index / 13);
        let curr_bit = (curr_byte >> (7 - (in_bit_index % 8))) & 1;
        let out_bit_index = in_bit_index % 13;

        word_data[word_index] |= curr_bit << (12 - out_bit_index);
        /*console.log("curr_ byte: " + curr_byte.toString(2));
        console.log("curr_bit: " + curr_bit);
        console.log();*/
    }

    // Number of zeroes padded to end;
    var eol_offset = word_data.length * 13 - binary_data.length * 8;
    //console.log("eol_offset: " + eol_offset);
    //console.log(word_data);

    return {
        word_data: word_data,
        eol_offset: eol_offset,
    };
}

function convert_word_data_to_binary(control_bits, word_data) {
    var binary_data = [];
    var eol_offset = read_control_bits_eol_offset(control_bits);
    for (
        let in_bit_index = 0;
        in_bit_index < word_data.length * 13 - eol_offset;
        in_bit_index++
    ) {
        let curr_word = word_data[Math.floor(in_bit_index / 13)];
        let byte_index = Math.floor(in_bit_index / 8);
        let curr_bit = (curr_word >> (12 - (in_bit_index % 13))) & 1;
        let out_bit_index = in_bit_index % 8;

        binary_data[byte_index] |= curr_bit << (7 - out_bit_index);
    }

    for (let i = 0; i < binary_data.length; i++) {
        binary_data[i] = String.fromCharCode(binary_data[i]);
    }
    binary_data = binary_data.join("");
    console.log(binary_data);
    return binary_data;
}

function automatically_determine_encoding(text) {
    var encoding_settings = [false, false, false, false, false];

    for (let i = 0; i < text.length; i++) {
        var char = text.charAt(i);
        var curr_charset = 0;
        for (const charset in EncodingCharacterSets) {
            if (EncodingCharacterSets[charset].includes(char)) {
                encoding_settings[curr_charset] = true;
            }
            curr_charset += 1;
        }
    }

    if (encoding_settings[0] && encoding_settings[1]) {
        let needs_special = false;
        for (let i = 0; i < text.length; i++) {
            var char = text.charAt(i);
            if (
                EncodingCharacterSets.SPECIAL.includes(char) &&
                !EncodingCharacterSets.SEPARATORS.includes(char)
            ) {
                needs_special = true;
            }
        }

        if (needs_special) {
            encoding_settings[0] = false;
        } else {
            encoding_settings[1] = false;
        }
    }

    return {
        separators: encoding_settings[0],
        special: encoding_settings[1],
        capital: encoding_settings[2],
        lowercase: encoding_settings[3],
        numeric: encoding_settings[4],
    };
}

function encode_phone_number(international, phone_number) {
    word_data = [];

    // Set international bit.
    var word_count = 3;
    if (international) {
        binary_data[0] = 1 << 7;
        word_count = 5;
    }

    var data = BigInt(phone_number);
    //console.log(String(data).length);
    var word_index;
    while (word_index < word_count) {
        var curr_13_bits = Number(data % BigInt(8196));
        data = data / BigInt(8196);
        word_data[word_index] = curr_13_bits;
        word_index += 1;
    }

    /*
    var bit_index = 1;
    // read from bigint first
    while (word_count > 0) {
        //console.log(data);
        var curr_13_bits = data % BigInt(8196);
        console.log(curr_13_bits.toString(2));
        data = data / BigInt(8196);

        var limit = 13 - (bit_index % 13)
        for (var i = 0; i < limit; i++) {
            var curr_word = Math.floor(bit_index / 13);
            //console.log("curr_word: " + curr_word + " bit_index: " + bit_index);
            var curr_bit = ((Number)(curr_13_bits) >> (12 - i)) & 1;
            word_data[curr_word] |= curr_bit << (12 - (bit_index % 13));
            bit_index += 1;
        }

        word_count -= 1;
    }*/

    var result = "";
    for (let i = 0; i < word_data.length; i++) {
        result += word_dictionary[word_data[i]];

        if (i < word_data.length - 1) result += " ";
    }
    console.log(result);

    return result;
}

function decode_phone_number(code_phrase, regex = /[\s\-]/) {
    var words = code_phrase.split(regex);

    // Convert code_phrase to word_data.
    var word_data = [];
    var index = 0;
    for (let i = 0; i < words.length; i++) {
        var found = false;
        if (words[i].length != 0) {
            for (let j = 0; j < word_dictionary.length; j++) {
                if (words[i] == word_dictionary[j]) {
                    //console.log(words[i]);
                    word_data[index] = j;
                    index += 1;
                    found = true;
                }
            }

            if (!found) throw "Attempting to decode unknown word.";
        }
    }

    var international = (word_data[0] >> 12) & 1;
    var eol_offset = 1;
    if (international) {
        eol_offset = 2;
    }

    var data = BigInt(0);
    for (let i = 0; i < word_data.length; i++) {
        curr_13_bits = word_data[i];

        if (!(i < word_data.length - 1)) {
            curr_13_bits = curr_13_bits >> eol_offset;
        }
        // Process word_data to remove trailing bits.

        data += BigInt(curr_13_bits) * BigInt(8196) ** BigInt(i);
    }

    return String(data);
}

function decode_data(code_phrase, regex = /[\s\-]/) {
    var words = code_phrase.split(regex);

    // Convert code_phrase to word_data.
    var word_data = [];
    var index = 0;
    for (let i = 0; i < words.length; i++) {
        var found = false;
        if (words[i].length != 0) {
            for (let j = 0; j < word_dictionary.length; j++) {
                if (words[i] == word_dictionary[j]) {
                    //console.log(words[i]);
                    word_data[index] = j;
                    index += 1;
                    found = true;
                }
            }

            if (!found) throw "Attempting to decode unknown word.";
        }
    }

    //console.log(word_data);
    //console.log(word_data.slice(1));
    var control_bits = word_data[0];
    var binary_data = convert_word_data_to_binary(
        control_bits,
        word_data.slice(1)
    );

    var encd_seperators = (control_bits >> 12) & 1;
    var encd_special = (control_bits >> 11) & 1;

    // Check for extended encoding since separators and special are mutually
    // exclusive.
    if (read_control_bits_extended_flag(control_bits)) {
        var encd_extended = read_control_bits_extended_type(control_bits);
        // Now check for special types by using (ExtendedEncoding.BASE64 == encd_extended).
        throw "Unimplemented encoded schema (this is a prototype algorithm).";
        switch (encd_extended) {
            case ExtendedEncoding.BINARY:
                break;
            case ExtendedEncoding.BASE64:
                break;
            case ExtendedEncoding.ASCII:
                break;
            default:
                break;
        }
    } else {
        var encd = read_control_bits_booleans(control_bits);

        // Generate Huffman Encoding tree to match current encoding settings;
        var characters = "";
        if (encd.separators) characters += EncodingCharacterSets.SEPARATORS;
        if (encd.special) characters += EncodingCharacterSets.SPECIAL;
        if (encd.capital) characters += EncodingCharacterSets.CAPITAL;
        if (encd.lowercase) characters += EncodingCharacterSets.LOWERCASE;
        if (encd.numeric) characters += EncodingCharacterSets.NUMERIC;

        // Encode data to binary using Huffman Encoding to optimise data transmission.
        var huffman_encoding = Huffman.treeFromText(characters);
    }

    return huffman_encoding.decode(binary_data);
}

// function main() {
//     //var data = "7QKX235usVGnmTcidy";
//     //var encoding = generate_control_bits_from_booleans(capital=true, lowercase=true, numeric=true);
//     //var code_phrase = encode_data(encoding, data);

//     var encoded = encode_phone_number(false, "2334556556");
//     var decoded = decode_phone_number(encoded);

//     //console.log(automatically_determine_encoding("-"));

//     //console.log(code_phrase);
//     //console.log(decode_data(code_phrase));
// }

//==============

import { decipherOptionsData } from "../optionsData.js";
import { Paper, Tabs, Tab, Switch, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import styles from "../styles/CipherPage.module.css";
import MenuBar from "../components/cipher-page-layout/MenuBar";

const useStyles = makeStyles((theme) => ({
    workbench: {
        borderRadius: 20,
        backgroundColor: "#ebebeb",
        padding: "20px 30px",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    cipherDirectionSwitch: {
        // backgroundColor: "#5b76eb",
        background: "linear-gradient(45deg, #91ede9 30%, #86abf7 90%)",
        fontWeight: "bold",
        borderRadius: 15,
        width: "450px",
    },
    stepContainer: {
        borderRadius: 20,
        marginTop: 22,
        padding: "20px 25px",
        width: "100%",
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
    },
    optionCard: {
        width: "100%",
    },
    clipButton: {
        width: 240,
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        borderRadius: 10,
        border: 0,
        color: "white",
        marginTop: 10,
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    },
}));

function Decipher(props) {
    const classes = useStyles();
    // false to encode to words, true to decode from words
    const [cipherDirection, setCipherDirection] = useState(false);
    const [options, setOptions] = useState({
        separators: false,
        special: false,
        capital: false,
        lowercase: false,
        numeric: true,
    });
    const [inputState, setInputState] = useState("");
    const [outputState, setOutputState] = useState("");

    const toggleCipherDirection = (event, newValue) => {
        setCipherDirection(newValue);
    };

    const handleOptionsChange = (event) => {
        setOptions({ ...options, [event.target.name]: event.target.checked });
    };

    const setAllOptions = (newOptions) => {
        setOptions(newOptions);
    };

    function handleInputChange(event) {
        setInputState(event.target.value);
    }

    useEffect(() => {
        let autoEncoding = automatically_determine_encoding(inputState);
        console.log("autoEncoding: ", autoEncoding);
        // setOptions({ ...options, ["separators"]: autoEncoding.separators });
        // setOptions({ ...options, ["special"]: autoEncoding.special });
        // setOptions({ ...options, ["capital"]: autoEncoding.capital });
        // setOptions({ ...options, ["lowercase"]: autoEncoding.lowercase });
        // setOptions({ ...options, ["numeric"]: autoEncoding.numeric });
        setOptions(autoEncoding);
        console.log("cipherDirection: ", cipherDirection);
        console.log("options: ", options);
    }, []);

    function submitInput() {
        if (cipherDirection) {
            // Decode from words
            let decoded;
            try {
                decoded = decode_data(inputState);
                setOutputState(decoded);
            } catch (error) {
                console.error(error);
            }
        } else {
            // Encode to words
            // var encoding = {
            //     separators: options.separators,
            //     special: options.special,
            //     capital: options.capital,
            //     lowercase: options.lowercase,
            //     numeric: options.numeric,
            // };

            let autoEncoding = automatically_determine_encoding(inputState);
            console.log("autoEncoding: ", autoEncoding);
            // setOptions({ ...options, ["separators"]: autoEncoding.separators });
            // setOptions({ ...options, ["special"]: autoEncoding.special });
            // setOptions({ ...options, ["capital"]: autoEncoding.capital });
            // setOptions({ ...options, ["lowercase"]: autoEncoding.lowercase });
            // setOptions({ ...options, ["numeric"]: autoEncoding.numeric });
            setOptions(autoEncoding);
            console.log("cipherDirection: ", cipherDirection);
            console.log("options: ", options);

            var encodingBitString = generate_control_bits_from_booleans(
                autoEncoding.separators,
                autoEncoding.special,
                autoEncoding.capital,
                autoEncoding.lowercase,
                autoEncoding.numeric
            );

            // if (
            //     autoEncoding.separators ||
            //     autoEncoding.special ||
            //     autoEncoding.capital ||
            //     autoEncoding.lowercase ||
            //     autoEncoding.numeric
            // ) {
            //     var code_phrase = encode_data(encodingBitString, inputState);
            //     setOutputState(code_phrase);
            // } else {
            //     setOutputState("");
            // }
            try {
                var code_phrase = encode_data(encodingBitString, inputState);
                setOutputState(code_phrase);
            } catch {
                setOutputState("");
            }
            console.log("inputState: ", inputState);
        }
    }

    return (
        <div className={styles.pageContentContainer}>
            <div className={styles.menubarContainer}>
                <MenuBar
                    options={decipherOptionsData}
                    handleClick={() => changeOptions}
                />
            </div>
            <div className={styles.workbenchContainer}>
                <Paper classes={{ root: classes.workbench }} elevation={5}>
                    <div className={styles.workbenchTitle}>
                        Convert between code and natural language.
                    </div>
                    <div className={styles.workbenchDescription}>
                        Specify the format of your code manually with the
                        options below, and we will convert it into a natural
                        language sequence for you.
                    </div>
                    <Paper className={classes.stepContainer}>
                        <div className={styles.prompt}>
                            Choose your conversion direction
                        </div>
                        <div className={styles.info}>
                            Encode a code into a unique phrase, or decode a
                            phrase back into its original code.
                        </div>
                        <Paper className={classes.cipherDirectionSwitch}>
                            <Tabs
                                value={cipherDirection}
                                onChange={toggleCipherDirection}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Encode" />
                                <Tab label="Decode" />
                            </Tabs>
                        </Paper>
                    </Paper>
                    <Paper className={classes.stepContainer}>
                        <div className={styles.prompt}>
                            Build your code format
                        </div>
                        <div className={styles.optionContainer}>
                            <div className={styles.optionSwitchCont}>
                                <Switch
                                    checked={options.separators}
                                    onChange={handleOptionsChange}
                                    name="separators"
                                    inputProps={{
                                        "aria-label": "primary checkbox",
                                    }}
                                    disabled={options.special ? true : false}
                                />
                            </div>
                            <div className={styles.optionLabel}>Separators</div>
                            <div className={styles.optionExamples}>
                                {
                                    "Check this option if your code format is delimited by space characters ( ), periods (.) or forward slashes (/). Note that if this option is checked, then the special characters option is disabled."
                                }
                            </div>
                        </div>
                        <div className={styles.optionContainer}>
                            <div className={styles.optionSwitchCont}>
                                <Switch
                                    checked={options.special}
                                    onChange={handleOptionsChange}
                                    name="special"
                                    inputProps={{
                                        "aria-label": "primary checkbox",
                                    }}
                                    disabled={options.separators ? true : false}
                                />
                            </div>
                            <div className={styles.optionLabel}>
                                Special Characters
                            </div>{" "}
                            <div className={styles.optionExamples}>
                                {" !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"}
                                <br />
                                <br />
                                {
                                    "Note that if this option is checked, then the special characters option is disabled."
                                }
                            </div>
                        </div>
                        <div className={styles.optionContainer}>
                            <div className={styles.optionSwitchCont}>
                                <Switch
                                    checked={options.capital}
                                    onChange={handleOptionsChange}
                                    name="capital"
                                    inputProps={{
                                        "aria-label": "primary checkbox",
                                    }}
                                />
                            </div>
                            <div className={styles.optionLabel}>
                                Capital alphabetical letters
                            </div>
                            <div className={styles.optionExamples}>
                                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"}
                            </div>
                        </div>
                        <div className={styles.optionContainer}>
                            <div className={styles.optionSwitchCont}>
                                <Switch
                                    checked={options.lowercase}
                                    onChange={handleOptionsChange}
                                    name="lowercase"
                                    inputProps={{
                                        "aria-label": "primary checkbox",
                                    }}
                                />
                            </div>
                            <div className={styles.optionLabel}>
                                Lowercase alphabetical letters
                            </div>{" "}
                            <div className={styles.optionExamples}>
                                {"abcdefghijklmnopqrstuvwxyz"}
                            </div>
                        </div>
                        <div className={styles.optionContainer}>
                            <div className={styles.optionSwitchCont}>
                                <Switch
                                    checked={options.numeric}
                                    onChange={handleOptionsChange}
                                    name="numeric"
                                    inputProps={{
                                        "aria-label": "primary checkbox",
                                    }}
                                />
                            </div>
                            <div className={styles.optionLabel}>
                                Decimal digits
                            </div>
                            <div className={styles.optionExamples}>
                                {"0123456789"}
                            </div>
                        </div>
                    </Paper>
                    <Paper className={classes.stepContainer}>
                        <div className={styles.prompt}>
                            {cipherDirection
                                ? "Enter your code"
                                : "Enter a phrase"}
                        </div>
                        <div className={styles.info}>
                            {cipherDirection
                                ? "Input your code in the format specified by the above options. It will be converted into a natural language phrase."
                                : "Input a space or hyphen seperated natural language phrase you would like to convert into a code."}
                        </div>
                        <div className={styles.ioContainerBoth}>
                            <div className={styles.ioContainer}>
                                <div className={styles.ioTitle}>
                                    Input {cipherDirection ? "code" : "words"}
                                </div>

                                <TextField
                                    id="input"
                                    variant="outlined"
                                    value={inputState}
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                />
                            </div>
                            <Button
                                classes={{
                                    root: classes.clipButton,
                                    label: classes.clipButtonContent,
                                }}
                                onClick={submitInput}
                            >
                                {"Convert"}
                            </Button>
                            <div className={styles.ioContainer}>
                                <div className={styles.ioTitle}>
                                    Output {cipherDirection ? "words" : "code"}
                                </div>
                                <TextField
                                    id="output"
                                    variant="outlined"
                                    value={outputState}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    multiline
                                    minRows={3}
                                />
                            </div>
                            <Button
                                classes={{
                                    root: classes.clipButton,
                                    label: classes.clipButtonContent,
                                }}
                                onClick={() => {
                                    navigator.clipboard.writeText(outputState);
                                }}
                            >
                                {"Copy to clipboard"}
                            </Button>
                        </div>
                    </Paper>
                </Paper>
            </div>
        </div>
    );
}

export default Decipher;
