import { Facit } from "../models/facitModel.js"
import { Image } from "../models/imageModel.js"
import { getResult } from "../utils/getResult.js"

// Handles player disconnection
export const handleSaveImage = (socket, io, t) => {
  socket.on("saveImage", async () => {
    // Get the team the player was in
    const team = t.player.getTeam(socket.id)

    if (!team) {
      return
    }

    // Find image by id to see if it already exists
    const image = await Image.findOne({ teamId: team.id }).exec()

    if (!image) {
      const facit = await Facit.findById(team.facitId).exec()
      const { percent } = getResult(team, facit) // Get the result to save to image

      // This saves the image to the database
      Image.create({
        teamId: team.id,
        teamName: team.name,
        percentCorrect: percent,
        pixelData: team.pixelData,
        duration: Math.ceil((team.endTime - team.startTime) / 1000),
      })
    }
  })
}
