function convertIDR(num) {
  return num.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR"
  })
}

function convertDate(today) {
  let date = today.getDate(today)
  let month = today.getMonth(today)
  let year = today.getFullYear(today)
  return `${year}-${month}-${date}`
}

module.exports = { convertIDR, convertDate }