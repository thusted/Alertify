document.getElementById("phoneSubmit").addEventListener("click", function (e) {
    e.preventDefault()
    var name = $("input#namePhoneInput").val();
    var a = $("input#phoneInput").val();
    var b = [a.slice(0, 0), "(", a.slice(0)].join('');
    var c = [b.slice(0, 4), ")", b.slice(4)].join('');
    var phone = [c.slice(0, 8), "-", c.slice(8)].join('');
    var time = $("input#timeInput").val();
    var msg = `Name: ${name}%0d%0aPhone Number: ${phone}%0d%0aBest time to call: ${time}`
    console.log(msg)
    window.open(`mailto:teamalertify@gmail.com?subject=Phone Request&body=${msg}`);
});