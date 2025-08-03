/*
 * This example demonstrates how easy it is to change the default movement
 *
 * Below are a few options you can edit in the Movement Class
 * but remember to check out the API documentation to find even more!
 *
 * This bot also follows a player when called called out to it.
 */

const mineflayer = require('mineflayer')
const { pathfinder, Movements } = require('../index.js')
const { GoalNear } = require('../index.js').goals

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 25565,
  username: 'bot1'
})

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
  /*
   * pathfinder comes with default moves preinitialized (a instance of the movement class)
   * the moves come with default logic, like how much it can fall
   * what blocks are used to scaffold, and what blocks to avoid.
   */

  // To get started create a instance of the Movements class
  const customMoves = new Movements(bot)
  customMoves.allowFreeMotion = true
  customMoves.allowSprinting = true
  customMoves.allowParkour = true

  // To initialize the new movements use the .setMovements method.
  bot.pathfinder.setMovements(customMoves)

  bot.on('messagestr', function (str) {
    const [, username, message] = str.match(/^<([^>]+)> (.+)$/) || []
    if (username === bot.username) return

    if (message === 'come') {
      const target = bot.players[username]?.entity
      if (!target) {
        bot.chat('I don\'t see you !')
        return
      }
      const p = target.position

      bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1))
    }
  })
})
