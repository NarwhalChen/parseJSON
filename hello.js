// console.log(parseJSON('{ \n' +
//     '  "status": 100,\n' +
//     '  "msg": "返回成功",\n' +
//     '  "data": { \n' +
//     '    "string": "abc",\n' +
//     '    "array": [1,2,3], \n' +
//     '    "children": [ \n' +
//     '      { "name": "Jay", "age": 41, "occupation": "Musician"}, \n' +
//     '      { "name": "Jack", "age": 56, "occupation": "CEO"}, \n' +
//     '      { "name": "Kobe", "age": 42, "occupation": "Basketball players"}\n' +
//     '    ]\n' +
//     '  } \n' +
//     '}'));
function handleSubmit() {
    var input = document.getElementById('input-box').value;
    document.getElementById('output-box').innerText = parseJSON(input);
    // Prevent form from submitting to the server
    return false;
}
function parseJSON(str){
    let i = 0;
    function parseWhiteSpace(){
        while(str[i] === ' ' || str[i] === '\n'|| str[i] === '\r' || str[i] === '\t'){
            i++
        }
    }

    function parseString(){
        parseWhiteSpace()
        if(str[i] === '"'){
            i++
            let res = ''
            while(str[i] !== '"'){
                res += str[i]
                i++
            }
            i++
            return res
        }else{
            return parseNum()
        }
    }
    function handleColon(){
        if(str[i] !== ':'){
            throw new Error('Expected ":".')
        }
        i++
    }
    function parseObj(){
        parseWhiteSpace()
        if(str[i] === '{'){
            i++
            parseWhiteSpace()
            const res = {}
            let init = true
            while(str[i] !== '}'){
                if(!init){
                    handleComma()
                    parseWhiteSpace()
                }
                init = false

                const key = parseValue()
                parseWhiteSpace()
                console.log(key);
                handleColon()
                let value = parseString()
                if(str[i] === '[')value = parseArr()
                if(str[i] === '{')value = parseObj()
                res[key] = value
                parseWhiteSpace()
            }
            i++
            return res
        }
    }
    function handleComma(){
        if(str[i] !== ','){
            throw new Error('Expected ",".')
        }
        i++
    }
    function parseArr(){
        parseWhiteSpace()
        if(str[i] === '['){
            i++
            parseWhiteSpace()
            const res = []
            let init = true
            while(str[i] !== ']'){
                if(!init){
                    handleComma()
                    parseWhiteSpace()
                }
                init = false
                const value = parseValue()

                res.push(value)
                console.log(res)
                parseWhiteSpace()
            }
            i++
            return res
        }
    }

    function parseNum(){
        let start = i
        if (str[i] === "-") i++
        if (str[i] === "0") {
            i++
        } else if (str[i] >= "1" && str[i] <= "9") {
            i++
            while (str[i] >= "0" && str[i] <= "9") {
                i++;
            }
        }

        if (str[i] === ".") {
            i++
            while (str[i] >= "0" && str[i] <= "9") {
                i++
            }
        }
        if (str[i] === "e" || str[i] === "E") {
            i++
            if (str[i] === "-" || str[i] === "+") {
                i++
            }
            while (str[i] >= "0" && str[i] <= "9") {
                i++
            }
        }
        if (i > start) {
            return Number(str.slice(start, i));
        }
    }


    function parseOther(name, value){
        if (str.slice(i, i + name.length) === name) {
            i += name.length;
            return value;
        }
    }
    function parseValue() {
        parseWhiteSpace()
        console.log("teat");
        const value =
            parseString()||
            parseObj() ||
            parseArr() ||
            parseNum()||
            parseOther("true", true) ||
            parseOther("false", false) ||
            parseOther("null", null)

        parseWhiteSpace()

        return value
    }
    return parseValue()
}

