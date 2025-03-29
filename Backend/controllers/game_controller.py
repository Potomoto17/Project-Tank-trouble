import json
import numpy as np
import random
import pymunk
#import visualize
import helper
from models.game_model import GameModel, Player
import constants

class GameController:
    def __init__(self):
        # PHYSICS
        self.space = pymunk.Space()
        self.space.gravity = (0, 0)
        self.space.iterations = 20
        self.WALL_COLLISION_TYPE = 1
        self.BALL_COLLISION_TYPE = 2

        # Collision handlers
        handler = self.space.add_collision_handler(self.BALL_COLLISION_TYPE, self.BALL_COLLISION_TYPE)
        handler.begin = lambda arbiter, space, data: False

        wall_handler = self.space.add_collision_handler(self.BALL_COLLISION_TYPE, self.WALL_COLLISION_TYPE)
        wall_handler.begin = lambda arbiter, space, data: True
        wall_handler.post_solve = lambda arbiter, space, data: print("Bullet hit wall!")

        # Game setup
        self.game_id = 456
        self.game_model = GameModel(self.game_id)

        self.bullets = []
        
        # Initialize walls
        self._initialize_walls()

    def _initialize_walls(self):
        game_map = self.game_model.get_map()
        for i in range(len(game_map)):
            for j in range(len(game_map[i])):
                if game_map[i][j] == 1:
                    self._add_wall(j + 0.5, (len(game_map) - 1 - i) + 0.5)

    def check_hit(self, bullet_pos):
        for user_id, player in self.game_model.get_alive_players().items():
            player_pos = player.get_position()
            distance = helper.distance(player_pos, bullet_pos)
            if distance < 1:
                player.die()
                return user_id
        return None

    def _add_wall(self, game_x, game_y):
        body = pymunk.Body(body_type=pymunk.Body.STATIC)
        shape = pymunk.Poly.create_box(body, (1, 1))
        shape.friction = 0.0
        shape.elasticity = 1.0
        shape.collision_type = self.WALL_COLLISION_TYPE
        body.position = (game_x, game_y)
        self.space.add(body, shape)

    def _spawn_bullet(self, game_x, game_y):
        bullets_body = pymunk.Body(1, 10)
        ball_radius = 0.1
        bullets_shape = pymunk.Circle(bullets_body, ball_radius)
        bullets_shape.elasticity = 1.0
        bullets_shape.friction = 0.0
        bullets_shape.collision_type = self.BALL_COLLISION_TYPE
        bullets_body.position = (game_x, game_y)
        bullets_body.velocity = (15, -10)
        self.space.add(bullets_body, bullets_shape)
        self.bullets.append((bullets_body, bullets_shape))

    def add_player(self, user_id):
        x, y = self.game_model.set_spawn_position(user_id)
        print("x:", x, "y:", y)
        print("spawn matrix")
        for row in self.game_model.get_spawn_matrix():
            print(row)

        player = Player(user_id)
        player.update(x, y, random.randint(0, 360))
        self.game_model.add_player(user_id, player)

    def remove_player(self, user_id):
        self.game_model.remove_player(user_id)

    def _error(self, message):
        return json.dumps(dict(status="error", message=message))

    def _success(self):
        return json.dumps(dict(status="success"))

    def send_update(self, data, user_id):
        if user_id is None:
            return self._error("Not logged in")
        
        print("received position", data)
        player = self.game_model.get_player(user_id)
        if player:
            player.update_from_data(data)
        return self._success()

    def shoot(self, data, user_id):
        if user_id is None:
            return self._error("Not logged in")
        
        position = data["position"]
        self._spawn_bullet(position["x"], position["y"])
        return self._success()

    def game_status(self):
        if not self.game_model.is_game_started():
            return None
        
        #if self.game_model.get_game_clock() == -1:
        #    visualize.init_display(self.game_model.get_map())

        self.game_model.increment_game_clock()

        if self.game_model.get_game_clock() == 0:
            return json.dumps(dict(command="game_start", 
                                 game_id=self.game_id, 
                                 players=self.game_model.get_player_data(),
                                 map=self.game_model.get_map()))

        # Physics step
        dt = 1.0 / 120.0
        for _ in range(2):
            self.space.step(dt)

        bullet_data = []
        bullets_to_remove = []
        for i, (body, shape) in enumerate(self.bullets):
            pos_x, pos_y = body.position
            bullet_data.append([pos_x, pos_y])
            hit_player_id = self.check_hit((pos_x, pos_y))
            if hit_player_id:
                bullets_to_remove.append(i)

        # Remove bullets that hit players
        for index in sorted(bullets_to_remove, reverse=True):
            body, shape = self.bullets.pop(index)
            self.space.remove(body, shape)

        # Check for winner and reset if necessary
        winner_id, wins = self.game_model.check_winner()
        if winner_id:
            if wins >= constants.REQUIRED_WINS:
                player_scores = {
                    user_id: player.wins for user_id, player in self.game_model.get_all_players().items()
                }
                return json.dumps(dict(command="game_end", winner=winner_id, scores=player_scores))
            else:
                self.game_model.reset_game()
                # Clear all bullets
                for body, shape in self.bullets:
                    self.space.remove(body, shape)
                self.bullets.clear()
                return json.dumps(dict(command="round_over", winner=winner_id))

        #print("bullet data", bullet_data)
        #visualize.update_display(bullet_data)

        return json.dumps(dict(command="game_status",
                               game_id=self.game_id,
                               players=self.game_model.get_player_data(),
                               bullets=bullet_data))

# Create a single instance to be used in server.py
game_controller = GameController()

# Export these functions to be used in server.py
add_player = game_controller.add_player
remove_player = game_controller.remove_player
send_update = game_controller.send_update
shoot = game_controller.shoot
game_status = game_controller.game_status