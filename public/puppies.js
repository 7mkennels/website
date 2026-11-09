// The puppies come from /puppies.json; see README.md for the fields.
(function () {
  var list = document.getElementById("puppies");
  if (!list) return;
  var labels = { available: "Available", reserved: "Reserved", sold: "Sold" };
  function esc(v) { return String(v == null ? "" : v).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  // Photo paths in puppies.json are written from the site root ("images/cocoa.jpg").
  function photoUrl(p) { return /^(https?:)?\//.test(p) ? p : "/" + p; }
  fetch("/puppies.json", { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (d) {
    var pups = (d && d.puppies) || [];
    if (!pups.length) return;
    document.getElementById("litter-note").textContent = "Each puppy with its sex and status. Send an inquiry to ask about one.";
    list.innerHTML = pups.map(function (p) {
      var st = labels[p.status] ? p.status : "available";
      return '<article class="card puppy ' + st + '">' +
        (p.photo ? '<div class="photo"><img src="' + esc(photoUrl(p.photo)) + '" alt="' + esc(p.name) + ', chocolate Labrador puppy" loading="lazy"></div>' : "") +
        '<div class="body"><div class="row"><h3>' + esc(p.name) + '</h3><span class="pill ' + st + '">' + labels[st] + '</span></div>' +
        '<p>' + esc(p.sex) + (p.note ? " · " + esc(p.note) : "") + '</p></div></article>';
    }).join("");
  }).catch(function () {});
})();
