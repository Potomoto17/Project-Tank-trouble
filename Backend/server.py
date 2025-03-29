import asyncio
import websockets
import controllers.user_controller as user
import controllers.lobby_controller as lobby
import controllers.game_controller as game
import json

players = set()

async def handler(player):
   
    players.add(player)
    try:
        async for messageJSON in player:
            try:
                message = json.loads(messageJSON)
                print(message)

                response = ""
                match message["command"]:

                    # User
                    case "login":
                        response = user.login(message)
                    case "register":
                        response = user.register(message)
                    case "logout":
                        response = user.logout(message)
                    case "info":
                        response = user.info(message)
                    
                    # Lobby
                    case "list":
                        response = lobby.list(message)
                    case "start":
                        response = lobby.start(message)
                    case "join":
                        response = lobby.join(message)

                    # Game
                    case "send_position":
                        response = game.send_position(message)
                    case "shoot":
                        response = game.shoot(message)
                    
                print(f"Sending: {response}")
                await player.send(response)

            except json.JSONDecodeError:
                await player.send(json.dumps(dict(status="error", message="Invalid JSON")))
    
    except websockets.ConnectionClosed:
        print("Connection closed")
    
    finally:
        players.remove(player)

async def main():
    server = await websockets.serve(handler, "localhost", 8000)
    await server.wait_closed()

asyncio.run(main())