CREATE TABLE `matching_game`(
    user_ID INT NOT NULL,
    MG_game_ID INT PRIMARY KEY AUTO_INCREMENT,
    MG_score INT,
    tiles_turned_count INT,  -- Stores the tile IDs (e.g., [1, 2, 3]) instead of file paths
    tile_placement JSON, -- Stores the tile placements (e.g., [1, 4, 2])
    time_elapsed INT,      -- Time limit in seconds
    last_time_accessed DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    difficulty ENUM('Easy', 'Medium', 'Hard'),
    FOREIGN KEY(user_ID) REFERENCES `user`(user_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

<!-- 
load state
- need to retrieve user id upon login, then track mg and cb tables to fill in data, select row with latest access time -->