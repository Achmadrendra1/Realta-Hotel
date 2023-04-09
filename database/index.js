// SELECT * FROM Orders WHERE STATUS <> 'DELIVERED' ORDER BY ORDER_DATE, ID ASC LIMIT 5;

async function getPhoneNumbers(country, phoneNumber) {
    const res = await axios.get(`https://jsonmock.hackerrank.com/api/countries?name=${country}`);

    if (res.data.data[0]) {
        if (res.data.data[0].callingCodes.length > 1) {
            const index = res.data.data[0].callingCodes.reverse()
            return "+" + index[0] + " " + phoneNumber;
        } else {
            return "+" + res.data.data[0].callingCodes + " " + phoneNumber;
        }
    } else {
        return -1;
    }
}