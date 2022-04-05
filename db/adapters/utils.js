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
      if (row.trickId) {
        map[row.id].tricks.push({
          id: row.trickId,
          title: row.trickTitle,
        })
      }
    } else {
      map[row.id].tricks.push({
        id: row.trickId,
        title: row.trickTitle,
      })
    }
  }
  return Object.values(map)
}

module.exports = { mapTheRows }
