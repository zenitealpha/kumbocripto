function contract_decimals($input = null)
{
    $output = {
        6 : "picoether",
        8 : "customeight",
        9 : 'nanoether',
        12 : 'microether',
        15 : 'milliether',
        18 : 'ether',
        21 : 'kether',
        24 : 'mether',
        27 : 'gether',
        30 : 'tether',
    };
    if (($input == null)) {
        return $output;
    } else {
        $result = 'ether';
        if (($output[$input])) {
            $result = $output[$input];
        }
        return $result;
    }
}

function customDecimal(input)
{
    let k='';
    for(j = 1; j <= input; j++) {
         k = k + '0';
    }
    return 1+k;
}

function customFromWei(amount,decimal)
{
    return (amount/customDecimal(decimal)).toString()
}
function customToWei(amount,decimal)
{
    return (amount*customDecimal(decimal)).toString()
}

module.exports = {
    contract_decimals,
    customDecimal,
    customFromWei,
    customToWei
}