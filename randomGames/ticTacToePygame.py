import pygame
import sys

pygame.init()

BG_COLOR = (28, 170, 156)
LINE_COLOR = (23, 145, 135)
COLOUR = (239, 231, 200)

# Screen
screen = pygame.display.set_mode((300, 300))
pygame.display.set_caption('Tic Tac Toe')
screen.fill(BG_COLOR)

board = [[None] * 3 for _ in range(3)]

def drawLines():
    # Horizontal
    pygame.draw.line(screen, LINE_COLOR, (0, 100), (300, 100), 15)
    pygame.draw.line(screen, LINE_COLOR, (0, 200), (300, 200), 15)

    # Vertical
    pygame.draw.line(screen, LINE_COLOR, (100, 0), (100, 300), 15)
    pygame.draw.line(screen, LINE_COLOR, (200, 0), (200, 300), 15)

def drawFigures():
    for row in range(3):
        for col in range(3):
            if board[row][col] == 'O':
                pygame.draw.circle(screen, COLOUR, (int(col * 100 + 50), int(row * 100 + 50)), 33, 15)
            elif board[row][col] == 'X':
                pygame.draw.line(screen, COLOUR, (col * 100 + 25, row * 100 + 75), (col * 100 + 75, row * 100 + 25), 25)  
                pygame.draw.line(screen, COLOUR, (col * 100 + 25, row * 100 + 25), (col * 100 + 75, row * 100 + 75), 25)

def markSquare(row, col, player):
    board[row][col] = player

def availableSquare(row, col):
    return board[row][col] is None

def checkGameOver():
    for player in ['X', 'O']:
        # Vertical win
        for col in range(3):
            if board[0][col] == player and board[1][col] == player and board[2][col] == player:
                return True, player

        # Horizontal win
        for row in range(3):
            if board[row][0] == player and board[row][1] == player and board[row][2] == player:
                return True, player

        # Diagonals win
        if board[0][0] == player and board[1][1] == player and board[2][2] == player:
            return True, player
        if board[2][0] == player and board[1][1] == player and board[0][2] == player:
            return True, player

    # Check for full board
    for row in range(3):
        for col in range(3):
            if board[row][col] is None:
                return False, None
    return True, None

# Main loop
player = 'X'
gameOver = False
winner = None
drawLines()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

        if event.type == pygame.MOUSEBUTTONDOWN and not gameOver:
            mouseX = event.pos[0]  # x
            mouseY = event.pos[1]  # y

            clickedRow = int(mouseY // 100)
            clickedCol = int(mouseX // 100)

            if availableSquare(clickedRow, clickedCol):
                markSquare(clickedRow, clickedCol, player)
                gameOver, winner = checkGameOver()
                player = 'X' if player == 'O' else 'O'

                drawFigures()
    pygame.display.update()
