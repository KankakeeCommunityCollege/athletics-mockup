// Sets copyright year
function setFooterDate() {
  const d = new Date()
  const fullYear = d.getFullYear();

  document.getElementById('currentYear').innerHTML = fullYear;
}

export default setFooterDate;
