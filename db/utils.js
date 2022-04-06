function mapTheRows(rows) {
  const map = {}

  for (const row of rows) {
    if (!map[row.id]) {
      map[row.id] = {
        id: row.id,
        name: row.name,
        email: row.email,
        isCute: row.isCute,
        age: row.age,
        ownerId: row.ownerId,
        tricks: [],
      }
      if (row.trick_id) {
        map[row.id].tricks.push({
          trick_id: row.trick_id,
          title: row.trick_title,
        })
      }
    } else {
      map[row.id].tricks.push({
        trick_id: row.trick_id,
        title: row.trick_title,
      })
    }
  }
  return Object.values(map)
}

module.exports = {
  mapTheRows,
}
