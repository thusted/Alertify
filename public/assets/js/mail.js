document.getElementById("emailSubmit").addEventListener("click", function (e) {
  e.preventDefault();
  var name = $("input#nameInput").val();
  var subject = $("input#subjectInput").val();
  var body = document.getElementById("msgInput").value;
  var msg = `${body}%0d%0a%0d%0aRegards, ${name}`;
  console.log(subject,msg);
  window.open(`mailto:teamalertify@gmail.com?subject=${subject}&body=${msg}`);
}); 