(function () {
  // Inquiries go to Katy's inbox through Web3Forms (web3forms.com); the key is tied to her email address.
  var ACCESS_KEY = "e3de9b34-46fa-420b-9190-1c292ec5f7e1";
  var form = document.getElementById("inq");
  if (!form) return;
  var result = document.getElementById("result");
  var status = document.getElementById("status");
  var note = document.getElementById("fallback-note");
  var summary = document.getElementById("summary");
  var copy = document.getElementById("copy");
  var copied = document.getElementById("copied");
  var send = document.getElementById("send");
  function show(title, text, offerCopy) {
    status.textContent = title; summary.textContent = text;
    note.style.display = copy.style.display = offerCopy ? "" : "none";
    result.classList.add("show");
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var name = (d.get("name") || "").toString().trim();
    var email = (d.get("email") || "").toString().trim();
    copied.textContent = "";
    if (!name || !email) { show("Almost there", "Add your name and email so we can reply.", false); return; }
    var text =
      "Name: " + name + "\nEmail: " + email + "\nPhone: " + (d.get("phone") || "not given") + "\nLocation: " + (d.get("city") || "not given") + "\n" +
      "Preference: " + d.get("sex") + "\nPickup: " + d.get("pick") + "\nHome: " + d.get("home") + "\nDog experience: " + d.get("exp") + "\n\n" +
      (d.get("msg") || "").toString().trim();
    send.disabled = true; send.textContent = "Sending...";
    fetch("https://api.web3forms.com/submit", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: ACCESS_KEY, subject: "Puppy inquiry from " + name, from_name: "7mkennels website", replyto: email, name: name, email: email, message: text })
    }).then(function (r) { return r.json(); }).then(function (r) {
      if (!r.success) throw new Error(r.message);
      form.reset();
      show("Thank you, " + name + ".", "Your inquiry was sent. Katy will reply to " + email + ".", false);
    }).catch(function () {
      show("Your message", "Subject: Puppy inquiry from " + name + "\n\n" + text, true);
      status.textContent = "We could not send it from here";
    }).then(function () { send.disabled = false; send.textContent = "Send inquiry"; });
  });
  copy.addEventListener("click", function () {
    var text = summary.textContent;
    function fallback() {
      var r = document.createRange(); r.selectNodeContents(summary);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      copied.textContent = "Press copy on your keyboard to finish.";
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { copied.textContent = "Copied."; }, fallback);
    } else { fallback(); }
  });
})();
